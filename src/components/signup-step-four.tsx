/* eslint-disable @typescript-eslint/no-explicit-any */

import { LOGOS } from "@/lib/icons";
import Image from "next/image";

import { signIn } from "next-auth/react";
import APP_PATHS from "@/config/path.config";

const SignupStepFour = ({ cuid }: { cuid: string }) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <span className="text-brand-blue text-lg font-bold">Sign Up</span>
        <p className="">the sign up process completed</p>
      </div>
      <div
        className="flex items-center gap-x-5 py-[10px] px-5 rounded-xl border border-neutral-11 cursor-pointer w-[300px] justify-center"
        onClick={() => {
          signIn("google", {
            callbackUrl: APP_PATHS.ZAKAAT_APPLICATIONS,
            cuid,
          });
        }}
      >
        <Image src={LOGOS["google-logo"]} alt="Google logo" />
        <span>Continue with Google</span>
      </div>
      <p className="">thanks for understanding</p>
    </div>
  );
};

export default SignupStepFour;
