"use client";

import Image, { StaticImageData } from "next/image";
import More from "@/../public/Icons/dashboard/more_horizontal_shade.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PropTypes = {
  title: string;
  icon: StaticImageData;
  path: string;
};

export default function SubMenu({ title, icon, path }: PropTypes) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-x-2 py-[10px] lg:px-[10px] w-full",
        pathname.includes(path) ? "bg-neutral-11" : ""
      )}
    >
      <Image src={icon} alt="tweets icon" className="mx-auto lg:mx-0" />
      <div className="lg:flex items-center grow justify-between hidden gap-x-2">
        <span>{title}</span>
        <Image src={More} alt="more" />
      </div>
    </Link>
  );
}
