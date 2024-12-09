"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinkComponent = ({
  icon,
  text,
}: {
  icon: StaticImageData;
  text: string;
}) => {
  const pathname = usePathname();
  // console.log(pathname, pathname.includes(text));

  return (
    <Link
      href="#"
      className={cn(
        "py-[24px] px-[18px]",
        pathname.includes(text) ? "bg-neutral-10" : ""
      )}
    >
      <Image alt="diamond" src={icon} className="" />
    </Link>
  );
};

export default LinkComponent;
