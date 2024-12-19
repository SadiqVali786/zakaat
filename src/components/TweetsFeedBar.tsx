import React from "react";

export default function TweetsFeedBar() {
  return (
    <div className="flex border-b-[1px] border-neutral-11 sticky top-0 backdrop-blur-3xl xs:pt-8 pt-4">
      <p className="text-blue-50 py-[10px] leading-tight grow text-center border-b-[1px] border-brand-blue">
        Tweets
      </p>
      <p className="text-neutral-7 py-[10px] leading-tight grow text-center">
        Following Tweets
      </p>
    </div>
  );
}