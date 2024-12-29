"use client";

import { fetchInfiniteApplicationsFeed } from "@/actions/application.actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import Application from "./application";
import { useSession } from "next-auth/react";
import useAuthorization from "@/hooks/useAuthorization";

type PaginatedOutput<T> = {
  cursor: {
    firstBatch: T[];
    id: number;
    ns: string;
  };
  ok: number;
  hasMore: boolean;
};

type Application = {
  _id: string;
  fullname: string;
  phoneNum: string;
  selfie: string;
  distance: number;
  details: {
    _id: string;
    hide: boolean;
    amount: number;
    reason: string;
    rating: number;
  };
};

export default function InfiniteScrollFeed({ dis = 0 }: { dis?: number }) {
  const { session, router } = useAuthorization();

  const [applications, setApplications] = useState<Application[] | []>([]);
  const [distance, setDistance] = useState<number>(dis);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [actionState, action, isPending] = useActionState(
    fetchInfiniteApplicationsFeed,
    null
  );

  useEffect(() => {
    if (
      actionState &&
      actionState.additional.cursor.firstBatch.length &&
      isPending == false
    ) {
      const additional = actionState.additional as PaginatedOutput<Application>;
      const length = additional.cursor.firstBatch.length;
      // console.log(additional);
      // console.log(additional.cursor);
      setHasMore(additional.hasMore);
      setDistance(additional.cursor.firstBatch[length - 1].distance);
      setApplications((prev) => [...prev, ...additional.cursor.firstBatch]);
    }
  }, [actionState, isPending]);

  // useEffect(() => {
  //   console.log({ applications });
  //   console.log({ distance });
  // }, [applications]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        isPending === false &&
        hasMore
      ) {
        if (timeoutId) return;

        timeoutId = setTimeout(() => {
          timeoutId = null;
          startTransition(() => {
            action({ distance });
          });
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div>
      {applications.map((application) => (
        <Application
          key={application.details._id}
          id={application.details._id}
          fullName={session?.data?.user.fullname || ""}
          money={application.details.amount}
          rank={application.details.rating}
          text={application.details.reason}
        />
      ))}
    </div>
  );
}
