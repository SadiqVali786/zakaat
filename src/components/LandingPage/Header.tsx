"use client";

import Logo from "@/../public/Logo/Logo.png";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerMenu from "@/../public/Icons/hamburgerMenu.png";

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
    <div
      className="flex justify-between items-center py-8 mb-44 border-b-[1px] border-neutral-11"
      style={{
        marginLeft: "clamp(1rem, 4.9vw, 5rem)",
        marginRight: "clamp(1rem, 4.9vw, 5rem)",
      }}
    >
      <div className="flex gap-[6px] items-center">
        <Image src={Logo} width={40} height={40} alt="logo" />
        <span className="text-2xl hidden sm:block">zakaat</span>
      </div>
      <ul className="lg:flex items-center gap-x-4 border rounded-full px-8 py-4 hidden">
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
        <Image src={HamburgerMenu} alt={"hamberger menu"} />
      </div>
    </div>
  );
}
