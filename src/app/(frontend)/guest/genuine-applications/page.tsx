/* eslint-disable @typescript-eslint/no-explicit-any */
import Application from "@/components/application";
import GuestScrollFeed from "@/components/guest-scroll-feed";
import InfiniteFeedbar from "@/components/infinite-feed-bar";
import PageWrapper from "@/components/page-wrapper";
import { APPLICATIONS_PER_PAGE } from "@/config/app.config";
import prisma from "@/db";

const GenuineApplications = async () => {
  const applications = await prisma.application.findMany({
    select: {
      id: true,
      amount: true,
      reason: true,
      rating: true,
      Verifier: {
        select: { fullname: true, phoneNum: true, selfie: true, id: true },
      },
    },
    take: APPLICATIONS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageWrapper>
      <InfiniteFeedbar type="applications" />
      <div className="flex flex-col gap-y-5 xs:px-4 py-5">
        {applications.map((application) => (
          <Application
            key={application.id}
            id={application.id}
            fullName={application.Verifier?.fullname as string}
            money={application.amount}
            rank={application.rating}
            text={application.reason}
          />
        ))}
        {applications.length === APPLICATIONS_PER_PAGE && (
          <GuestScrollFeed id={applications[applications.length - 1].id} />
        )}
      </div>
    </PageWrapper>
  );
};

export default GenuineApplications;
