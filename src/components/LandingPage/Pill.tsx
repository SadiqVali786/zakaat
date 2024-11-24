import React from "react";

export default function Pill({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto p-[1px] bg-gradient-to-r from-[#4135F3] to-[#BE52F2] rounded-full ${className}`}
    >
      <p className="text-base bg-brand-dark px-5 py-2 rounded-full text-blue-100 leading-tight">
        {text}
      </p>
    </div>
  );
}
