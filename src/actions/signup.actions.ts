import prisma from "@/db";
import { withServerActionAsyncCatcher } from "@/lib/action-wrappers/async-catcher";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import {
  editSignupSchema,
  EditSignupSchemaType,
  signupSchema,
  SignupSchemaType,
} from "@/lib/validators/auth.validator";
import { ServerActionReturnType } from "@/types/api.types";

export const signupAction = withServerActionAsyncCatcher<
  SignupSchemaType,
  ServerActionReturnType
>(async (data) => {
  data = signupSchema.parse(data);
  // TODO: upload selfie image to the cloudinary
  await prisma.user.create({
    data: {
      ...data,
      selfie: "",
    },
  });
  return new SuccessResponse("", 201).serialize();
});

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
