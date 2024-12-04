import prisma from "@/db";
import { withSession } from "@/lib/action-wrappers/session";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import { userIdSchema, UserIdSchemaType } from "@/lib/validators/global";
import { ServerActionReturnType } from "@/types/api.types";

export const followDonor = withSession<
  UserIdSchemaType,
  ServerActionReturnType
>(async (session, fellowDonorId) => {
  fellowDonorId = userIdSchema.parse(fellowDonorId);

  await prisma.$transaction(async (txn) => {
    await txn.user.update({
      where: { id: fellowDonorId.id },
      data: {
        following: {
          connect: { id: session.user.id },
        },
      },
    });
    await txn.user.update({
      where: { id: session.user.id },
      data: {
        followers: {
          connect: { id: fellowDonorId.id },
        },
      },
    });
    return true;
  });

  return new SuccessResponse(
    "donor connection established successfully",
    200
  ).serialize();
});

export const unfollowDonor = withSession<
  UserIdSchemaType,
  ServerActionReturnType
>(async (session, unfellowDonorId) => {
  unfellowDonorId = userIdSchema.parse(unfellowDonorId);

  await prisma.$transaction(async (txn) => {
    await txn.user.update({
      where: { id: unfellowDonorId.id },
      data: {
        following: {
          disconnect: { id: session.user.id },
        },
      },
    });
    await txn.user.update({
      where: { id: session.user.id },
      data: {
        followers: {
          disconnect: { id: unfellowDonorId.id },
        },
      },
    });
    return true;
  });

  return new SuccessResponse(
    "donor connection removed successfully",
    200
  ).serialize();
});
