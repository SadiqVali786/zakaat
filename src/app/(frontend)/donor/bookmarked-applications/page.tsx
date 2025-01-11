import { auth } from "@/auth";
import Application from "@/components/application";
import BookmarksScrollFeed from "@/components/bookmarks-scroll-feed";
import InfiniteFeedbar from "@/components/infinite-feed-bar";
import PageWrapper from "@/components/page-wrapper";
import { APPLICATIONS_PER_PAGE, TWEETS_PER_PAGE } from "@/config/app.config";
import prisma from "@/db";
import { STATUS } from "@prisma/client";

const BookmarkedApplications = async () => {
  const session = await auth();

  const applications = await prisma.application.findMany({
    where: { status: STATUS.BOOKMARKED, bookmarkedUserId: session?.user.id },
    select: {
      id: true,
      amount: true,
      reason: true,
      hide: true,
      rating: true,
      Verifier: {
        select: { fullname: true, phoneNum: true, selfie: true, id: true },
      },
    },
    take: TWEETS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageWrapper>
      <InfiniteFeedbar type="applications" />
      <div className="flex flex-col gap-y-5 xs:px-4 pt-5">
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
          <BookmarksScrollFeed id={applications[applications.length - 1].id} />
        )}
      </div>
    </PageWrapper>
  );
};

export default BookmarkedApplications;
