import Image from "next/image";
import Logo from "@/../public/Logo/Logo.png";
import Link from "next/link";
import APP_PATHS from "@/config/path.config";

export default function LogoWithText() {
  return (
    <Link href={APP_PATHS.HOME} className="flex gap-[6px] items-center">
      <Image src={Logo} width={40} height={40} alt="logo" />
      <span className="text-2xl hidden lg:block">zakaat</span>
    </Link>
  );
}
