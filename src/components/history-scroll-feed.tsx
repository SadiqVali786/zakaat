"use client";

import { fetchBookmarkedApplicationsFeedAction } from "@/actions/application.actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import Application from "./application";
import { useSession } from "next-auth/react";
import { ROLE, STATUS } from "@prisma/client";
import APP_PATHS from "@/config/path.config";
import { redirect } from "next/navigation";
import useAuthorization from "@/hooks/useAuthorization";

const HistoryScrollFeed = ({ id }: { id: string }) => {
  const { session, router } = useAuthorization();

  const [cursor, setCursor] = useState<string>(id);
  const [applications, setApplications] = useState<Application[]>([]);

  const [actionState, action, isPending] = useActionState(
    fetchBookmarkedApplicationsFeedAction,
    null
  );

  type Application = {
    id: string;
    status: STATUS;
    authorId: string;
    amount: number;
    reason: string;
    hide: boolean;
    rating: number;
    bookmarkedUserId: string | null;
    verifierUserId: string | null;
    donatedUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };

  useEffect(() => {
    if (actionState && actionState.additional.length && isPending == false) {
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
          money={application.amount}
          rank={application.rating}
          text={application.reason}
        />
      ))}
    </div>
  );
};

export default HistoryScrollFeed;
