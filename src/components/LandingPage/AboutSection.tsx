import AboutProduct from "@/../public/AboutSection.png";
import Ellipse from "@/../public/Ellipse.png";
import Image from "next/image";
import Link from "next/link";
import Pill from "./Pill";

export default function AboutSection() {
  return (
    <div className="mb-64 flex flex-col items-center gap-y-14 relative">
      <Pill text="✨ Get Started For Free" />
      <Link href="#">
        <Image
          src={AboutProduct}
          alt="Youtube Video"
          height={565}
          width={1235}
        />
        <div className="bottom-0 top-[50%] bg-gradient-to-t from-brand-dark left-0 right-0 absolute z-10" />
      </Link>
      <Image
        src={Ellipse}
        alt="Light"
        className="absolute -top-10 -z-10 h-[300px] w-full"
        height={160}
        width={1215}
      />
    </div>
  );
}
