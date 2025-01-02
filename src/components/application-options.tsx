"use client";

import React, { startTransition, useActionState, useState } from "react";
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
import Image from "next/image";

type Props = {
  id: string;
};

const ApplicationOptions: React.FC<Props> = ({ id }) => {
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

  return (
    <React.Fragment>
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
                    startTransition(async () => {
                      await bookmarkAction({ id });
                    });
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
                    startTransition(async () => {
                      await donateAction({ id });
                    });
                  }}
                >
                  Donate
                </p>
                <p
                  className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                  onClick={async () => {
                    startTransition(async () => {
                      await discardAction({ id });
                    });
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
                    const phoneNum = useApplicationStoreSelector.use.phoneNum();
                    if (phoneNum)
                      router.push(
                        APP_PATHS.EDIT_APPLICATION +
                          `/${useApplicationStoreSelector.use.phoneNum()}`
                      );
                  }}
                >
                  Edit
                </p>
                <p
                  className="hover:bg-neutral-10 py-1 pt-2 px-4 cursor-pointer"
                  onClick={async () => {
                    startTransition(async () => {
                      await deleteAction({ id });
                    });
                  }}
                >
                  Delete
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ApplicationOptions;
