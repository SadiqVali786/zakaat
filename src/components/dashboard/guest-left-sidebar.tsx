import WrapperCard from "../wrapper-card";
import LogoWithText from "../LandingPage/LogoWithText";
import More from "@/../public/Icons/dashboard/more_horizontal_shade.png";
import SubMenu from "./sub-menu";
import Image from "next/image";

import DP from "@/../public/dashboard/dp.png";
import { guestSidebar } from "@/lib/constant/app.constant";

export default function GuestLeftSidebar() {
  return (
    <aside className="hidden xs:flex flex-col justify-between py-8 sticky top-0 max-h-screen lg:min-w-[286px] min-w-[52px]">
      <div className="flex flex-col gap-y-[60px] xs:items-start items-center w-full">
        <LogoWithText />
        <div className="w-full">
          {guestSidebar.map((item) => (
            <SubMenu
              key={item.label}
              icon={item.icon}
              title={item.label}
              path={item.path}
            />
          ))}
        </div>
      </div>
      <div className="lg:pr-[10px]">
        <WrapperCard className="flex justify-between items-center lg:py-[10px] lg:px-[20px] w-full">
          <div className="flex gap-x-1 items-center">
            <Image src={DP} alt="DP" />
            <div className="lg:flex flex-col leading-tight hidden">
              <p className="text-blue-50">Sadiq Vali</p>
              <p className="text-neutral-7">@sadiq_vali</p>
            </div>
          </div>
          <Image src={More} alt="more" className="hidden lg:block" />
        </WrapperCard>
      </div>
    </aside>
  );
}
