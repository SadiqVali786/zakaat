"use client";

import { fetchInfiniteApplicationsFeed } from "@/actions/application.actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import Application from "./application";
import { useSession } from "next-auth/react";

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

export default function InfiniteScrollFeed({ dis = 0 }: { dis?: number }) {
  const session = useSession();

  const [applications, setApplications] = useState<Application[] | []>([]);
  const [distance, setDistance] = useState<number>(dis);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [actionState, action, isPending] = useActionState(
    fetchInfiniteApplicationsFeed,
    null
  );

  useEffect(() => {
    if (actionState && isPending == false) {
      const additional = actionState.additional as PaginatedOutput<Application>;
      const length = additional.cursor.firstBatch.length;
      console.log(additional);
      console.log(additional.cursor);
      setHasMore(additional.hasMore);
      setDistance(additional.cursor.firstBatch[length - 1].distance);
      setApplications((prev) => [...prev, ...additional.cursor.firstBatch]);
    }
  }, [actionState, isPending]);

  useEffect(() => {
    console.log({ applications });
    console.log({ distance });
  }, [applications]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        isPending === false &&
        hasMore
      ) {
        // console.log({ distance });
        startTransition(() => {
          action({ distance });
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div>
      {applications.map((application) => (
        <Application
          key={application.id}
          id={application.id}
          fullName={session?.data?.user.fullname || ""}
          money={application.details.amount}
          rank={application.details.rating}
          text={application.details.reason}
        />
      ))}
    </div>
  );
}
