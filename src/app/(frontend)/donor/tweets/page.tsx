import DP from "@/../public/dashboard/dp.png";
import { auth } from "@/auth";
import Tweet from "@/components/Tweet";
import TweetInputArea from "@/components/TweetInputArea";
import TweetsScrollFeed from "@/components/tweets-scroll-feed";

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
    take: TWEETS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  let nextCursor;
  if (tweets.length >= TWEETS_PER_PAGE)
    nextCursor = tweets[tweets.length - 1].id;
  else nextCursor = undefined;

  // if (tweets.length === 0) return <></>;

  return (
    <main className="grow border-x-[1px] border-neutral-11 h-full w-full">
      <div className="flex flex-col">
        <TweetsFeedBar />
        <TweetInputArea />
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
        {tweets.length === TWEETS_PER_PAGE && (
          <TweetsScrollFeed id={nextCursor} />
        )}
      </div>
    </main>
  );
}
