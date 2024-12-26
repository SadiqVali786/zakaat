"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import DownloadIcon from "@/../public/Icons/dashboard/arrow_forward.png";
import Reciever1 from "@/../public/dashboard/genuine-applications/reciever1.png";
import Reciever2 from "@/../public/dashboard/genuine-applications/reciever3.png";

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
import { searchApplicationByPhoneNum } from "@/actions/application.actions";
import { useRouter } from "next/navigation";
import APP_PATHS from "@/config/path.config";
import { useApplicationStoreSelector } from "@/store/application-store";

const formSchema = z.object({
  phoneNum: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
});

const Page = () => {
  const navigate = useRouter();
  const setFullname = useApplicationStoreSelector.use.setFullname();
  const setAmount = useApplicationStoreSelector.use.setAmount();
  const setHide = useApplicationStoreSelector.use.setHide();
  const setPhoneNum = useApplicationStoreSelector.use.setPhoneNum();
  const setRating = useApplicationStoreSelector.use.setRating();
  const setReason = useApplicationStoreSelector.use.setReason();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  const [actionState, action, isPending] = useActionState(
    searchApplicationByPhoneNum,
    null
  );

  useEffect(() => {
    if (actionState?.status) {
      setFullname(actionState?.additional.fullname);
      setAmount(actionState?.additional.details!.amount);
      setHide(actionState?.additional.details!.hide);
      setPhoneNum(actionState?.additional.phoneNum);
      setRating(actionState?.additional.details!.rating);
      setReason(actionState?.additional.details!.reason);
      navigate.push(
        `${APP_PATHS.EDIT_APPLICATION}/${actionState?.additional.phoneNum}`
      );
    }
  }, [actionState]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await action({ phoneNum: values.phoneNum });
  }

  return (
    <div className="border-x-[1px] border-neutral-11 pt-10 flex flex-col h-full gap-y-4 px-4 grow items-center justify-center max-w-[708px]">
      {/* step1 */}
      {/* <div className="flex flex-col items-center py-[6.25rem] px-[3.75rem] max-w-[510px] rounded-[30px] border-[10px] border-neutral-12 cursor-pointer">
        <div className="flex flex-col items-center gap-1 w-full">
          <p className="Sans text-[#8e8c95] text-center font-['DM Sans'] leading-normal">
            Click here to open Camera to take the current picture of the
            Applicant
          </p>
          <div className="flex justify-center items-center w-6 h-6">
            <Image src={DownloadIcon} alt="download icon" className="w-6 h-6" />
          </div>
        </div>
      </div> */}
      {/* step2 */}
      {/* <div className="flex flex-col items-center w-full gap-y-8">
        <p className="text-[#ecebfe] text-center font-bold text-[1.5625rem] leading-normal">
          Click on the Applicant Image, If exists.
        </p>
        <div className="flex items-center justify-center gap-2.5 w-full">
          <Image
            src={Reciever1}
            alt="reciever 1"
            className="w-40 h-40 aspect-square"
          />
          <Image
            src={Reciever2}
            alt="reciever 2"
            className="w-40 h-40 aspect-square"
          />
        </div>
        <button className="self-end flex justify-center items-center gap-2 py-2 px-4 rounded-lg border border-[#4135f3]">
          <Image src={DownloadIcon} alt="download icon" className="w-6 h-6" />
          <span className="text-[#b5b2ff] font-bold text-lg leading-normal">
            Next
          </span>
        </button>
      </div> */}
      {/* step3 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button
            type="submit"
            className="text-blue-50 bg-brand-dark border border-neutral-7"
          >
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
