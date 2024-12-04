import prisma from "@/db";
import { withSession } from "@/lib/action-wrappers/session";
import { ErrorHandler } from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import {
  phoneNumSchema,
  PhoneNumSchemaType,
} from "@/lib/validators/search.validators";
import { ServerActionReturnType } from "@/types/api.types";

// TODO: Make this Global action used in 2 cases
// 1. to search the application of acceptor by phone number for verifier
// 2. to search the donor by phone number
export const searchUserByPhoneNumAction = withSession<
  PhoneNumSchemaType,
  ServerActionReturnType
>(async (session, user) => {
  user = phoneNumSchema.parse(user);
  if (!user) return new ErrorHandler("user is not registered", "NOT_FOUND");
  const foundUser = await prisma.user.findUnique({
    where: { phoneNum: user.upiPhoneNum },
  });

  return new SuccessResponse(
    "Donor/Acceptor/ZakaatApplications retrived given UPI Phone Number successfully",
    200,
    foundUser
  ).serialize();
});
