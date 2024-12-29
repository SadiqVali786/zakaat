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
import { useActionState, useEffect } from "react";
import { editApplicationAction } from "@/actions/application.actions";
import { applicationSchema } from "@/lib/validators/application.validator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import APP_PATHS from "@/config/path.config";
import { useApplicationStoreSelector } from "@/store/application-store";
import useAuthorization from "@/hooks/useAuthorization";

const EditApplication = ({ params }: { params: { phoneNum: string } }) => {
  const { session, router } = useAuthorization();
  // const phoneNum = params.phoneNum;
  const amount = useApplicationStoreSelector.use.amount();
  const fullname = useApplicationStoreSelector.use.fullname();
  const hide = useApplicationStoreSelector.use.hide();
  const phoneNum = useApplicationStoreSelector.use.phoneNum();
  const rating = useApplicationStoreSelector.use.rating();
  const reason = useApplicationStoreSelector.use.reason();
  const reset = useApplicationStoreSelector.use.reset();

  const [actionState, action, isPending] = useActionState(
    editApplicationAction,
    null
  );

  useEffect(() => {
    if (amount && fullname && hide && phoneNum && rating && reason) {
      form.setValue("fullname", fullname);
      form.setValue("amount", amount);
      form.setValue("hide", hide);
      form.setValue("phoneNum", phoneNum);
      form.setValue("rating", rating);
      form.setValue("reason", reason);
    } else {
      router.replace(APP_PATHS.SEARCH_APPLICANT);
    }
  }, [amount, fullname, hide, phoneNum, rating, reason]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (actionState) {
      // console.log(actionState);
      if (actionState?.status) {
        router.push(APP_PATHS.SEARCH_APPLICANT);
      }
    }
  }, [actionState]);

  async function onSubmit(values: z.infer<typeof applicationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    const { fullname, ...rest } = values;
    await action(rest);
    reset();
  }

  return (
    <div className="border-x-[1px] border-neutral-11 pt-10 flex flex-col h-full gap-y-4 px-4 grow items-center justify-center max-w-[708px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="pt-10 flex flex-col gap-y-4 items-start px-4"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    {...field}
                    readOnly
                    className="bg-neutral-11 text-neutral-7 cursor-not-allowed !text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNum"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="UPI Phone Number"
                    {...field}
                    readOnly
                    className="bg-neutral-11 text-neutral-7 cursor-not-allowed !text-lg"
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

export default EditApplication;
