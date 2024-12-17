"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ICONS } from "@/lib/icons";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import { ROLE } from "@prisma/client";
import { useActionState, useState } from "react";
import SignupStepOne from "@/components/signup-step-one";
import SignupStepTwo from "@/components/signup-step-two";
import SignupStepThree from "@/components/signup-step-three";

import { signupFormSchema } from "@/lib/validators/auth.validator";
import { signupAction } from "@/actions/signup.actions";
import { useRouter } from "next/navigation";
import APP_PATHS from "@/config/path.config";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const navigator = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
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

  const [actionState, action, isPending] = useActionState(signupAction, null);

  // 2. Define a submit handler.
  async function onSubmit(payload: z.infer<typeof signupFormSchema>) {
    console.log(payload);
    await action(payload);
    navigator.push(APP_PATHS.ZAKAAT_APPLICATIONS);
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
