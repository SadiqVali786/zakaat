import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaDiscord } from "react-icons/fa6";

import BigLogo from "@/../public/Logo/BigLogo.png";
import Link from "next/link";

const footerLinksLeft = [
  {
    text: "AboutUs",
    link: "/about",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Terms of Service",
    link: "#",
  },
];

const footerLinksRight = [
  {
    text: "Faqs",
    link: "#",
  },
  {
    text: "Download",
    link: "/download",
  },
  {
    text: "ContactUs",
    link: "/contact",
  },
];

export default function FooterSection() {
  return (
    <footer className="mx-20 border-t-[1px] py-20 border-t-nuetral-11 text-nuetral-7">
      <div className="flex gap-x-72 items-center justify-center">
        <div className="flex flex-col gap-y-8">
          <Image alt="BigLogo" src={BigLogo} width={80} height={80} />
          <div className="flex flex-col gap-y-5">
            <span className="text-xl leading-6 max-w-64">
              Copyright © 2025 Zakaat LLC. All rights reserved.
            </span>
            <div className="flex gap-x-4">
              <Link href={"#"}>
                <FaYoutube />
              </Link>
              <Link href={"#"}>
                <FaXTwitter />
              </Link>
              <Link href={"#"}>
                <FaFacebookF />
              </Link>
              <Link href={"#"}>
                <IoLogoWhatsapp />
              </Link>
              <Link href={"#"}>
                <FaDiscord />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-80">
          <ul className="flex flex-col gap-y-2">
            {footerLinksLeft.map((link) => (
              <Link href={link.link} key={link.text}>
                {link.text}
              </Link>
            ))}
          </ul>
          <ul className="flex flex-col gap-y-2">
            {footerLinksRight.map((link) => (
              <Link href={link.link} key={link.text}>
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
