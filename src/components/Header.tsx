"use client";

import Logo from "@/../public/Logo.png";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Download",
    link: "/download",
  },
  {
    title: "Contact Us",
    link: "/contact",
  },
];

export default function HeaderSection() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center mx-20 py-8 border-b-[1px] border-nuetral-11">
      <div className="flex gap-[6px] items-center">
        <Image src={Logo} width={40} height={40} alt="logo" />
        <span className="text-2xl">zakaat</span>
      </div>
      <ul className="flex items-center gap-x-4 border rounded-full px-8 py-4">
        {navigation.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            className={`${
              pathname === link.link
                ? "text-xl text-blue-50"
                : "text-[18px] text-nuetral-7"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </ul>
      <div className="flex gap-4 items-center">
        <Link className="text-xl" href={"/auth/login"}>
          Login
        </Link>
        <Button>
          <span
            style={{
              background:
                "linear-gradient(91deg, #8e8c95 0.61%, #d9d9dc 99.17%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-xl leading-normal"
          >
            Sign Up
          </span>
        </Button>
      </div>
    </div>
  );
}
