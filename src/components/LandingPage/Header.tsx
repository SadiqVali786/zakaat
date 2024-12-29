"use client";

import Logo from "@/../public/Logo/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerMenu from "@/../public/Icons/hamburgerMenu.png";
import APP_PATHS from "@/config/path.config";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Tweets",
    link: APP_PATHS.TWEETS,
  },
  {
    title: "Applications",
    link: APP_PATHS.ZAKAAT_APPLICATIONS,
  },
  {
    title: "Download",
    link: "/download",
  },
];

export default function HeaderSection() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const { data: session, status } = useSession();

  return (
    <div
      className="flex justify-between items-center py-8 sm:mb-44 mb-20 border-b-[1px] border-neutral-11"
      style={{
        marginLeft: "clamp(1rem, 4.9vw, 5rem)",
        marginRight: "clamp(1rem, 4.9vw, 5rem)",
      }}
    >
      <div className="flex gap-[6px] items-center">
        <Image src={Logo} width={40} height={40} alt="logo" />
        <span className="text-2xl hidden sm:block">zakaat</span>
      </div>
      <ul className="md:flex items-center gap-x-4 border rounded-[1rem] px-8 py-4 hidden">
        {navigation.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            className={`${
              pathname === link.link
                ? "text-xl text-blue-50"
                : "text-[18px] text-neutral-7"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </ul>
      <div className="flex gap-4 items-center">
        <Link
          href={status === "unauthenticated" ? APP_PATHS.SIGNIN : "#"}
          className="md:flex hidden items-center gap-2 py-2 px-5 rounded-lg border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#292637] text-xl leading-normal font-dm-sans text-[#8e8c95]"
          onClick={() => {
            if (status === "authenticated")
              signOut({ redirectTo: APP_PATHS.HOME });
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(91deg, #8e8c95 0.61%, #d9d9dc 99.17%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-xl leading-normal"
          >
            {status === "unauthenticated" ? "Login" : "Logout"}
          </span>
        </Link>
        <Image
          src={HamburgerMenu}
          alt={"hamberger menu"}
          className="cursor-pointer md:hidden"
          onClick={() => setOpenMenu(true)}
        />
        <div
          className={cn(
            "fixed top-0 right-0 left-0 h-screen w-screen backdrop-blur-lg z-50",
            openMenu ? "" : "hidden"
          )}
          onClick={() => setOpenMenu(false)}
        />
        <div
          className={cn(
            "fixed h-screen z-50 right-0 top-0 min-w-80 bg-brand-dark flex flex-col gap-4 items-center py-20 transition-transform duration-500 transform",
            openMenu ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul className="flex flex-col items-start gap-y-4 px-8 py-4">
            {navigation.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className={`${
                  pathname === link.link
                    ? "text-xl text-blue-50"
                    : "text-[18px] text-neutral-7"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href={status === "unauthenticated" ? APP_PATHS.SIGNIN : "#"}
              className="flex items-center gap-2 py-2 px-5 rounded-lg border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#292637] text-xl leading-normal font-dm-sans text-[#8e8c95] mt-8"
              onClick={() => {
                if (status === "authenticated")
                  signOut({ redirectTo: APP_PATHS.HOME });
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(91deg, #8e8c95 0.61%, #d9d9dc 99.17%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-xl leading-normal"
              >
                {status === "unauthenticated" ? "Login" : "Logout"}
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
