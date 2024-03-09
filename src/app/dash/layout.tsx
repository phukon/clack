"use client";
import { UserButton } from "@/components/auth/user-button";
import Sidebar, { SidebarItem } from "@/components/ui/sidebar";
import { Settings, Activity, User, Layout, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-12">
      <Sidebar>
        <SidebarItem icon={<Layout />} text="Dashboard" active={pathname === "/dash" ? true : false} path="/dash" />
        <SidebarItem
          icon={<User />}
          text="Profile"
          active={pathname === "/dash/s-profile" ? true : false}
          path="/dash/s-profile"
        />
        <SidebarItem
          icon={<Activity />}
          text="Activity"
          active={pathname === "/dash/activity" ? true : false}
          path="/dash/activity"
        />
        <SidebarItem
          icon={<Settings />}
          text="Settings"
          active={pathname === "/dash/settings" ? true : false}
          path="/dash/settings"
        />
        {/* <SidebarItem
          icon={<LogOutIcon />}
          text="Log out"
          path="#"
        /> */}
        <UserButton icon={<LogOutIcon/>} text="Log out"/>
      </Sidebar>
      <div className="h-full max-w-screen md:w-full flex gap-y-10 items-center mt-5 justify-center">{children}</div>
    </div>
  );
};

export default DashLayout;
