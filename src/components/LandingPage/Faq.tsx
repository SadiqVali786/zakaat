"use client";

import { useState } from "react";
import Image from "next/image";
import SumIcon from "@/../public/Icons/add.svg";
import MinusIcon from "@/../public/Icons/minus.svg";

const Accordion = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="w-[1062px] py-[1.875rem] px-[3.75rem] rounded-[30px] border border-[#1d1b2c] bg-gradient-to-b from-[#030014] to-[#201d2f]"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center self-stretch">
        <div className="text-[#c4c0fb] text-[1.625rem] leading-normal">
          {question}
        </div>
        <Image
          src={isOpen ? MinusIcon : SumIcon}
          alt={isOpen ? "Collapse" : "Expand"}
          width={40}
          height={40}
        />
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden w-[933px] h-px bg-[#292637] ${
          isOpen ? "max-h-[1px] opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      />
      <div
        className={`transition-all duration-500 overflow-hidden text-[#c4c0fb] leading-normal ${
          isOpen ? "max-h-[200px] opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default Accordion;
