"use server";

import prisma from "@/db";
import { z } from "zod";
import { formSchema } from "../auth/signup/page";

export async function signupUtil(values: z.infer<typeof formSchema>) {
  return await prisma.user.create({
    data: {
      fullname: values.fullname,
      phoneNum: values.phoneNum,
      role: values.role,
      selfie: "selfie",
      location: {
        type: "Point", // Explicitly setting the type
        coordinates: [values.longitude, values.latitude], // Storing longitude first, then latitude
      },
    },
  });
}
