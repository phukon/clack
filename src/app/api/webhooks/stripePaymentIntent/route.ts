import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response(`Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 500,
    });
  }

  if (event.type === "payment_intent.succeeded") {
    // console.log(session)
    const paymentIntentId = session.id as string;
    // console.log("Payment Intent ID:", paymentIntentId);

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    // console.log("Payment Intent:", paymentIntent);

    const userId = session.metadata.userId;
    // console.log("User ID:", userId)

    const paymentDate = new Date(paymentIntent.created * 1000); // milliseconds since the Unix epoch
    // console.log("Payment Date:", paymentDate);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: session.customer as string,
        stripePriceId: session.line_items?.data[0].price?.id,
        stripePaymentIntentId: paymentIntentId,
        stripePaymentDate: paymentDate,
      },
    });

    await db.userApiLimit.update({
      where: {
        id: userId,
      },
      data: { count: 50 },
    });
  }

  return new Response(null, { status: 200 });
}
