"use client";

import APP_PATHS from "@/config/path.config";
import { LOGOS } from "@/lib/icons";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SigninComponent = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signIn("github", { callbackUrl: APP_PATHS.WELCOME });
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-[30px] w-fit h-fit rounded-[1.25rem] border border-neutral-11 shadow-[0px_10px_20px_-8px_#8e8c95]">
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-3">
            <span className="text-brand-blue text-lg font-bold">Sign In</span>
            <p className="">to continue to use Zakaat Web Application</p>
          </div>
          <div
            className="flex items-center gap-x-5 py-[10px] px-5 rounded-xl border border-neutral-11 cursor-pointer w-[300px] justify-center"
            onClick={handleGoogleSignIn}
          >
            <Image src={LOGOS["google-logo"]} alt="Google logo" />
            <span>Continue with Google</span>
          </div>
          <p className="text-left w-full">
            No account?{" "}
            <span className="text-[#4135f3] cursor-pointer">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninComponent;
