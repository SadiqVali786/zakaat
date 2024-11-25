import React from "react";

export default function Pill({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style: { paddingTop: string; paddingBottom: string };
}) {
  return (
    <div
      className={`mx-auto p-[1px] bg-gradient-to-r from-[#4135F3] to-[#BE52F2] rounded-full ${className}`}
    >
      <p
        className="text-base bg-brand-dark px-5 rounded-full text-blue-100 leading-tight"
        style={style}
      >
        {text}
      </p>
    </div>
  );
}
