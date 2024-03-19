"use client";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { UserButton } from "@/components/auth/user-button";
import Sidebar, { SidebarItem } from "@/components/sidebar/sidebar";
import { Settings, Activity, User, Layout, LogOutIcon, ReceiptText } from "lucide-react";

import { useState } from "react";

import { usePathname } from "next/navigation";
import ProBanner from "../billing/pro-banner";

interface SideBarComponentProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const SideBarComponent = ({ subscriptionPlan }: SideBarComponentProps) => {
  const pathname = usePathname();
  const [showProBanner, setShowProBanner] = useState<boolean | null>(true);

  if ("error" in subscriptionPlan) {
    return (
      <div>
        <p>Error: {subscriptionPlan.error}</p>
      </div>
    );
  }

  const userPlan = subscriptionPlan.isSubscribed ? "pro" : "free";

  return (
    <Sidebar userPlan={userPlan} showProBanner={showProBanner} setShowProBanner={setShowProBanner}>
      <SidebarItem icon={<Layout />} text="Dashboard" active={pathname === "/dash" ? true : false} path="/dash" />
      <SidebarItem
        icon={<Activity />}
        text="Activity"
        active={pathname === "/dash/activity" ? true : false}
        path="/dash/activity"
      />
      {/* <SidebarItem
        icon={<User />}
        text="Profile"
        active={pathname === "/dash/s-profile" ? true : false}
        path="/dash/s-profile"
      /> */}
      <SidebarItem
        icon={<ReceiptText />}
        text="Billing"
        active={pathname === "/dash/billing" ? true : false}
        path="/dash/billing"
      />
      <SidebarItem
        icon={<Settings />}
        text="Settings"
        active={pathname === "/dash/settings" ? true : false}
        path="/dash/settings"
      />

      <UserButton icon={<LogOutIcon />} text="Log out" />
    </Sidebar>
  );
};

export default SideBarComponent;
