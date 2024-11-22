import Link from "next/link";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <Link
      className="flex items-center gap-2 py-2 px-5 rounded-lg border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#292637] text-xl leading-normal font-dm-sans text-[#8e8c95]"
      href={"/auth/register"}
    >
      {children}
    </Link>
  );
}
