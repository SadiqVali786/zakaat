import Image from "next/image";
import React from "react";
import Reciever1 from "@/../public/dashboard/genuine-applications/reciever1.png";
import DP from "@/../public/dashboard/dp.png";
import more from "@/../public/Icons/more_vertical.png";

const Application = () => {
  return (
    <div className="pt-[20px] px-[14px]">
      <div className="border border-neutral-11 rounded-[15px] flex flex-col gap-y-[10px]">
        <div className="flex gap-x-4 px-5 pt-5">
          <Image src={Reciever1} alt="donation reciever" />
          <p className="text-base leading-tight">
            Aisha Begum, a 45-year-old widow, struggles to raise her three
            children with a monthly income of ₹6,000. Due to unpaid school fees,
            her children risk losing access to education. Aisha requests ₹20,000
            to cover the overdue fees and purchase necessary school supplies.
            This financial support will help her children continue their studies
            and break the cycle of poverty, giving them hope for a brighter
            future.
          </p>
        </div>
        <div className="flex justify-between items-center px-5 pb-5">
          <div className="flex gap-x-3 items-center">
            <Image src={DP} alt="DP" />
            <div className="flex flex-col text-blue-100">
              <p className="leading-tight">Verified By</p>
              <p className="leading-tight">
                Sadiq Vali <span className="text-neutral-7">@sadiq</span>
              </p>
            </div>
          </div>
          <p>
            still need{" "}
            <span className="text-[26px] text-blue-100">₹20,000</span>
          </p>
          <p className="text-[26px] text-blue-100">7/10</p>
          <Image src={more} alt="more" />
        </div>
      </div>
    </div>
  );
};

export default Application;
