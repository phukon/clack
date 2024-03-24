"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeleteAccountForm } from "./DeleteAccountForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const DeleteAccountButton = ({ children, asChild }: LoginButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex border-2 border-red-400 rounded-lg  px-3 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground"
        asChild={asChild}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <DeleteAccountForm />
      </DialogContent>
    </Dialog>
  );
};
