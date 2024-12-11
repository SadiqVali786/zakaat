"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ICONS, IMAGES } from "@/lib/icons";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/config/auth.config";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROLE } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SignupStepOne from "@/components/signup-step-one";
import SignupStepTwo from "@/components/signup-step-two";
import SignupStepThree from "@/components/signup-step-three";
import SignupStepFour from "@/components/signup-step-four";
import prisma from "@/db";
import { signupUtil } from "@/app/actions/signup";

export const formSchema = z.object({
  fullname: z.string().trim().min(1, "username is required"),
  phoneNum: z
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
  role: z.nativeEnum(ROLE),
});

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [cuid, setCUID] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phoneNum: "",
      role: ROLE.DONOR,
    },
  });

  const inputValues = form.watch();
  const isButtonDisabled =
    (step === 1 && (!inputValues.fullname || !inputValues.phoneNum)) ||
    (step === 2 && !inputValues.selfie) ||
    (step === 3 && (!inputValues.longitude || !inputValues.latitude));

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signupUtil(values);
    console.log("Sadiq Vali", { result });
    setCUID(result.id);
    setStep((prev) => prev + 1);
  }

  return (
    <div className="p-[30px] w-fit h-fit rounded-[1.25rem] border border-neutral-11 shadow-[0px_10px_20px_-8px_#8e8c95]">
      <div className="flex flex-col items-center justify-center gap-10">
        {step === 1 && (
          <div className="flex flex-col items-center gap-2.5 self-stretch">
            <p className="text-blue-50 text-center text-[18px] font-bold leading-tight">
              Create your account
            </p>
            <p className="text-neutral-7 text-[1rem] leading-tight">
              Welcome! Please fill details to get started
            </p>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full"
          >
            {step === 1 && <SignupStepOne form={form} />}
            {step === 2 && <SignupStepTwo form={form} />}
            {step === 3 && <SignupStepThree form={form} />}
            {step === 4 && <SignupStepFour cuid={cuid} />}
            {step !== 4 && (
              <button
                className="flex justify-center items-center gap-x-2 py-2 px-4 rounded-lg border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#292637] self-end"
                type={`${step === 3 ? "submit" : "button"}`}
                onClick={() => {
                  if (step < 3) setStep((prev) => prev + 1);
                }}
                disabled={isButtonDisabled}
              >
                <Image
                  src={ICONS["chevron-next"]}
                  alt="next icon"
                  className="w-6 h-6"
                />
                <span className="text-neutral-7 text-lg font-bold">Next</span>
              </button>
            )}
          </form>
        </Form>
        {step === 1 && (
          <p className="text-center w-full">
            Already have an account?{" "}
            <span className="text-[#4135f3] cursor-pointer">Sign in</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
