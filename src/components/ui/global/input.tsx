import Image from "next/image";
import searchIcon from "@/../public/Icons/dashboard/search.png";

const Input = () => (
  <div className="flex items-center px-5 py-[10px] w-full rounded-full bg-neutral-11">
    <Image src={searchIcon} alt="Search Icon" />
    <input
      type="text"
      placeholder="Search tweets"
      className="ml-2 text-neutral-7 font-dm text-xl bg-transparent outline-none w-full"
    />
  </div>
);

export default Input;
