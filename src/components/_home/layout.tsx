import Sidebar, { SidebarItem } from '../ui/sidebar';
import { LifeBuoy } from 'lucide-react';

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-black">
      <Sidebar>
        <SidebarItem icon={<LifeBuoy />} text="hello" active />
      </Sidebar>
      {children}
    </div>
  );
};

export default DashLayout;
