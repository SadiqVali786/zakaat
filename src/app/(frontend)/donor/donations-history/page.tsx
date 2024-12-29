import { auth } from "@/auth";
import Application from "@/components/application";
import ApplicationsFeedBar from "@/components/applications-feed-bar";
import HistoryScrollFeed from "@/components/history-scroll-feed";
import { APPLICATIONS_PER_PAGE } from "@/config/app.config";
import APP_PATHS from "@/config/path.config";
import prisma from "@/db";
import { ROLE, STATUS } from "@prisma/client";
import { redirect } from "next/navigation";

const BookmarkedApplications = async () => {
  const session = await auth();
  if (!session || !session.user) redirect(APP_PATHS.SIGNIN);
  if (!session.user.phoneNum) redirect(APP_PATHS.WELCOME);
  if (session.user.role !== ROLE.DONOR) redirect(APP_PATHS.SIGNIN); // TODO: toaster text

  const applications = await prisma.application.findMany({
    where: { status: STATUS.DONATED, donatedUserId: session?.user.id },
    take: APPLICATIONS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="grow xs:border-x-[1px] border-neutral-11 max-w-[708px] h-full relative">
      <ApplicationsFeedBar />
      <div className="flex flex-col gap-y-5 xs:px-4 pt-5">
        {/* {Array.from({ length: 20 }).map((_, key) => (
          <Application
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
        ))} */}
        {applications.map((application) => (
          <Application
            key={application.id}
            id={application.id}
            fullName={session?.user.fullname}
            money={application.amount}
            rank={application.rating}
            text={application.reason}
          />
        ))}
        {applications.length === APPLICATIONS_PER_PAGE && (
          <HistoryScrollFeed id={applications[applications.length - 1].id} />
        )}
      </div>
    </main>
  );
};

export default BookmarkedApplications;
