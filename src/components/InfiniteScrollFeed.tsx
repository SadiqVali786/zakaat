"use client";

import { fetchInfiniteApplicationsFeed } from "@/actions/application.actions";
import { useActionState, useEffect, useState } from "react";
import Application from "./application";
import useModifiedInfiniteScroll from "@/hooks/use-modified-infinite-scroll";

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
      setHasMore(additional.hasMore);
      setDistance(additional.cursor.firstBatch[length - 1].distance);
      setApplications((prev) => [...prev, ...additional.cursor.firstBatch]);
    }
  }, [actionState, isPending]);

  useModifiedInfiniteScroll({ action, hasMore, distance, isPending });

  return (
    <div>
      {applications.map((application) => (
        <Application
          key={application.details._id}
          id={application.details._id}
          fullName={application.fullname}
          money={application.details.amount}
          rank={application.details.rating}
          text={application.details.reason}
        />
      ))}
    </div>
  );
}
