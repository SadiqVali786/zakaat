"use client";

import APP_PATHS from "@/config/path.config";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavbarAuthentication = ({ className }: { className: string }) => {
  const { data: session, status } = useSession();

  return (
    <Link
      href={status === "unauthenticated" ? APP_PATHS.SIGNIN : APP_PATHS.HOME}
      className={cn(
        "items-center gap-2 py-2 px-5 rounded-lg border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#292637] text-xl leading-normal font-dm-sans text-[#8e8c95]",
        className
      )}
      onClick={async () => {
        if (status === "authenticated") await signOut();
      }}
    >
      <span
        style={{
          background: "linear-gradient(91deg, #8e8c95 0.61%, #d9d9dc 99.17%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-xl leading-normal"
      >
        {status === "unauthenticated"
          ? "Login"
          : status === "authenticated"
          ? "Logout"
          : "Loading"}
      </span>
    </Link>
  );
};

export default NavbarAuthentication;
