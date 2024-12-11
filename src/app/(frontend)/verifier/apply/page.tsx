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
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { ICONS } from "@/lib/icons";
import Image from "next/image";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/config/auth.config";

const formSchema = z.object({
  fullname: z.string().trim().min(1, "username is required"),
  upiPhoneNum: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  selfie: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
  latitude: z
    .number()
    .refine(
      (num) => num >= -90 && num <= 90,
      "Latitude must be a valid decimal coordinate."
    ),
  longitude: z
    .number()
    .refine(
      (num) => num >= -180 && num <= 180,
      "Longitude must be a valid decimal coordinate."
    ),
  amount: z
    .string()
    .transform((val) => parseFloat(val))
    .refine(
      (num) => !isNaN(num) && num > 0,
      "Amount must be a positive number."
    )
    .refine(
      (num) => num.toFixed(2).length <= 10,
      "Amount must not exceed a valid range."
    ),
  reason: z.string().trim().max(300, "Reason must not exceed 300 characters."),
  hide: z.boolean().default(false).optional(),
});

const FormWithShadcn = () => {
  const gpsRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const length = pathname.split("/").length;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const setLatAndLongValues = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
          if (gpsRef.current)
            gpsRef.current.value = `${position.coords.latitude}, ${position.coords.longitude}`;
        },
        (error) => console.error("Error fetching GPS values:", error)
      );
    } else console.error("Geolocation is not supported by this browser.");
  };

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
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Full Name"
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
            name="upiPhoneNum"
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
          <div className="flex w-full" onClick={setLatAndLongValues}>
            <input
              type="text"
              className="block px-4 py-2 text-blue-50 rounded-lg shadow-sm placeholder-neutral-6/99 focus:ring-1 focus:ring-blue-50 focus:border-blue-50 focus:outline-none bg-neutral-11 text-lg max-h-9 w-full"
              readOnly
              placeholder="Click here to Fetch Latitude, Longitude"
              ref={gpsRef}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      readOnly
                      placeholder="Latitude"
                      className="bg-neutral-11 text-blue-50 !text-lg hidden"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      readOnly
                      placeholder="Longitude"
                      className="bg-neutral-11 text-blue-50 !text-lg hidden"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="selfie"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    className="bg-neutral-11 text-neutral-7 !text-lg"
                    value={undefined}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
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
