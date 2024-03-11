"use client";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, createContext, useState } from "react";

type SidebarContextState = {
  expanded: boolean;
};

export const SidebarContext = createContext<SidebarContextState | undefined>(undefined);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen relative">
      <nav
        className={`h-full flex flex-col bg-white border-r-2 shadow-sm fixed top-0 left-0 z-50 ${
          expanded ? "w-60" : "w-16"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/logo.png"
            width={1000}
            height={1000}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

type TSidebarItem = {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  path: string;
};

export function SidebarItem({ icon, text, active, alert, path }: TSidebarItem) {
  const { expanded } = useContext(SidebarContext) || { expanded: true };

  return (
    <Link href={path}>
      <li
        className={`
      relative flex items-center py-3 px-2 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-[#323DD6]" : "hover:bg-indigo-50 text-gray-600"}
  `}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
        {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}

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
    </Link>
  );
}
