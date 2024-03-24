"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "../auth/CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import FormSuccess from "../form-success";
import FormError from "../form-error";
import { Button } from "../ui/button";
import { deleteAccount } from "@/actions/auth/deleteAccount";
import { logout } from "@/actions/auth/logout";

export const DeleteAccountForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DeleteFormSchema>>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (values: z.infer<typeof DeleteFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      if (values.text === "DELETE MY ACCOUNT") {
        deleteAccount()
          .then((d) => {
            if (d?.error) {
              form.reset();
              setError(d.error as string | undefined);
            }

            if (d?.success) {
              form.reset();
              setSuccess(d.success);
              setTimeout(() => {
                setSuccess("Redirecting in 5 seconds");

                setTimeout(() => {
                  logout();
                }, 5_000);
              }, 3_000);
            }
          })
          .catch(() => {
            setTimeout(() => {
              setError("Something went wrong.");
            }, 7_000); // TODO: Fix default error case. The error message shows even on successful logins after which the user is redirected, which can be confusing for the user. Hence delaying the default message.
          });
      } else {
        setError("Text doesn't match");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Are you sure you want to delete your account?"
      backButtonLabel="Your activity so far"
      backButtonHref="/dash/activity"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className=" space-y-4">
            <>
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type &ldquo;DELETE MY ACCOUNT&ldquo;</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" variant="destructive" className="w-full">
            Delete
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
