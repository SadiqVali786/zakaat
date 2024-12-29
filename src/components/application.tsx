"use client";

import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import Reciever1 from "@/../public/dashboard/genuine-applications/reciever1.png";
import DP from "@/../public/dashboard/dp.png";
import more from "@/../public/Icons/more_vertical_color.png";
import {
  bookmarkApplicationAction,
  discardApplicationAction,
  deleteAplicationAction,
  donateApplicationAction,
} from "@/actions/application.actions";
import APP_PATHS from "@/config/path.config";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApplicationStoreSelector } from "@/store/application-store";

const Application = ({
  text,
  fullName,
  money,
  rank,
  id,
}: {
  text: string;
  fullName: string;
  money: number;
  rank: number;
  id: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [showOptions, setShowOptions] = useState(false);

  const [bookmarkActionState, bookmarkAction, bookmarkIsPending] =
    useActionState(bookmarkApplicationAction, null);
  const [discardActionState, discardAction, discardIsPending] = useActionState(
    discardApplicationAction,
    null
  );
  const [deleteActionState, deleteAction, deleteIsPending] = useActionState(
    deleteAplicationAction,
    null
  );
  const [donateActionState, donateAction, donateIsPending] = useActionState(
    donateApplicationAction,
    null
  );

  useEffect(() => {
    console.log({ bookmarkActionState });
  }, [bookmarkActionState]);

  return (
    <div className="xs:border-x xs:border-t border-b-[1px] border-neutral-11 xs:rounded-[15px] flex flex-col gap-y-[10px] px-5 w-full min-h-[200vh]">
      <div className="flex gap-4 pt-5 xs:flex-row flex-col items-center">
        <Image
          src={Reciever1}
          alt="donation reciever"
          className="max-h-80 max-w-80 xs:max-w-40 xs:max-h-40 aspect-square"
        />
        <p className="text-base leading-tight">{text}</p>
      </div>
      <div className="flex justify-between items-center pb-5 flex-wrap">
        <div className="flex gap-x-3 items-center">
          <Image src={DP} alt="DP" />
          <div className="flex flex-col text-blue-100">
            <p className="text-[13px] xs:text-[16px] leading-tight">
              Verified By
            </p>
            <p className="text-[13px] xs:text-[16px] leading-tight">
              {fullName}
            </p>
          </div>
        </div>
        <p className="text-[20px] xs:text-[26px] text-blue-100">{money}</p>
        <p className="text-[20px] xs:text-[26px] text-blue-100">{rank}/10</p>
        <div
          className={cn(
            "fixed top-0 right-0 left-0 h-screen w-screen z-50",
            showOptions ? "" : "hidden"
          )}
          onClick={() => setShowOptions(false)}
        />
        <div className="relative">
          <Image src={more} alt="more" onClick={() => setShowOptions(true)} />
          {showOptions && (
            <div
              className="absolute right-2 top-8 z-50 border rounded-md border-neutral-9 flex flex-col gap-y-1 bg-brand-dark"
              onClick={() => setShowOptions(false)}
            >
              {/* /donor/genuine-applications */}
              {pathname.includes(APP_PATHS.ZAKAAT_APPLICATIONS) && (
                <>
                  <p
                    className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                    onClick={async () => {
                      console.log({ id });
                      await bookmarkAction({ id });
                      // console.log(actionState);
                    }}
                  >
                    Bookmark
                  </p>
                  <p
                    className="hover:bg-neutral-10 py-1 pb-2 px-4 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${APP_PATHS.BASE_URL}${APP_PATHS.ZAKAAT_APPLICATIONS}/id=${id}`
                      );
                    }}
                  >
                    Copy Link
                  </p>
                </>
              )}
              {/* /donor/bookmarked-applications */}
              {pathname.includes(APP_PATHS.BOOKMARKED_APPLICATIONS) && (
                <>
                  <p
                    className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                    onClick={async () => {
                      await donateAction({ id });
                      // console.log(actionState1);
                    }}
                  >
                    Donate
                  </p>
                  <p
                    className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                    onClick={async () => {
                      await discardAction({ id });
                      // console.log(actionState1);
                    }}
                  >
                    Discard
                  </p>
                </>
              )}
              {/* /verifier/search-applicant */}
              {pathname.includes(APP_PATHS.SEARCH_APPLICANT) && (
                <>
                  <p
                    className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                    onClick={async () => {
                      const phoneNum =
                        useApplicationStoreSelector.use.phoneNum();
                      if (phoneNum)
                        router.push(
                          APP_PATHS.EDIT_APPLICATION +
                            `/${useApplicationStoreSelector.use.phoneNum()}`
                        );
                      // else
                      // // TODO: toast info regarding invalid action
                    }}
                  >
                    Edit
                  </p>
                  <p
                    className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                    onClick={async () => {
                      await deleteAction({ id });
                      // console.log(actionState1);
                    }}
                  >
                    Delete
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
