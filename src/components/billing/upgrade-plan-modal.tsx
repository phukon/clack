"use client";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { STAGGER_CHILD_VARIANTS } from "@/lib/constants";
import CheckCircle2 from "@/components/shared/icons/check-cirlce-2";
import { capitalize } from "@/lib/utils";
import { PLANS } from "@/config/stripePlans";
import { createStripeSession } from "@/actions/createStripeSession";
import { Badge } from "../ui/badge";
import React from "react";
import { toast } from "../ui/use-toast";

export function UpgradePlanModal({
  clickedPlan,
  trigger,
  open,
  setOpen,
  children,
}: {
  clickedPlan: "Writer" | "Pro";
  trigger?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  const [plan, setPlan] = useState<"Pro" | "Writer">(clickedPlan);
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [clicked, setClicked] = useState<boolean>(false);

  const features = useMemo(() => {
    return [
      "Unlimited Clack, Notion & Google documents",
      "Google integration",
      "Notion integration",
      "Notion Widgets",
      "6 heatmap themes",
      "AI Document Assistant incl. 1000 credits",
      ...(plan === "Writer" ? ["Priority Support"] : []),
    ];
  }, [plan]);

  const handleSubmit = async () => {
    setClicked(true);
    createStripeSession({ period: period })
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

  // If button is present, clone it and add onClick handler
  const buttonChild = React.isValidElement<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }>(children)
    ? React.cloneElement(children) // React.cloneElement(children, { onClick: handleUpgradeClick })
    : children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{buttonChild}</DialogTrigger>
      <DialogContent className="text-foreground bg-background">
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center space-y-3 border-b border-border px-4 py-8 sm:px-16"
        >
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <p className="text-2xl font-bold tracking-tighter text-foreground --local-comfortaa">Clack</p>
          </motion.div>
          <motion.h3 className="text-lg font-medium" variants={STAGGER_CHILD_VARIANTS}>
            Upgrade to {plan}
          </motion.h3>
          <motion.p className="text-center text-sm text-muted-foreground" variants={STAGGER_CHILD_VARIANTS}>
            Enjoy higher limits and extra features with our {plan} plan.
          </motion.p>
        </motion.div>
        <div className="bg-background px-4 py-8 text-left sm:px-16">
          <motion.div
            className="flex flex-col space-y-3"
            variants={STAGGER_CHILD_VARIANTS}
            initial="hidden"
            animate="show"
          >
            <div className="mb-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">
                    {plan} {capitalize(period)}
                  </h4>
                  <Badge variant="outline" className="text-sm font-normal normal-case">{`$${
                    PLANS.find((p) => p.name === plan)!.price[period].amount
                  }/month`}</Badge>
                </div>
                <button
                  onClick={() => {
                    setPeriod(period === "monthly" ? "yearly" : "monthly");
                  }}
                  className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-gray-800 hover:dark:text-muted-foreground/80"
                >
                  {period === "monthly" ? "Get 1 month free 🎁" : "Switch to monthly"}
                </button>
              </div>
              <motion.div
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col space-y-2"
              >
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={STAGGER_CHILD_VARIANTS}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <Button loading={clicked} onClick={handleSubmit}>{`Upgrade to ${plan} ${capitalize(period)}`}</Button>
            <div className="flex items-center justify-center space-x-2">
              <a
                href="https://cal.com/rikiphukon"
                target="_blank"
                className="text-center text-xs text-muted-foreground underline-offset-4 transition-all hover:text-gray-800 hover:dark:text-muted-foreground/80 hover:underline"
              >
                Support
              </a>
              <p className="text-muted-foreground">•</p>
              <a
                href={`${process.env.NEXT_PUBLIC_APP_URL}/pricing`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs text-muted-foreground underline-offset-4 transition-all hover:text-gray-800 hover:dark:text-muted-foreground/80 hover:underline"
              >
                Compare plans
              </a>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
