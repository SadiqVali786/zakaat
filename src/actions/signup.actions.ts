/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { ERROR_CODE, ERROR_NAME } from "@/config/error.config";
import prisma from "@/db";
import { withServerActionAsyncCatcher } from "@/lib/action-wrappers/async-catcher";
import {
  ErrorHandler,
  standardizedApiError,
} from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import cloudinary from "@/lib/cloudinary";
import {
  editSignupSchema,
  EditSignupSchemaType,
  signupFormSchema,
  SignupSchemaType,
} from "@/lib/validators/auth.validator";
import { ServerActionReturnType } from "@/types/api.types";
import { ROLE } from "@prisma/client";

export const signupAction = async (
  previousState: any,
  payload: SignupSchemaType
) => {
  try {
    if (!!payload) {
      payload = signupFormSchema.parse(payload);
      const session = await auth();
      if (!session || !session.user || !session.user.email)
        throw new ErrorHandler(
          "You must be authenticated to access this resource.",
          "UNAUTHORIZED"
        );
      // ######################################################
      // ############ CUSTOM SERVER ACTION CODE ###############
      // ######################################################
      // TODO: upload selfie image to the cloudinary
      const base64Image = await payload.selfie
        .arrayBuffer()
        .then((buffer) => Buffer.from(buffer).toString("base64"));
      const response = await cloudinary.uploader.upload(
        `data:${payload.selfie.type};base64,${base64Image}`,
        { folder: "zakaat/applicants" }
      );
      await prisma.user.create({
        data: {
          fullname: payload.fullname as string,
          phoneNum: payload.phoneNum as string,
          role: payload.role as ROLE,
          selfie: response.secure_url,
          email: session?.user.email as string,
          location: {
            type: "Point",
            coordinates: [
              payload.longitude as unknown as number,
              payload.latitude as unknown as number,
            ],
          },
        },
      });
      // ######################################################
      // ######################################################
      // ######################################################

      return new SuccessResponse("", 201).serialize();
    } else {
      return {
        name: ERROR_NAME.BAD_REQUEST,
        message: "No payload in the function",
        code: ERROR_CODE.BAD_REQUEST,
        status: false,
      };
    }
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};

export const editProfile = withServerActionAsyncCatcher<
  EditSignupSchemaType,
  ServerActionReturnType
>(async (profile) => {
  profile = editSignupSchema.parse(profile);
  // TODO: upload selfie image to the cloudinary
  await prisma.user.update({
    where: { id: profile.id },
    data: {
      ...profile,
      selfie: "",
    },
  });
  return new SuccessResponse("", 201).serialize();
});
