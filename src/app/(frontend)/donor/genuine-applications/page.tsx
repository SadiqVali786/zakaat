/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchInfiniteApplicationsFeed } from "@/actions/application.actions";
import { auth } from "@/auth";
import Application from "@/components/application";
import ApplicationsFeedBar from "@/components/applications-feed-bar";
import InfiniteScrollFeed from "@/components/InfiniteScrollFeed";
import {
  APPLICATIONS_PER_PAGE,
  DEFAULT_PAGE,
  MAX_DISTANCE,
} from "@/config/app.config";
import APP_PATHS from "@/config/path.config";
import prisma from "@/db";
import { ROLE } from "@prisma/client";
import { redirect } from "next/navigation";

const GenuineApplications = async () => {
  const session = await auth();
  if (!session || !session.user) redirect(APP_PATHS.SIGNIN);
  if (!session.user.phoneNum) redirect(APP_PATHS.WELCOME);
  if (session.user.role !== ROLE.DONOR) redirect(APP_PATHS.SIGNIN); // TODO: toaster text

  type PaginatedOutput<T> = {
    cursor: {
      firstBatch: T[];
      id: number;
      ns: string;
    };
    ok: number;
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
  const result = await fetchInfiniteApplicationsFeed({}, { distance: 0 });
  const applications = result.additional as PaginatedOutput<Application>;
  // console.log(applications.cursor.firstBatch);
  const length = applications.cursor.firstBatch.length;

  return (
    <main className="grow xs:border-x-[1px] border-neutral-11 max-w-[708px] h-full relative">
      <ApplicationsFeedBar />
      <div className="flex flex-col gap-y-5 xs:px-4 pt-5">
        {applications.cursor.firstBatch.map((application) => (
          <Application
            key={application.details._id}
            id={application.details._id}
            fullName={session?.user.fullname}
            money={application.details.amount}
            rank={application.details.rating}
            text={application.details.reason}
          />
        ))}
        {length ? (
          <InfiniteScrollFeed
            dis={applications.cursor.firstBatch[length - 1].distance}
          />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default GenuineApplications;

{
  /* {Array.from({ length: 20 }).map((_, key) => (
  <Application
    id="hello"
    key={key}
    fullName="Sadiq Vali"
    money="₹20,000"
    rank="7"
    text="Aisha Begum, a 45-year-old widow, struggles to raise her three
      children with a monthly income of ₹6,000. Due to unpaid school fees,
      her children risk losing access to education. Aisha requests ₹20,000
      to cover the overdue fees and purchase necessary school supplies.
      This financial support will help her children continue their studies
      and break the cycle of poverty, giving them hope for a brighter
      future."
  />
))} */
}
