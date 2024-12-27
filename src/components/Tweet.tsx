import Image, { StaticImageData } from "next/image";

export default function Tweet({
  fullName,
  time,
  applicationLink,
  tweetBody,
  dp,
}: {
  fullName: string;
  time: string;
  applicationLink?: string;
  tweetBody: string;
  dp: StaticImageData;
}) {
  return (
    <div className="xs:p-8 p-4 flex gap-2 items-start border-b-[1px] border-neutral-11 min-h-screen">
      <Image src={dp} alt="DP" className="w-[50px] h-[50px]" />
      <div>
        <div className="flex gap-x-1 text-neutral-7">
          <p className="text-blue-50">{fullName}</p>
          <p>@{fullName.toLowerCase().replace(" ", "-")}</p>
          <p>-</p>
          <p>{time}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-base">{tweetBody}</p>
          {!!applicationLink && (
            <p>
              <br />
              Link to the zakaat Applicant <br />
              <span className="text-purple-300">{applicationLink}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
