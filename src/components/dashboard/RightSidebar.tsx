import Image from "next/image";
import Input from "../ui/global/input";
import WrapperCard from "../wrapper-card";
import DP from "@/../public/dashboard/dp.png";

export default function RightSidebar() {
  return (
    <aside className="px-[10px] py-[30px] min-w-[286px] flex flex-col gap-y-[60px] sticky top-0 max-h-screen">
      <Input />
      <div className="flex flex-col gap-y-5">
        <p className="text-blue-50 text-lg">Who to follow?</p>

        <WrapperCard className="flex justify-between items-center py-[10px] px-[20px]">
          <div className="flex gap-x-1 items-center">
            <Image src={DP} alt="more" />
            <div className="flex flex-col leading-tight">
              <p className="text-blue-50">Sadiq Vali</p>
              <p className="text-neutral-7">@sadiq_vali</p>
            </div>
          </div>
          <span className="text-[26px]">+10</span>
        </WrapperCard>

        <WrapperCard className="flex justify-between items-center py-[10px] px-[20px]">
          <div className="flex gap-x-1 items-center">
            <Image src={DP} alt="more" />
            <div className="flex flex-col leading-tight">
              <p className="text-blue-50">Sadiq Vali</p>
              <p className="text-neutral-7">@sadiq_vali</p>
            </div>
          </div>
          <span className="text-[26px]">+10</span>
        </WrapperCard>

        <WrapperCard className="flex justify-between items-center py-[10px] px-[20px]">
          <div className="flex gap-x-1 items-center">
            <Image src={DP} alt="more" />
            <div className="flex flex-col leading-tight">
              <p className="text-blue-50">Sadiq Vali</p>
              <p className="text-neutral-7">@sadiq_vali</p>
            </div>
          </div>
          <span className="text-[26px]">+10</span>
        </WrapperCard>

        <p className="text-neutral-7 text-lg">Show More</p>
      </div>
    </aside>
  );
}
