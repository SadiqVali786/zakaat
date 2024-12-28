"use client";

import { fetchTweetsAction } from "@/actions/tweet.actions";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import { startTransition, useActionState, useEffect, useState } from "react";
import Tweet from "./Tweet";

import DP from "@/../public/dashboard/dp.png";
import useAuthorization from "@/hooks/useAuthorization";

const TweetsScrollFeed = ({ id }: { id?: string }) => {
  const { session, router } = useAuthorization();

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

  // useEffect(() => {
  //   console.log(tweets);
  //   console.log(cursor);
  // }, [tweets]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        isPending === false &&
        cursor
      ) {
        if (timeoutId) return;

        timeoutId = setTimeout(() => {
          timeoutId = null;
          startTransition(() => {
            action({ id: cursor });
          });
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
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
