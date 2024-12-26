/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import prisma from "@/db";
import {
  ErrorHandler,
  standardizedApiError,
} from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import { searchTermSchema } from "@/lib/validators/search.validators";
import { createTweetSchema } from "@/lib/validators/tweet.validators";
import { ROLE } from "@prisma/client";
import { z } from "zod";

export const createTweetAction = async (
  previousState: any,
  payload: z.infer<typeof createTweetSchema>
) => {
  try {
    payload = createTweetSchema.parse(payload);
    const session = await auth();
    if (!session || !session.user || session.user.role !== ROLE.DONOR)
      throw new ErrorHandler(
        "You must be authenticated as DONOR to access this resource",
        "UNAUTHORIZED"
      );
    // #########################################################
    const tweet = await prisma.tweet.create({
      data: { ...payload, authorId: session.user.id },
    });
    // const user = await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: { tweets: { connect: { id: tweet.id } } },
    // });
    return new SuccessResponse("new tweet created", 201).serialize();
    // #########################################################
  } catch (error) {
    console.error(error);
    return standardizedApiError(error);
  }
};

// export const searchTweetsAction = withSession<
//   searchTermSchemaType,
//   ServerActionReturnType
// >(async (session, text) => {
//   text = searchTermSchema.parse(text);
//   const searchedResults = await prisma.tweet.findMany({
//     where: {
//       OR: [{ text: { contains: text.searchTerm, mode: "insensitive" } }],
//     },
//     orderBy: { createdAt: "desc" },
//   });
//   return new SuccessResponse(
//     "relavent tweets fetched in descending order",
//     200,
//     searchedResults
//   ).serialize();
// });
