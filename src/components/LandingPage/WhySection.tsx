import Image from "next/image";

import iPhoneWhy from "@/../public/iPhoneWhy.png";
import GooglePlay from "@/../public/googlePlay.png";
import AppStore from "@/../public/appStore.png";
import Link from "next/link";
import Pill from "./Pill";

export default function WhySection() {
  return (
    <div className="flex flex-col gap-y-[90px]">
      <h2
        className="text-center text-purple-100 font-bold"
        style={{
          margin: "0 clamp(1rem, 4.9vw, 5rem)",
          fontSize: "clamp(35px, 6vw, 55px)",
        }}
      >
        Why Choose Our Platform for Donations?
      </h2>
      <div className="px-20 mb-64 flex items-center justify-between">
        <div className="flex flex-col gap-y-24 w-[875px]">
          <div className="flex flex-col gap-y-11">
            <Pill text="✨ Find Your Relatives, Friends & neighbours Here" />
            <h1
              className="leading-none font-bold"
              style={{ fontSize: "clamp(30px, 5vw, 45px)" }}
            >
              <span className="text-blue-200">
                Reaching out to friends and family for Zakaat Money can be
                challenging.{" "}
              </span>
              <span className="text-purple-200">
                Many may hesitate to request it out of dignity.
              </span>
            </h1>
            <p
              className="leading-[26px] text-blue-100"
              style={{ fontSize: "clamp(16px, 2.43vw, 20px)" }}
            >
              We simplify Zakaat donations by serving as a free intermediary for
              both donors and applicants. Donors can rely on us to connect them
              with friends or family in need, if they’re on the platform.
              Applicants can choose to remain anonymous, though sharing details
              may increase donor trust and improve their chances of receiving
              Zakaat.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href={"#"}>
              <Image src={AppStore} alt="App Store" height={53} width={181} />
            </Link>
            <Link href={"#"}>
              <Image
                src={GooglePlay}
                alt="Google Play"
                height={53}
                width={181}
              />
            </Link>
          </div>
        </div>
        <Image src={iPhoneWhy} width={370} height={756} alt="Hero iPhone" />
      </div>
    </div>
  );
}
