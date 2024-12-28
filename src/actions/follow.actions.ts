/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

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

// DONOR
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
    const connection = await prisma.connection.create({
      data: { from: session.user.id, to: payload.id },
    });
    // await prisma.$transaction(async (txn) => {
    // await txn.user.update({
    //   where: { id: session.user.id },
    //   data: {
    //     following: { connect: { id: connection.id } },
    //   },
    // });
    // await txn.user.update({
    //   where: { id: payload.id },
    //   data: {
    //     followers: { connect: { id: connection.id } },
    //   },
    // });
    // });
    return new SuccessResponse(
      "DONOR to DONOR conection established",
      201
    ).serialize();
    // #########################################################
  } catch (error) {
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
    const connection = await prisma.connection.delete({
      where: { from_to: { from: session.user.id, to: payload.id } },
    });
    return new SuccessResponse(
      "DONOR to DONOR conection removed",
      201
    ).serialize();
    // #########################################################
  } catch (error) {
    return standardizedApiError(error);
  }
};
