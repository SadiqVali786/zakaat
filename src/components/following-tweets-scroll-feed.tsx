"use client";

import {
  fetchFollowingTweetsAction,
  fetchTweetsAction,
} from "@/actions/tweet.actions";
import { TWEETS_PER_PAGE } from "@/config/app.config";
import { startTransition, useActionState, useEffect, useState } from "react";
import Tweet from "./Tweet";

import DP from "@/../public/dashboard/dp.png";
import useAuthorization from "@/hooks/useAuthorization";

const FollowingTweetsScrollFeed = ({ id }: { id?: string }) => {
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

  const [followingTweets, setFollowingTweets] = useState<Tweet[] | []>([]);
  const [cursor, setCursor] = useState<string | undefined>(id);

  const [actionState, action, isPending] = useActionState(
    fetchFollowingTweetsAction,
    null
  );

  useEffect(() => {
    if (actionState && isPending == false) {
      const additional = actionState.additional as Tweet[];
      const length = additional.length;
      // console.log(additional);
      if (length === TWEETS_PER_PAGE) setCursor(additional[length - 1].id);
      else setCursor(undefined);
      setFollowingTweets((prev) => [...prev, ...additional]);
    }
  }, [actionState, isPending]);

  // useEffect(() => {
  //   console.log({ followingTweets });
  //   console.log({ cursor });
  // }, [followingTweets]);

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
    </div>
  );
};

export default FollowingTweetsScrollFeed;
