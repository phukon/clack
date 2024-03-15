"use client";

import { FaUser } from "react-icons/fa";
// import { ExitIcon } from "@radix-ui/react-icons"
import { FaWindowClose } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { SidebarContext } from "../sidebar/sidebar";
import { useContext } from "react";

export const UserButton = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  // const user = useCurrentUser();
  const { expanded } = useContext(SidebarContext) || { expanded: true };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <li
          className="
      relative flex items-center py-3 px-2 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group hover:bg-indigo-50 text-gray-600
     "
        >
          {icon}
          <span className={`overflow-hidden transition-all ${expanded ? "max-w-40 ml-3" : "w-0"}`}>{text}</span>

          {!expanded && (
            <div
              className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    `}
            >
              {text}
            </div>
          )}
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" ml-5 w-44" align="end">
        <LogoutButton>
          <DropdownMenuItem className=" border-gray-500 border">Click to confirm.</DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
