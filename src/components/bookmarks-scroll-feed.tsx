"use client";

import { fetchBookmarkedApplicationsFeedAction } from "@/actions/application.actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import Application from "./application";
import useAuthorization from "@/hooks/useAuthorization";

const BookmarksScrollFeed = ({ id }: { id: string }) => {
  const { session, router } = useAuthorization();

  const [cursor, setCursor] = useState<string>(id);
  const [applications, setApplications] = useState<Application[]>([]);

  const [actionState, action, isPending] = useActionState(
    fetchBookmarkedApplicationsFeedAction,
    null
  );

  type Application = {
    id: string;
    fullname: string;
    phoneNum: string;
    selfie: string;
    distance: number;
    details: {
      hide: boolean;
      amount: number;
      reason: string;
      rating: number;
    };
  };

  useEffect(() => {
    if (actionState && isPending == false) {
      const additional = actionState.additional as Application[];
      const length = additional.length;
      // console.log(additional);
      setCursor(additional[length - 1].id);
      setApplications((prev) => [...prev, ...additional]);
    }
  }, [actionState, isPending]);

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
      {applications.map((application) => (
        <Application
          key={application.id}
          id={application.id}
          fullName={session.data?.user.fullname as string}
          money={application.details.amount}
          rank={application.details.rating}
          text={application.details.reason}
        />
      ))}
    </div>
  );
};

export default BookmarksScrollFeed;
