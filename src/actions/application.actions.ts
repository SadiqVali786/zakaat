/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth } from "@/auth";
import prisma from "@/db";
import {
  ErrorHandler,
  standardizedApiError,
} from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import { applicationSchema } from "@/lib/validators/application.validator";
import { idSchema } from "@/lib/validators/global";
import { ROLE, STATUS } from "@prisma/client";
import { z } from "zod";

export const createApplicationAction = async (
  previousState: any,
  payload: z.infer<typeof applicationSchema>
) => {
  try {
    payload = applicationSchema.parse(payload);
    const session = await auth();
    if (!session || !session.user || session.user.role !== ROLE.VERIFIER)
      throw new ErrorHandler(
        "You must be authenticated as VERIFIER to access this resource",
        "UNAUTHORIZED"
      );
    // #########################################################
    const applicant = await prisma.user.findUnique({
      // where: { phoneNum: payload.phoneNum, role: ROLE.ACCEPTOR },
      where: { phoneNum: payload.phoneNum },
    });
    if (!applicant)
      return new ErrorHandler("applicant is not registered", "NOT_FOUND");

    await prisma.application.create({
      data: {
        authorId: applicant.id,
        status: STATUS.VERIFIED,
        verifierUserId: session.user.id,
        amount: String(payload.amount),
        rating: payload.rating,
        reason: payload.reason,
        hide: payload.hide,
      },
    });
    return new SuccessResponse(
      "new zakaat application created successfully",
      201
    ).serialize();
    // #########################################################
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};

export const editApplicationAction = async (
  previousState: any,
  payload: z.infer<typeof applicationSchema>
) => {
  try {
    payload = applicationSchema.parse(payload);
    const session = await auth();
    if (!session || !session.user || session.user.role !== ROLE.VERIFIER)
      throw new ErrorHandler(
        "You must be authenticated as VERIFIER to access this resource",
        "UNAUTHORIZED"
      );
    // #########################################################
    const applicant = await prisma.user.findUnique({
      // where: { id: payload.id, role: ROLE.ACCEPTOR },
      where: { id: payload.id },
    });
    if (!applicant)
      return new ErrorHandler("applicant is not registered", "NOT_FOUND");

    await prisma.application.update({
      where: { id: payload.id },
      data: {
        authorId: payload.authorId,
        status: STATUS.VERIFIED,
        verifierUserId: session.user.id,
        amount: String(payload.amount),
        rating: payload.rating,
        reason: payload.reason,
        hide: payload.hide,
      },
    });
    return new SuccessResponse("zakaat application created", 201).serialize();
    // #########################################################
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};

export const deleteAplicationAction = async (
  previousState: any,
  payload: z.infer<typeof idSchema>
) => {
  try {
    payload = idSchema.parse(payload);
    const session = await auth();
    if (!session || !session.user || session.user.role !== ROLE.VERIFIER)
      throw new ErrorHandler(
        "You must be authenticated as VERIFIER to access this resource",
        "UNAUTHORIZED"
      );
    // #########################################################
    await prisma.application.delete({ where: { id: payload.id } });
    return new SuccessResponse("zakaat application deleted", 200).serialize();
    // #########################################################
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};

export const donateApplicationAction = async (
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
    const application = await prisma.application.update({
      where: { id: payload.id },
      data: {
        status: STATUS.DONATED,
        donatedUserId: session?.user.id,
        bookmarkedUserId: null,
      },
    });
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        bookmarks: { disconnect: { id: payload.id } },
        donated: { connect: { id: payload.id } },
      },
    });
    return new SuccessResponse(
      "application status changed to donated",
      200
    ).serialize();
    // #########################################################
  } catch (error) {
    return standardizedApiError(error);
  }
};

export const bookmarkApplicationAction = async (
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
    const application = await prisma.application.update({
      where: { id: payload.id },
      data: { status: STATUS.BOOKMARKED, bookmarkedUserId: session?.user.id },
    });
    const user = await prisma.user.update({
      where: { id: session?.user.id },
      data: { bookmarks: { connect: { id: payload.id } } },
    });
    return new SuccessResponse(
      "application status changed to bookmarked",
      200
    ).serialize();
    // #########################################################
  } catch (error) {
    return standardizedApiError(error);
  }
};

export const discardApplicationAction = async (
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
    await prisma.application.update({
      where: { id: payload.id },
      data: { status: STATUS.VERIFIED, bookmarkedUserId: null },
    });
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { bookmarks: { disconnect: { id: payload.id } } },
    });
    return new SuccessResponse(
      "application status is changed to VERIFIED from BOOKMARKED",
      200
    ).serialize();
    // #########################################################
  } catch (error) {
    return standardizedApiError(error);
  }
};
