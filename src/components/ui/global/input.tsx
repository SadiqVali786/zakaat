"use client";

import Image from "next/image";
import searchIcon from "@/../public/Icons/dashboard/search.png";
import { usePathname, useRouter } from "next/navigation";
import APP_PATHS from "@/config/path.config";

const Input = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center px-5 py-[10px] w-full rounded-full bg-neutral-11">
      <Image src={searchIcon} alt="Search Icon" />
      <input
        type="text"
        placeholder={
          pathname.includes(APP_PATHS.TWEETS)
            ? "Search tweets"
            : "Search Applications"
        }
        className="ml-2 placeholder:text-neutral-7 text-blue-50 font-dm text-xl bg-transparent outline-none w-full"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const input = event.target as HTMLInputElement;
            const searchTerm = input.value.trim();
            if (searchTerm) {
              router.push(
                `${
                  pathname.includes(APP_PATHS.TWEETS) ||
                  pathname.includes(APP_PATHS.FOLLOWING_TWEETS)
                    ? APP_PATHS.SEARCH_TWEETS
                    : APP_PATHS.SEARCH_APPLICATIONS
                }?searchTerm=${searchTerm}`
              );
            }
          }
        }}
      />
    </div>
  );
};

export default Input;
