import Image from "next/image";
import Logo from "@/../public/Logo/Logo.png";

const NavbarBrand = () => {
  return (
    <section className="flex gap-[6px] items-center">
      <Image src={Logo} width={40} height={40} alt="logo" />
      <span className="text-2xl hidden sm:block">zakaat</span>
    </section>
  );
};

export default NavbarBrand;
