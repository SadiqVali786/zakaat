/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICONS } from "@/lib/icons";
import { IMAGES } from "@/lib/images";
import { ROLE } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

const SignupStepThree = ({
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
  const inputValues = form.watch();

  const setLatAndLongValues = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
        },
        (error) => console.error("Error fetching GPS values:", error)
      );
    } else console.error("Geolocation is not supported by this browser.");
  };

  return (
    <>
      <Image src={IMAGES["gps-info-graphics"]} alt="take selfie info graphic" />
      <p className="w-[302px]">
        {inputValues.role === ROLE.DONOR
          ? "We&apos;ll use your GPS coordinates to suggest nearby applicants, following the guidance of our Prophet Muhammad (SAW) to prioritize helping relatives, friends, and neighbors first. This approach ensures your Zakat benefits those closest to you, strengthening community ties."
          : "By sharing your GPS, we can connect you with nearby donors for faster support. As guided by our Prophet Muhammad (SAW), we prioritize helping those within your community first, strengthening local bonds. Thank you for your cooperation!"}
      </p>
      <button
        className="flex justify-center items-center gap-x-2 py-2 px-4 rounded-lg border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#292637]"
        onClick={setLatAndLongValues}
      >
        <Image src={ICONS.location} alt="selfie icon" className="w-6 h-6" />
        <span className="text-neutral-7 text-lg font-bold">
          GPS Coordinates
        </span>
      </button>
    </>
  );
};

export default SignupStepThree;
