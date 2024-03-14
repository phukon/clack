"use client";

import { getUserSubscriptionPlan } from "@/lib/stripe";
import { useToast } from "./ui/use-toast";
// import { trpc } from '@/app/_trpc/client'
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { createStripeSession } from "@/actions/createStripeSession";
import { useState } from "react";

// Assuming you have a type for subscriptionPlan that includes an error property
interface BillingFormProps {
 subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ subscriptionPlan }: BillingFormProps) => {
 const { toast } = useToast();

 const [isLoading, setIsLoading] = useState<boolean>(false);

 const handleSubmit = async () => {
  setIsLoading(true);
  createStripeSession()
     .then((response) => {
       if (response.error) {
         console.error("Error creating Stripe session:", response.error);
         toast({
           title: "There was a problem...",
           description: "Please try again in a moment",
           variant: "destructive",
         });
       } else if (response.url) { // Ensure response.url is not undefined
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
     })
     .finally(() => {
       setIsLoading(false);
     });
 };
 
 

 if ("error" in subscriptionPlan) {
    return (
      <div>
        <p>Error: {subscriptionPlan.error}</p>
      </div>
    );
 }

 return (
    <MaxWidthWrapper className="max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong> plan.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Button onClick={handleSubmit}>
            {isLoading ? <Loader2 className="mr-4 h-4 w-4 animate-spin" /> : null}
            {subscriptionPlan.isSubscribed ? "Manage Subscription" : "Upgrade to PRO"}
          </Button>

          {subscriptionPlan.isSubscribed ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled ? "Your plan will be canceled on " : "Your plan renews on"}
              {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
 );
};

export default BillingForm;
