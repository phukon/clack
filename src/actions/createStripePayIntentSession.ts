"use server";

import { PLANS } from "@/config/stripePlans";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { stripe, getUserPaymentStatus } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

type Tperiod = {
  period: "onetime" | "monthly" | "yearly";
};

export const createStripePayIntentSession = async ({ period }: Tperiod) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");
    if (!user.id) throw new Error("Invalid user ID");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    const billingUrl = absoluteUrl("/dash/billing");
    const isPaidUser = await getUserPaymentStatus();

    if (isPaidUser) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId!,
        return_url: billingUrl,
      });
      return { url: stripeSession.url };
    }

    const customer = await stripe.customers.create({
      name: dbUser.name!,
      email: dbUser.email!,
      metadata: {
        userId: dbUser.id,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      line_items: [
        {
          //
          price: PLANS.find((plan) => plan.name === "Pro")?.price[
            period === "onetime" ? "onetime" : period
          ].priceIds.test, // will fix later
          quantity: 1,
        },
      ],
      metadata: {
        userId: dbUser.id,
      },
      payment_intent_data: {
        metadata: {
          userId: dbUser.id,
        },
      },
    });
    return { url: stripeSession.url };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
