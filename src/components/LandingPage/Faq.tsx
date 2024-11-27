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
      className="rounded-[30px] border border-[#1d1b2c] bg-gradient-to-b from-[#030014] to-[#201d2f]"
      onClick={() => setIsOpen((prev) => !prev)}
      style={{ padding: "clamp(20px, 3.3vw, 30px) clamp(20px, 4.7vw, 60px)" }}
    >
      <div className="flex justify-between items-center self-stretch">
        <div
          className="text-[#c4c0fb] leading-normal"
          style={{ fontSize: "clamp(20px, 3.1vw, 26px)" }}
        >
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
        className={`transition-all duration-500 overflow-hidden w-full h-px bg-[#292637] ${
          isOpen ? "max-h-[1px] opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      />
      <div
        className={`transition-all duration-500 overflow-hidden text-[#c4c0fb] leading-normal ${
          isOpen ? "max-h-[300px] opacity-100 mt-5" : "max-h-0 opacity-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default Accordion;
