import { cn } from "@/lib/utils";

import Feature1 from "@/../public/Icons/feature1.png";
import Feature2 from "@/../public/Icons/feature2.png";
import Feature3 from "@/../public/Icons/feature3.png";
import Feature4 from "@/../public/Icons/feature4.png";
import Feature5 from "@/../public/Icons/feature5.png";
import Feature6 from "@/../public/Icons/feature6.png";
import Feature7 from "@/../public/Icons/feature7.png";
import Feature8 from "@/../public/Icons/feature8.png";

function FeaturesSectionDemo() {
  const features = [
    {
      title: "Screening with AI",
      description:
        "Initial automated screening using AI to filter applications and reduce potential misuse.",
      icon: <Image src={Feature1} alt="feature1" width={48} height={48} />,
    },
    {
      title: "Verified & Curated Cases",
      description:
        "Access a list of high-need, genuine cases, each rigorously verified by our expert team through detailed checks.",
      icon: <Image src={Feature2} alt="feature2" width={48} height={48} />,
    },
    {
      title: "Zakat for Friends & Relatives",
      description:
        "Easily give Zakat to friends or relatives. Search for their applications by phone number on our platform.",
      icon: <Image src={Feature3} alt="feature3" width={48} height={48} />,
    },
    {
      title: "Refer Applicants to Donors",
      description:
        "Recommend genuine applicants by sharing their Application with your contacts on our platform.",
      icon: <Image src={Feature4} alt="feature4" width={48} height={48} />,
    },
    {
      title: "Save Time & Less Effort",
      description:
        "Skip lengthy checks with fully vetted applications, allowing you to focus on impactful giving.",
      icon: <Image src={Feature5} alt="feature5" width={48} height={48} />,
    },
    {
      title: "Feel secure in privacy",
      description:
        "If you prefer not to reveal your identity, your application remains hidden while still receiving Zakaat donations.",
      icon: <Image src={Feature6} alt="feature6" width={48} height={48} />,
    },
    {
      title: "Audio/Video Calls & Chat",
      description:
        "Connect with applicants directly within the app. Contact details remain private unless applicants choose to share.",
      icon: <Image src={Feature7} alt="feature7" width={48} height={48} />,
    },
    {
      title: "Global Transactions",
      description:
        "If you want to give zakaat to any certain person in other coutry you can with our platform.",
      icon: <Image src={Feature8} alt="feature8" width={48} height={48} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-11",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-11",
        index < 4 && "lg:border-b dark:border-neutral-11"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-11 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-11 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-5 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-5">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-11 group-hover/feature:bg-blue-50 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-blue-100 text-lg font-normal">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-7 max-w-xs relative z-10 px-5">
        {description}
      </p>
    </div>
  );
};

import Pill from "./Pill";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div className="mb-64 mx-20 flex flex-col gap-y-24 items-center">
      <div className="flex flex-col gap-y-11">
        <Pill text="✨ Features of Zakaat Platform" />
        <h1 className="text-[55px] leading-none font-bold text-center max-w-[888px]">
          <span className="text-blue-200">Streamlined tools, </span>
          <span className="text-purple-200">
            making every Zakaat contribution secure
          </span>
        </h1>
      </div>
      <FeaturesSectionDemo />
    </div>
  );
}
