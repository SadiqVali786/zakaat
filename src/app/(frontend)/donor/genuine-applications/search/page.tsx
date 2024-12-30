import { auth } from "@/auth";
import Application from "@/components/application";
import ApplicationsFeedBar from "@/components/applications-feed-bar";
import { APPLICATIONS_PER_PAGE } from "@/config/app.config";
import prisma from "@/db";
import { ErrorHandler } from "@/lib/api-error-success-handlers/error";
import { ROLE } from "@prisma/client";

const SearchApplications = async ({
  searchParams,
}: {
  searchParams: { searchTerm: string };
}) => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== ROLE.DONOR)
    throw new ErrorHandler(
      "You must be authenticated as DONOR to access this resource",
      "UNAUTHORIZED"
    );
  const params = await searchParams;
  // console.log({ searchTerm: params.searchTerm });
  const applications = await prisma.application.findMany({
    where: {
      reason: {
        contains: params.searchTerm,
        mode: "insensitive",
      },
    },
    take: APPLICATIONS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });
  // console.log({ applications });

  return (
    <main className="grow xs:border-x-[1px] border-neutral-11 max-w-[708px] h-full relative">
      <ApplicationsFeedBar />
      <div className="flex flex-col gap-y-5 xs:px-4 pt-5">
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
      </div>
    </main>
  );
};

export default SearchApplications;
