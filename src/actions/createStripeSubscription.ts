"use server";

import { PLANS } from "@/config/stripePlans";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export const createStripeSubscription = async () => {
  const user = await currentUser();

  const billingUrl = absoluteUrl("/dash");

  if (!user) throw new Error("Unauthorized");
  if (!user.id) throw new Error("Invalid user ID");

  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");


  const subscriptionPlan = await getUserSubscriptionPlan();

  if(subscriptionPlan && subscriptionPlan.error) {
    return {error: subscriptionPlan.error}
  }

  if ('isSubscribed' in subscriptionPlan && subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: dbUser.stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
        quantity: 1,
      },
    ],
    metadata: {
      userId: dbUser.id,
    },
  });
  return { url: stripeSession.url };
};
