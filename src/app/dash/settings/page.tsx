"use client";
import Navbar from "./navbar";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function General() {
  const user = useCurrentUser();

  return (
    <>
      <Navbar userImage={user?.image} current="General" />
      <div className="p-4 sm:p-4 sm:m-4 flex items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="space-y-1">
          <h3 className="text-2xl text-foreground font-semibold tracking-tight">General</h3>
          <p className="text-sm text-muted-foreground">Your account information</p>
        </div>
      </div>
      <UserInfo label="Profile details" user={user} />
    </>
  );
}
