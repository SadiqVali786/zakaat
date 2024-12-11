/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ROLE } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

const SignupStepOne = ({
  form,
}: {
  form: UseFormReturn<
    {
      fullname: string;
      phoneNum: string;
      selfie: File;
      latitude: number;
      longitude: number;
      role: "ADMIN" | "DONOR" | "ACCEPTOR" | "VERIFIER";
    },
    any,
    undefined
  >;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                className="flex w-full"
              >
                <div
                  className={cn(
                    "flex items-center justify-center grow py-[10px] cursor-pointer",
                    form.getValues().role === ROLE.DONOR
                      ? "rounded-xl border border-neutral-11"
                      : ""
                  )}
                >
                  <RadioGroupItem
                    value={ROLE.DONOR}
                    id={ROLE.DONOR}
                    className="hidden"
                  />
                  <Label
                    htmlFor={ROLE.DONOR}
                    className="text-base cursor-pointer"
                  >
                    Donor
                  </Label>
                </div>
                <div
                  className={cn(
                    "flex items-center justify-center grow py-[10px] cursor-pointer",
                    form.getValues().role === ROLE.ACCEPTOR
                      ? "rounded-xl border border-neutral-11"
                      : ""
                  )}
                >
                  <RadioGroupItem
                    value={ROLE.ACCEPTOR}
                    id={ROLE.ACCEPTOR}
                    className="hidden"
                  />
                  <Label
                    htmlFor={ROLE.ACCEPTOR}
                    className="text-base cursor-pointer"
                  >
                    Applicant
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input
                placeholder="Full Name"
                className="w-full py-[10px] px-5 rounded-xl border border-neutral-11 placeholder:text-neutral-7 text-blue-50 placeholder:text-base text-base"
                {...field}
                onBlur={async () => await form.trigger("fullname")}
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
                placeholder="Phone Number"
                className="w-full py-[10px] px-5 rounded-xl border border-neutral-11 placeholder:text-neutral-7 text-blue-50 placeholder:text-base text-base"
                {...field}
                onBlur={async () => await form.trigger("phoneNum")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SignupStepOne;
