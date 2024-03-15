"use client";

import { getUserSubscriptionPlan } from "@/lib/stripe";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns";

import { UpgradePlanModal } from "./upgrade-plan-modal";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { createStripeSession } from "@/actions/createStripeSession";
import { toast } from "../ui/use-toast";

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

interface Tier {
  id: number;
  title: string;
  priceMonthly: string;
  currentPlan: boolean;
  hasPlan: boolean;
  isTrial?: boolean;
  description: string;
  features: string[];
}

const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  if ("error" in subscriptionPlan) {
    return (
      <div>
        <p>Error: {subscriptionPlan.error}</p>
      </div>
    );
  }

  const plan: "pro" | "free" = subscriptionPlan.isSubscribed ? "pro" : "free";

  const handleSubmit = async () => {
    setClicked(true);
    createStripeSession({ period: "monthly" })
      .then((response) => {
        if (response.error) {
          console.error("Error creating Stripe session:", response.error);
          toast({
            title: "There was a problem...",
            description: "Please try again in a moment",
            variant: "destructive",
          });
        } else if (response.url) {
          // Ensure response.url is not undefined
          // Redirect the user to the Stripe session URL
          window.location.href = response.url;
        } else {
          console.error("No URL provided in the response.");
          toast({
            title: "There was a problem...",
            description: "No URL provided for the Stripe session.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating Stripe session:", error);
        toast({
          title: "There was a problem...",
          description: "Please try again in a moment",
          variant: "destructive",
        });
        setClicked(false);
      });
    //  .finally(() => {
    //    setClicked(false);
    //  });
  };

  const tiers: Tier[] = [
    {
      id: 1,
      title: "Free",
      priceMonthly: "€0/mo",
      description: "What's included:",
      currentPlan: plan && plan == "free" ? true : false,
      hasPlan: false,
      features: ["Unlimited Clack documents", "Google integration", "10 Google Documents"],
    },
    {
      id: 2,
      title: "Pro",
      priceMonthly: "€29/mo",
      description: "Everything in Free, plus:",
      currentPlan: plan && plan == "pro" ? true : false,
      hasPlan: plan && plan !== "free" ? true : false,
      features: [
        "Unlimited Clack, Notion & Google documents",
        "Notion Integration",
        "Notion Widgets",
        "6 heatmap themes",
        "AI Document Assistant incl. 1000 credits",
      ],
    },
  ];

  return (
    <div className=" flex flex-col">
      {" "}
      <MaxWidthWrapper className="max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the <strong>{subscriptionPlan.name ?? "Free"}</strong> plan.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
            {/* <UpgradePlanModal clickedPlan={"Pro"} trigger={"pro_banner"}>
              <Button type="button" >
                {subscriptionPlan.isSubscribed ? "Manage Subscription" : "Upgrade to PRO"}
              </Button>
            </UpgradePlanModal> */}

            {subscriptionPlan.isSubscribed ? (
              <p className="rounded-full text-xs font-medium">
                {subscriptionPlan.isCanceled ? "Your plan will be canceled on " : "Your plan renews on "}
                {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}.
              </p>
            ) : null}
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
      <div className="p-4 ml-5 md:ml-10 sm:p-4 sm:m-4">
        <div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 items-stretch sm:grid-cols-2 sm:gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  `rounded-3xl p-8 sm:p-10 bg-white dark:bg-gray-800 flex flex-col justify-between h-full`,
                  tier.currentPlan || tier.isTrial
                    ? "ring-2 ring-primary"
                    : "ring-1 ring-gray-900/10 dark:ring-gray-200/10"
                )}
              >
                <div className="">
                  <h2 className="text-xl font-bold mb-4 inline-flex items-center gap-x-2">
                    {tier.title} {tier.currentPlan ? <Badge className="rounded-none">Current Plan</Badge> : null}
                    {tier.isTrial ? <Badge className="rounded-none">Trial</Badge> : null}
                  </h2>
                  <div className="text-3xl font-bold mb-4">{tier.priceMonthly}</div>
                  <div className="text-gray-900 dark:text-gray-400 mb-6">{tier.description}</div>
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center mb-2">
                      <svg
                        className="h-5 w-5 text-green-500 dark:text-green-300 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                  {/* {tier.id === 1 && <div className="h-10 w-24 animate-pulse rounded-md bg-border" />} */}
                  {tier.id === 2 &&
                    (plan ? (
                      tier.hasPlan ? (
                        <Button
                          className={cn(
                            !tier.currentPlan &&
                              "border border-gray-700 dark:bg-secondary hover:dark:border-gray-500 hover:dark:bg-gray-700"
                          )}
                          variant={tier.currentPlan ? "default" : "default"}
                          loading={clicked}
                          onClick={handleSubmit}
                        >
                          Manage Subscription
                        </Button>
                      ) : (
                        <UpgradePlanModal clickedPlan={"Pro"} trigger={"billing_page"}>
                          <Button>Upgrade to Pro</Button>
                        </UpgradePlanModal>
                      )
                    ) : (
                      <div className="h-10 w-24 animate-pulse rounded-md bg-border" />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
