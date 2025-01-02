"use client";

import React, { startTransition, useActionState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import Image from "next/image";
import DP from "@/../public/dashboard/dp.png";
import Post from "@/../public/Icons/dashboard/send.png";
import { createTweetAction } from "@/actions/tweet.actions";

const initialConfig = {
  namespace: "TweetEditor",
  theme: {},
  onError: (error: Error) => console.error(error),
  nodes: [],
};

function PostTweetButton() {
  const [editor] = useLexicalComposerContext();
  const [actionState, action, isPending] = useActionState(
    createTweetAction,
    null
  );

  const saveTweet = async () => {
    editor.update(async () => {
      const rawContent = $getRoot().getTextContent();
      console.log("Saved Tweet:", rawContent); // TODO: test whether it is saving or not
      startTransition(async () => {
        await action({ text: rawContent });
      });
    });
  };

  return (
    <button
      className="rounded-[8px] p-[1px] bg-gradient-to-r from-[#4135F3] to-[#BE52F2] absolute xs:right-6 xs:bottom-6 right-3 bottom-3"
      onClick={saveTweet}
    >
      <div className="bg-brand-dark flex gap-x-2 px-4 py-2 rounded-[8px]">
        <Image alt="post" src={Post} />
        <p>Post</p>
      </div>
    </button>
  );
}

export default function TweetInput() {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="xs:p-8 p-4 xs:min-h-52 min-h-44 flex flex-col border-b-[1px] border-neutral-11 relative">
        <div className="flex gap-x-2 items-start h-full w-full">
          <Image src={DP} alt="DP" className="w-[50px] h-[50px]" />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="placeholder:text-neutral-7 text-blue-50 bg-brand-dark flex-grow resize-none border-transparent focus:border-transparent focus:ring-0 outline-none overflow-hidden" />
            }
            ErrorBoundary={() => <div>Error loading editor</div>}
          />
        </div>
        <PostTweetButton />
      </div>
    </LexicalComposer>
  );
}
