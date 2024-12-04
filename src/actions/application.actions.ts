import prisma from "@/db";
import { withSession } from "@/lib/action-wrappers/session";
import { ErrorHandler } from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import {
  applicationIdSchema,
  ApplicationIdSchemaType,
  createApplicationSchema,
  CreateApplicationSchemaType,
  editApplicationSchema,
  EditApplicationSchemaType,
} from "@/lib/validators/application.validator";
import { ServerActionReturnType } from "@/types/api.types";
import { STATUS } from "@prisma/client";

export const createApplicationAction = withSession<
  CreateApplicationSchemaType,
  ServerActionReturnType
>(async (session, application) => {
  application = createApplicationSchema.parse(application);

  const applicant = await prisma.user.findUnique({
    where: { id: application.authorId },
  });
  if (!applicant)
    return new ErrorHandler("applicant is not registered", "NOT_FOUND");

  await prisma.application.create({
    data: {
      ...application,
      verifiedByVerifierId: session.user.id,
      status: STATUS.VERIFIED,
    },
  });
  return new SuccessResponse(
    "new zakaat application created successfully",
    201
  ).serialize();
});

export const editApplicationAction = withSession<
  EditApplicationSchemaType,
  ServerActionReturnType
>(async (session, application) => {
  application = editApplicationSchema.parse(application);
  await prisma.application.update({
    where: { id: application.authorId },
    data: {
      ...application,
      verifiedByVerifierId: session.user.id,
      status: STATUS.VERIFIED,
    },
  });
  return new SuccessResponse(
    "zakaat application updated successfully",
    200
  ).serialize();
});

export const deleteApplicationAction = withSession<
  ApplicationIdSchemaType,
  ServerActionReturnType
>(async (session, application) => {
  application = applicationIdSchema.parse(application);
  await prisma.application.delete({
    where: { id: application.id },
  });
  return new SuccessResponse(
    "zakaat application deleted successfully",
    200
  ).serialize();
});

export const donateApplicationAction = withSession<
  ApplicationIdSchemaType,
  ServerActionReturnType
>(async (session, application) => {
  application = applicationIdSchema.parse(application);
  await prisma.application.update({
    where: { id: application.id },
    data: { status: STATUS.DONATED },
  });
  return new SuccessResponse(
    "zakaat application donated successfully",
    200
  ).serialize();
});

export const bookmarkApplicationAction = withSession<
  ApplicationIdSchemaType,
  ServerActionReturnType
>(async (session, application) => {
  application = applicationIdSchema.parse(application);
  await prisma.application.update({
    where: { id: application.id },
    data: { status: STATUS.BOOKMARKED },
  });
  return new SuccessResponse(
    "zakaat application bookmarked successfully",
    200
  ).serialize();
});

export const discardApplicationAction = withSession<
  ApplicationIdSchemaType,
  ServerActionReturnType
>(async (session, application) => {
  application = applicationIdSchema.parse(application);
  await prisma.application.update({
    where: { id: application.id },
    data: { status: STATUS.VERIFIED },
  });
  return new SuccessResponse(
    "zakaat application discarded from bookmarked state successfully",
    200
  ).serialize();
});
