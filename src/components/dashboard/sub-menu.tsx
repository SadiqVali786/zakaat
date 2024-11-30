import Image from "next/image";
import More from "@/../public/Icons/dashboard/more_horizontal_shade.png";
import Tweets from "@/../public/Icons/dashboard/snowflake.png";

export default function SubMenu() {
  return (
    <div className="flex justify-between">
      <div className="w-8"></div>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between p-[10px]">
          <div className="flex items-center gap-x-2">
            <Image src={Tweets} alt="tweets icon" />
            <span>Tweets</span>
          </div>
          <Image src={More} alt="more" />
        </div>
      </div>
    </div>
  );
}
