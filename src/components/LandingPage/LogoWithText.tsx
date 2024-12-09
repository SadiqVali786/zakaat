import Image from "next/image";
import Logo from "@/../public/Logo/Logo.png";

export default function LogoWithText() {
  return (
    <div className="flex gap-[6px] items-center">
      <Image src={Logo} width={40} height={40} alt="logo" />
      <span className="text-2xl hidden lg:block">zakaat</span>
    </div>
  );
}
