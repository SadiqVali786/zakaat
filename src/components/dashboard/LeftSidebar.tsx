import WrapperCard from "../wrapper-card";
import LogoWithText from "../LandingPage/LogoWithText";
import More from "@/../public/Icons/dashboard/more_horizontal_shade.png";

import MenuTitle from "./menu-title";
import SubMenu from "./sub-menu";
import Image from "next/image";

import DP from "@/../public/dashboard/dp.png";

export default function LeftSidebar() {
  return (
    <aside className="flex flex-col justify-between py-8 sticky top-0 max-h-screen min-w-[286px]">
      <div className="flex flex-col gap-y-11">
        <LogoWithText />
        <div>
          <MenuTitle />
          <SubMenu />
          <SubMenu />
          <SubMenu />
          <SubMenu />
          <SubMenu />
          <SubMenu />
        </div>
        <div>
          <MenuTitle />
          <SubMenu />
          <SubMenu />
        </div>
      </div>
      <WrapperCard className="flex justify-between items-center mx-[10px] py-[10px] px-[20px]">
        <div className="flex gap-x-1 items-center">
          <Image src={DP} alt="DP" />
          <div className="flex flex-col leading-tight">
            <p className="text-blue-50">Sadiq Vali</p>
            <p className="text-neutral-7">@sadiq_vali</p>
          </div>
        </div>
        <Image src={More} alt="more" />
      </WrapperCard>
    </aside>
  );
}
