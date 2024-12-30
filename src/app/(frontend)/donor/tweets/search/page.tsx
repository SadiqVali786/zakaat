import { auth } from "@/auth";
import Tweet from "@/components/Tweet";
import TweetsFeedBar from "@/components/TweetsFeedBar";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import prisma from "@/db";
import { ErrorHandler } from "@/lib/api-error-success-handlers/error";
import { ROLE } from "@prisma/client";
import DP from "@/../public/dashboard/dp.png";

const SearchTweets = async ({
  searchParams,
}: {
  searchParams: { searchTerm: string };
}) => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== ROLE.DONOR)
    throw new ErrorHandler(
      "You must be authenticated as DONOR to access this resource",
      "UNAUTHORIZED"
    );
  const params = await searchParams;
  // console.log({ searchTerm: params.searchTerm });
  const tweets = await prisma.tweet.findMany({
    where: {
      text: {
        contains: params.searchTerm,
        mode: "insensitive",
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
    take: TWEETS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });
  // console.log({ tweets });

  return (
    <main className="flex-grow border-x-[1px] border-neutral-11 max-w-[708px] h-full">
      <div className="flex flex-col">
        <TweetsFeedBar />
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            dp={DP}
            fullName={tweet.Donor.fullname}
            time={tweet.createdAt}
            applicationLink="https://www.zakaat.com/zakaat-application/bismilla"
            tweetBody={tweet.text}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchTweets;
