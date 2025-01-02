"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { startTransition, useActionState } from "react";
import { usePathname } from "next/navigation";
import { ICONS } from "@/lib/icons";
import Image from "next/image";
import { createApplicationAction } from "@/actions/application.actions";
import { applicationSchema } from "@/lib/validators/application.validator";
import useAuthorization from "@/hooks/useAuthorization";
import { toast } from "@/hooks/use-toast";

const FormWithShadcn = () => {
  // const { session, router } = useAuthorization();
  const [actionState, action, isPending] = useActionState(
    createApplicationAction,
    null
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    try {
      startTransition(async () => {
        await action(values);
      });
      if (actionState?.status)
        toast({
          title: actionState?.message,
          variant: "default",
        });
      else
        toast({
          title: actionState?.message,
          variant: "destructive",
        });
    } catch (error) {
      toast({
        title: "Internal Server Error",
        variant: "destructive",
      });
    }
  }

  const pathname = usePathname();
  const length = pathname.split("/").length;

  return (
    <div className="h-full grow xs:border-x-[1px] border-neutral-11 max-w-[708px]">
      <div className="flex gap-x-2 border-b-[1px] border-neutral-11 sticky top-0 backdrop-blur-3xl xs:pt-8 pt-4 pl-4 pb-4 items-center">
        <Image
          alt="back"
          src={ICONS["arrow-backward-black"]}
          className="cursor-pointer"
        />
        <span>{pathname.split("/")[length - 1]}</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="pt-10 flex flex-col gap-y-4 items-start px-4"
        >
          <FormField
            control={form.control}
            name="phoneNum"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="UPI Phone Number"
                    {...field}
                    className="bg-neutral-11 text-blue-50 !text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="number"
                    step="1000"
                    maxLength={10}
                    placeholder="Amount"
                    className="bg-neutral-11 text-blue-50 !text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Why do you think he/she is eligible for Zakaat?"
                    className="placeholder:text-neutral-7 text-blue-50 flex-grow resize-none border-transparent focus:border-transparent focus:ring-0 outline-none overflow-hidden bg-neutral-11 w-full !text-lg placeholder:text-lg"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Application Rating out of 10"
                    {...field}
                    className="bg-neutral-11 text-blue-50 !text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hide"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm gap-x-8 bg-neutral-11 w-full">
                <div className="space-y-0.5">
                  <FormLabel>Hide My Identity</FormLabel>
                  <FormDescription>
                    Recommended to Reveal your identity to increase the chnaces
                    of getting help.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-blue-50 bg-brand-dark border border-neutral-7"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormWithShadcn;
