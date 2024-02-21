import Sidebar, { SidebarItem } from '@/components/ui/sidebar';
import { LifeBuoy } from 'lucide-react';

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-12">
      <Sidebar>
        <SidebarItem icon={<LifeBuoy />} text="hello" active />
        <SidebarItem icon={<LifeBuoy />} text="hello" />
        <SidebarItem icon={<LifeBuoy />} text="hello" />
        <SidebarItem icon={<LifeBuoy />} text="hello" />
        <SidebarItem icon={<LifeBuoy />} text="hello" />
      </Sidebar>
      {children}
    </div>
  );
};

export default DashLayout;
