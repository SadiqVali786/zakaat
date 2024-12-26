import WrapperCard from "../wrapper-card";
import LogoWithText from "../LandingPage/LogoWithText";
import More from "@/../public/Icons/dashboard/more_horizontal_shade.png";

import SubMenu from "./sub-menu";
import Image from "next/image";

import DP from "@/../public/dashboard/dp.png";
import { verifierSidebar } from "@/lib/constant/app.constant";

export default function VerifierLeftSidebar() {
  return (
    <aside className="hidden xs:flex flex-col justify-between py-8 sticky top-0 max-h-screen lg:max-w-[286px] max-w-[52px] grow">
      <div className="flex flex-col gap-y-[60px] xs:items-start items-center">
        <LogoWithText />
        <div className="w-full">
          {verifierSidebar.map((item) => (
            <SubMenu
              key={item.id}
              icon={item.icon}
              title={item.label}
              path={item.path}
            />
          ))}
        </div>
      </div>
      <WrapperCard className="flex justify-between items-center mr-[10px] lg:py-[10px] lg:px-[20px]">
        <div className="flex gap-x-1 items-center">
          <Image src={DP} alt="DP" />
          <div className="lg:flex flex-col leading-tight hidden">
            <p className="text-blue-50">Sadiq Vali</p>
            <p className="text-neutral-7">@sadiq_vali</p>
          </div>
        </div>
        <Image src={More} alt="more" className="hidden lg:block" />
      </WrapperCard>
    </aside>
  );
}
