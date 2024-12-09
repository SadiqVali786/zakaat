import Image from "next/image";
import React from "react";
import Reciever1 from "@/../public/dashboard/genuine-applications/reciever1.png";
import DP from "@/../public/dashboard/dp.png";
import more from "@/../public/Icons/more_vertical_color.png";

const Application = ({
  text,
  fullName,
  money,
  rank,
}: {
  text: string;
  fullName: string;
  money: string;
  rank: string;
}) => {
  return (
    <div className="xs:border-x xs:border-t border-b-[1px] border-neutral-11 xs:rounded-[15px] flex flex-col gap-y-[10px] px-5">
      <div className="flex gap-4 pt-5 xs:flex-row flex-col items-center">
        <Image
          src={Reciever1}
          alt="donation reciever"
          className="max-h-80 max-w-80 xs:max-w-40 xs:max-h-40 aspect-square"
        />
        <p className="text-base leading-tight">{text}</p>
      </div>
      <div className="flex justify-between items-center pb-5 flex-wrap">
        <div className="flex gap-x-3 items-center">
          <Image src={DP} alt="DP" />
          <div className="flex flex-col text-blue-100">
            <p className="text-[13px] xs:text-[16px] leading-tight">
              Verified By
            </p>
            <p className="text-[13px] xs:text-[16px] leading-tight">
              {fullName}
            </p>
          </div>
        </div>
        <p className="text-[20px] xs:text-[26px] text-blue-100">{money}</p>
        <p className="text-[20px] xs:text-[26px] text-blue-100">{rank}/10</p>
        <Image src={more} alt="more" />
      </div>
    </div>
  );
};

export default Application;
