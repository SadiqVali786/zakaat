/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import prisma from "@/db";
import {
  ErrorHandler,
  standardizedApiError,
} from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import { idSchema } from "@/lib/validators/global";
import { ROLE } from "@prisma/client";
import { z } from "zod";

export const followDonor = async (
  previousState: any,
  payload: z.infer<typeof idSchema>
) => {
  try {
    payload = idSchema.parse(payload);
    const session = await auth();
    if (!session || !session.user || session.user.role !== ROLE.DONOR)
      throw new ErrorHandler(
        "You must be authenticated as DONOR to access this resource",
        "UNAUTHORIZED"
      );
    // #########################################################
    await prisma.$transaction(async (txn) => {
      await txn.user.update({
        where: { id: payload.id },
        data: {
          connections: { connect: { connectionId: session.user.id } },
        },
      });
      await prisma.$transaction(async (txn) => {
        await txn.user.update({
          where: { id: session.user.id },
          data: {
            connections: { connect: { connectionId: payload.id } },
          },
        });
      });
    });
    return new SuccessResponse(
      "new DONOR to DONOR conection established",
      201
    ).serialize();
    // #########################################################
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};

export const unfollowDonor = async (
  previousState: any,
  payload: z.infer<typeof idSchema>
) => {
  try {
    payload = idSchema.parse(payload);
    const session = await auth();
    if (!session || !session.user || session.user.role !== ROLE.DONOR)
      throw new ErrorHandler(
        "You must be authenticated as DONOR to access this resource",
        "UNAUTHORIZED"
      );
    // #########################################################
    await prisma.$transaction(async (txn) => {
      await txn.user.update({
        where: { id: payload.id },
        data: {
          connections: { disconnect: { connectionId: session.user.id } },
        },
      });
      await prisma.$transaction(async (txn) => {
        await txn.user.update({
          where: { id: session.user.id },
          data: {
            connections: { disconnect: { connectionId: payload.id } },
          },
        });
      });
    });
    return new SuccessResponse(
      "DONOR to DONOR conection removed",
      201
    ).serialize();
    // #########################################################
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};
