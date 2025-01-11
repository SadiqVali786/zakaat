"use client";

import APP_PATHS from "@/config/path.config";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FeedbarType = {
  type: "applications" | "tweets" | "path" | "empty";
};

export default function InfiniteFeedbar({ type }: FeedbarType) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex border-b-[1px] border-neutral-11 sticky top-0 backdrop-blur-3xl xs:pt-8 pt-4 h-[72px]",
        { "gap-x-2 pl-4 pb-4 items-center": type === "path" },
        { "": type === "empty" }
      )}
    >
      {type === "applications" ? (
        <>
          <p className="text-blue-50 w-[33.33%] py-[10px] leading-tight grow text-center border-b-[1px] border-brand-blue cursor-pointer">
            Nearest
          </p>
          <p className="text-neutral-7 w-[33.33%] py-[10px] leading-tight grow text-center cursor-not-allowed">
            Rating -- High to Low
          </p>
          <p className="text-neutral-7 w-[33.33%] py-[10px] leading-tight grow text-center cursor-not-allowed">
            Newest
          </p>
        </>
      ) : type === "tweets" ? (
        <>
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
        </>
      ) : type === "path" ? (
        <>
          <Image
            alt="back"
            src={ICONS["arrow-backward-black"]}
            className="cursor-pointer"
          />
          <span>{pathname.split("/")[length - 1]}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
