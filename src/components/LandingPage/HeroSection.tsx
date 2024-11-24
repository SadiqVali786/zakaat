import Image from "next/image";

import iPhoneHero from "@/../public/iPhoneHero.png";
import GooglePlay from "@/../public/googlePlay.png";
import AppStore from "@/../public/appStore.png";
import Link from "next/link";
import Pill from "./Pill";

export default function HeroSection() {
  return (
    <div className="px-20 mb-64 flex items-center justify-between">
      <div className="flex flex-col gap-y-24 w-[875px]">
        <div className="flex flex-col gap-y-11">
          <Pill text="✨ Find Deserving Zakaat Recipients Here" />
          <h1
            className="leading-none font-bold"
            style={{ fontSize: "clamp(35px, 6.5vw, 65px)" }}
          >
            <span className="text-blue-200">Maximize Your Zakaat Impact, </span>
            <span className="text-purple-200">
              Support the Deserving Muslims in Need
            </span>
          </h1>
          <p
            className="text-xl leading-[26px] text-blue-100"
            style={{ fontSize: "clamp(16px, 2.43vw, 20px)" }}
          >
            Fulfill your duty of Zakat with purpose, backed by the power of
            Artificial Intelligence. Our platform ensures your contributions
            reach truly deserving Muslims by safeguarding against fraudulent
            applications. Connect with those genuinely in need, all for the sake
            of Allah and the upliftment of our community.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href={"#"}>
            <Image src={AppStore} alt="App Store" height={53} width={181} />
          </Link>
          <Link href={"#"}>
            <Image src={GooglePlay} alt="Google Play" height={53} width={181} />
          </Link>
        </div>
      </div>
      <Image src={iPhoneHero} width={370} height={756} alt="Hero iPhone" />
    </div>
  );
}
