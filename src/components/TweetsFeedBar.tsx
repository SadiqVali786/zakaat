"use client";

import APP_PATHS from "@/config/path.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TweetsFeedBar() {
  const pathname = usePathname();

  return (
    <div className="flex border-b-[1px] border-neutral-11 sticky top-0 backdrop-blur-3xl xs:pt-8 pt-4">
      <Link
        href={APP_PATHS.TWEETS}
        className={cn(
          "text-blue-50 py-[10px] leading-tight grow text-center w-[50%]",
          pathname.includes(APP_PATHS.TWEETS)
            ? "border-b-[1px] border-brand-blue"
            : ""
        )}
      >
        Tweets
      </Link>
      <Link
        href={APP_PATHS.FOLLOWING_TWEETS}
        className={cn(
          "text-blue-50 py-[10px] leading-tight grow text-center w-[50%]",
          pathname.includes(APP_PATHS.FOLLOWING_TWEETS)
            ? "border-b-[1px] border-brand-blue"
            : ""
        )}
      >
        Following Tweets
      </Link>
    </div>
  );
}
