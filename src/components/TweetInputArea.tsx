import Image from "next/image";
import React from "react";
import Button from "./common/Button";
import DP from "@/../public/dashboard/dp.png";
import Post from "@/../public/Icons/dashboard/send.png";

export default function TweetInputArea() {
  return (
    <div className="xs:p-8 p-4 xs:min-h-52 min-h-44 flex flex-col border-b-[1px] border-neutral-11 relative">
      <div className="flex gap-x-2 items-start">
        <Image src={DP} alt="DP" className="w-[50px] h-[50px]" />
        <textarea
          placeholder="What is happening?"
          rows={4}
          className="placeholder:text-neutral-7 text-blue-50 bg-brand-dark flex-grow resize-none border-transparent focus:border-transparent focus:ring-0 outline-none overflow-hidden"
        />
      </div>
      <Button
        text="Post"
        icon={Post}
        className="absolute xs:right-6 xs:bottom-6 right-3 bottom-3"
      />
    </div>
  );
}
