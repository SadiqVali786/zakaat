/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import prisma from "@/db";
import {
  ErrorHandler,
  standardizedApiError,
} from "@/lib/api-error-success-handlers/error";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import { idSchema } from "@/lib/validators/global";
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

export const fetchTweetsAction = async (
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
    const tweets = await prisma.tweet.findMany({
      select: {
        id: true,
        text: true,
        Donor: {
          select: {
            fullname: true,
            selfie: true,
          },
        },
        createdAt: true,
      },
      skip: 1,
      take: TWEETS_PER_PAGE,
      cursor: { id: payload.id },
      orderBy: { createdAt: "desc" },
    });
    // const user = await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: { tweets: { connect: { id: tweet.id } } },
    // });
    return new SuccessResponse("new tweet created", 201, tweets).serialize();
    // #########################################################
  } catch (error) {
    return standardizedApiError(error);
  }
};

export const fetchFollowingTweetsAction = async (
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
    const followingTweets = await prisma.tweet.findMany({
      where: {
        Donor: {
          followers: {
            some: { from: session.user.id },
          },
        },
      },
      select: {
        id: true,
        text: true,
        Donor: {
          select: {
            fullname: true,
            selfie: true,
          },
        },
        createdAt: true,
      },
      skip: 1,
      take: TWEETS_PER_PAGE,
      cursor: { id: payload.id },
      orderBy: { createdAt: "desc" },
    });
    // const user = await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: { tweets: { connect: { id: tweet.id } } },
    // });
    return new SuccessResponse(
      "new tweets fetched",
      201,
      followingTweets
    ).serialize();
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
