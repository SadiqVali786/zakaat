import AboutProduct from "@/../public/AboutSection.png";
import PlayButton from "@/../public/PlayButton.png";
// import Ellipse from "@/../public/Ellipse.png";
import Image from "next/image";
import Link from "next/link";
import Pill from "./Pill";
import { BACKGROUND_IMAGES } from "@/lib/background-images";

export default function AboutSection() {
  return (
    <div className="mb-64 flex flex-col items-center gap-y-14 relative overflow-hidden">
      <Pill text="✨ Get Started For Free" />
      <Link href="#" className="md:w-full w-[768px] self-start md:self-center">
        <Image src={AboutProduct} alt="Youtube Video" className="mx-auto" />
        <Image
          src={PlayButton}
          alt="Play Button"
          className="absolute left-[50%] top-[60%] transform -translate-x-1/2 -translate-y-1/2 z-20"
        />
        <div className="bottom-0 top-[50%] bg-gradient-to-t from-brand-dark left-0 right-0 absolute z-10" />
      </Link>
      <Image
        src={BACKGROUND_IMAGES.ellipse}
        alt="Light"
        className="absolute -top-16 sm:-top-10 -z-10 h-[300px] w-full"
      />
    </div>
  );
}
