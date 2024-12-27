import DP from "@/../public/dashboard/dp.png";
import { auth } from "@/auth";
import FollowingTweetsScrollFeed from "@/components/following-tweets-scroll-feed";
import Tweet from "@/components/Tweet";
import TweetInputArea from "@/components/TweetInputArea";

import TweetsFeedBar from "@/components/TweetsFeedBar";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import APP_PATHS from "@/config/path.config";
import prisma from "@/db";
import { ROLE } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) redirect(APP_PATHS.SIGNIN);
  if (!session.user.phoneNum) redirect(APP_PATHS.WELCOME);
  if (session.user.role !== ROLE.DONOR) redirect(APP_PATHS.SIGNIN); // TODO: toaster text

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
    take: TWEETS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  let nextCursor;
  if (followingTweets.length >= TWEETS_PER_PAGE)
    nextCursor = followingTweets[followingTweets.length - 1].id;
  else nextCursor = undefined;

  return (
    <main className="flex-grow border-x-[1px] border-neutral-11 max-w-[708px] h-full">
      <div className="flex flex-col">
        <TweetsFeedBar />
        <TweetInputArea />
        {followingTweets.map((followingTweet) => (
          <Tweet
            key={followingTweet.id}
            dp={DP}
            fullName={followingTweet.Donor.fullname}
            time="2 hr"
            applicationLink="https://www.zakaat.com/zakaat-application/bismilla"
            tweetBody={followingTweet.text}
          />
        ))}
        {/* <Tweet
          dp={DP}
          fullName="Sadiq Vali"
          time="2 hr"
          applicationLink="https://www.zakaat.com/zakaat-application/bismilla"
          tweetBody="Assalamualaikum, @Abeed #everyone. I’m sharing a genuine Zakat
              application for someone who has worked in my shop for 10 years.
              I’ve already given my full Zakat amount elsewhere on this
              platform, so I can’t contribute further. Otherwise, I would have
              fully supported him myself."
        /> */}
        {followingTweets.length === TWEETS_PER_PAGE && (
          <FollowingTweetsScrollFeed id={nextCursor} />
        )}
      </div>
    </main>
  );
}
