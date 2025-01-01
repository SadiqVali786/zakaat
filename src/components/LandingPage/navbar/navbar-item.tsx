import Link from "next/link";

const NavbarItem = ({
  title,
  link,
  pathname,
}: {
  title: string;
  link: string;
  pathname: string;
}) => {
  return (
    <Link
      href={link}
      className={`${
        pathname === link
          ? "text-xl text-blue-50"
          : "text-[18px] text-neutral-7"
      }`}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
