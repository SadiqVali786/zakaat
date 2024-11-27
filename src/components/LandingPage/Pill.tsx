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
      className={`p-[1px] bg-gradient-to-r from-[#4135F3] to-[#BE52F2] rounded-full ${className}`}
    >
      <p
        className="text-[15px] bg-brand-dark px-5 rounded-full text-blue-100 leading-tight"
        style={{
          padding: "clamp(6px, 0.66vw, 8px) clamp(10px, 1.34vw, 20px)",
        }}
      >
        {text}
      </p>
    </div>
  );
}
