"use server";

import { PLANS } from "@/config/stripePlans";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

/**
 * Creates a Stripe subscription session for the current user.
 * Throws errors if the user is not authenticated, has an invalid ID, or encounters any issues during the process.
 * @returns {Object} Object containing either the URL for the subscription session or an error.
 */
export const createStripeSubscription = async () => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");
    if (!user.id) throw new Error("Invalid user ID");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    const billingUrl = absoluteUrl("/dash");
    const subscriptionPlan = await getUserSubscriptionPlan();

    if (subscriptionPlan && subscriptionPlan.error) {
      throw new Error(subscriptionPlan.error);
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
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
};
