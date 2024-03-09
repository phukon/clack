"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddDocumentForm } from "./AddDocumentForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const AddDocumentButton = ({ children, asChild }: LoginButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex items-center justify-center whitespace-nowrap p-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        asChild={asChild}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <AddDocumentForm />
      </DialogContent>
    </Dialog>
  );
};
