/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/db";
import { withSession } from "@/lib/action-wrappers/session";
import { SuccessResponse } from "@/lib/api-error-success-handlers/success";
import {
  searchTermSchema,
  searchTermSchemaType,
} from "@/lib/validators/search.validators";
import {
  createTweetSchema,
  CreateTweetSchemaType,
} from "@/lib/validators/tweet.validators";
import { ServerActionReturnType } from "@/types/api.types";

export const createTweet = withSession<
  CreateTweetSchemaType,
  ServerActionReturnType<any>
>(async (session, tweet) => {
  tweet = createTweetSchema.parse(tweet);
  await prisma.tweet.create({
    data: { text: tweet.text, tweetAuthorId: session.user.id },
  });
  return new SuccessResponse("Tweet created successfully", 201).serialize();
});

export const searchTweetsAction = withSession<
  searchTermSchemaType,
  ServerActionReturnType
>(async (session, text) => {
  text = searchTermSchema.parse(text);
  const searchedResults = await prisma.tweet.findMany({
    where: {
      OR: [{ text: { contains: text.searchTerm, mode: "insensitive" } }],
    },
    orderBy: { createdAt: "desc" },
  });
  return new SuccessResponse(
    "relavent tweets fetched in descending order",
    200,
    searchedResults
  ).serialize();
});
