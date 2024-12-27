"use client";

import { fetchTweetsAction } from "@/actions/tweet.actions";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import APP_PATHS from "@/config/path.config";
import { ROLE } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import Tweet from "./Tweet";

import DP from "@/../public/dashboard/dp.png";

const TweetsScrollFeed = ({ id }: { id?: string }) => {
  const session = useSession();

  if (
    session.status === "unauthenticated" ||
    (session.status === "authenticated" &&
      (!session.data?.user || session.data?.user.role !== ROLE.DONOR))
  )
    redirect(APP_PATHS.SIGNIN); // TODO: toaster text

  type Tweet = {
    id: string;
    text: string;
    createdAt: Date;
    Donor: {
      fullname: string;
      selfie: string;
    };
  };

  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const [cursor, setCursor] = useState<string | undefined>(id);

  const [actionState, action, isPending] = useActionState(
    fetchTweetsAction,
    null
  );

  useEffect(() => {
    if (actionState && isPending == false) {
      const additional = actionState.additional as Tweet[];
      console.log(actionState);
      const length = additional.length;
      if (length === TWEETS_PER_PAGE) setCursor(additional[length - 1].id);
      else setCursor(undefined);
      setTweets((prev) => [...prev, ...additional]);
    }
  }, [actionState, isPending]);

  useEffect(() => {
    console.log(tweets);
    console.log(cursor);
  }, [tweets]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        isPending === false &&
        cursor
      ) {
        // console.log({ distance });
        startTransition(() => {
          action({ id: cursor });
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cursor]);

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          dp={DP}
          fullName={tweet.Donor.fullname}
          time="2 hr"
          applicationLink="https://www.zakaat.com/zakaat-application/bismilla"
          tweetBody={tweet.text}
        />
      ))}
    </div>
  );
};

export default TweetsScrollFeed;
