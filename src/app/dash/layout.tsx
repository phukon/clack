import SideBarComponent from "@/components/sidebar/SideBarComponent";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const DashLayout = async ({ children }: { children: React.ReactNode }) => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  return (
    <div className="flex flex-row gap-12">
      <SideBarComponent subscriptionPlan={subscriptionPlan} />
      <div className="h-full max-w-screen md:w-full flex gap-y-10 items-center mt-5 justify-center">{children}</div>
    </div>
  );
};

export default DashLayout;
