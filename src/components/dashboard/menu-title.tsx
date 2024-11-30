import Image from "next/image";
import DashboardIcon from "@/../public/Icons/dashboard/briefcase.png";
import ChevronDown from "@/../public/Icons/dashboard/chevron_down.png";

export default function MenuTitle() {
  return (
    <div className="flex items-center justify-between p-[10px]">
      <div className="flex gap-x-2">
        <Image src={DashboardIcon} alt="dashboard logo" />
        <span className="text-base text-blue-50">Dashboard</span>
      </div>
      <div>
        <Image src={ChevronDown} alt="vertical down" />
      </div>
    </div>
  );
}
