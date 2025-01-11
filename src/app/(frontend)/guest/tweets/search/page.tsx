import Tweet from "@/components/Tweet";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import prisma from "@/db";
import DP from "@/../public/dashboard/dp.png";
import PageWrapper from "@/components/page-wrapper";
import InfiniteFeedbar from "@/components/infinite-feed-bar";

const SearchTweets = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      text: {
        contains: searchParams.searchTerm as string,
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

  return (
    <PageWrapper>
      <div className="flex flex-col">
        <InfiniteFeedbar type="empty" />
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
    </PageWrapper>
  );
};

export default SearchTweets;
