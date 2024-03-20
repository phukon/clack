import BillingForm from "@/components/billing/Billing";
import { getUserPaymentStatus } from "@/lib/stripe";

const Page = async () => {
  // const subscriptionPlan = await getUserSubscriptionPlan();

  // return <BillingForm subscriptionPlan={subscriptionPlan} />;
  const isPaidUser = await getUserPaymentStatus();

  return <BillingForm isPaidUser={isPaidUser} />;
};

export default Page;
