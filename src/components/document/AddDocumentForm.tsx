"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "../auth/CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDocumentUrlSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { addDocument } from "@/actions/addDocument";
import { Input } from "../ui/input";
import FormSuccess from "../form-success";
import FormError from "../form-error";
import { Button } from "../ui/button";
import useNotes from "@/context/NotesContext";

export const AddDocumentForm = () => {
  const { revalidateNotes } = useNotes();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddDocumentUrlSchema>>({
    resolver: zodResolver(AddDocumentUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddDocumentUrlSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addDocument(values.url)
        .then((d) => {
          if (d?.error) {
            form.reset();
            setError(d.error as string | undefined);
          }

          if (d?.success) {
            form.reset();
            setSuccess(d.success);
            revalidateNotes();
          }
        })
        .catch(() => {
          setTimeout(() => {
            setError("Something went wrong.");
          }, 7_000); // TODO: Fix default error case. The error message shows even on successful logins after which the user is redirected, which can be confusing for the user. Hence delaying the default message.
        });
    });
  };

  return (
    <CardWrapper headerLabel="" backButtonLabel="Tutorial" backButtonHref="/docs/notion">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <div className=" space-y-4">
            <>
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste the document url here.</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="https://notion.so/johndoe/spdx-70a82eb4fs584b5e3011599b691f869b?pvs=4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>

          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            Add
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
