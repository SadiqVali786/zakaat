"use client";

import { fetchBookmarkedApplicationsFeedAction } from "@/actions/application.actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import Application from "./application";
import { useSession } from "next-auth/react";
import APP_PATHS from "@/config/path.config";
import { redirect } from "next/navigation";
import { ROLE } from "@prisma/client";

const BookmarksScrollFeed = ({ id }: { id: string }) => {
  const session = useSession();
  if (
    session.status === "unauthenticated" ||
    (session.status === "authenticated" &&
      (!session.data?.user || session.data?.user.role !== ROLE.DONOR))
  )
    redirect(APP_PATHS.SIGNIN); // TODO: toaster text

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
      console.log(additional);
      setCursor(additional[length - 1].id);
      setApplications((prev) => [...prev, ...additional]);
    }
  }, [actionState, isPending]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        isPending === false &&
        cursor
      ) {
        startTransition(() => {
          action({ id: cursor });
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cursor]);

  if (!id) return <></>;

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
