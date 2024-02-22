'use client';
import Sidebar, { SidebarItem } from '@/components/ui/sidebar';
import { Settings, Activity, User, Layout } from 'lucide-react';
import { usePathname } from 'next/navigation';

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-12">
      <Sidebar>
        <SidebarItem
          icon={<Layout />}
          text="Home"
          active={pathname === '/dash' ? true : false}
          path="/dash"
        />
        <SidebarItem
          icon={<User />}
          text="Profile"
          active={pathname === '/dash/profile' ? true : false}
          path="/dash/profile"
        />
        <SidebarItem
          icon={<Activity />}
          text="Activity"
          active={pathname === '/dash/Activity' ? true : false}
          path="/dash/graph"
        />
        <SidebarItem
          icon={<Settings />}
          text="Settings"
          active={pathname === '/dash/settings' ? true : false}
          path="/dash/settings"
        />
      </Sidebar>
      {children}
    </div>
  );
};

export default DashLayout;
