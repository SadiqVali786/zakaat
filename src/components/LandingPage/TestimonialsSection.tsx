/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/magicui/marquee";

const reviews = [
  {
    name: "Sadiq Vali",
    username: "@sadiq_vali",
    body: "This platform has revolutionized the way I work. It's intuitive, flexible, and has made me more productive than ever before.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Sadiq Vali",
    username: "@sadiq_vali",
    body: "This platform has revolutionized the way I work. It's intuitive, flexible, and has made me more productive than ever before.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Sadiq Vali",
    username: "@sadiq_vali",
    body: "This platform has revolutionized the way I work. It's intuitive, flexible, and has made me more productive than ever before.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Sadiq Vali",
    username: "@sadiq_vali",
    body: "This platform has revolutionized the way I work. It's intuitive, flexible, and has made me more productive than ever before.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Sadiq Vali",
    username: "@sadiq_vali",
    body: "This platform has revolutionized the way I work. It's intuitive, flexible, and has made me more productive than ever before.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Sadiq Vali",
    username: "@sadiq_vali",
    body: "This platform has revolutionized the way I work. It's intuitive, flexible, and has made me more productive than ever before.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure className="flex flex-col items-start p-6 w-[439px] rounded-2xl border border-[#211f30] bg-gradient-to-b from-[#030014] to-[#211f30]">
      <div className="flex items-center gap-3">
        <img
          className="rounded-full"
          width="60"
          height="60"
          alt="avatar"
          src={img}
        />
        <div className="flex flex-col justify-center items-start">
          <figcaption className="text-[#a5a2e8] text-base leading-tight">
            {name}
          </figcaption>
          <p className="text-[#817eb5] text-base leading-tight">{username}</p>
        </div>
      </div>
      <blockquote className="text-[#64628c] text-base leading-tight mt-4">
        {body}
      </blockquote>
    </figure>
  );
};

function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-y-11 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

import Pill from "./Pill";

export default function TestimonialsSection() {
  return (
    <div className="mb-64 mx-auto flex flex-col gap-y-24 items-center">
      <div className="flex flex-col gap-y-11">
        <Pill text="✨ Testimonials" />
        <h1
          className="leading-none font-bold text-center max-w-[1200px]"
          style={{
            fontSize: "clamp(35px, 6vw, 55px)",
            margin: "0 clamp(1rem, 4.9vw, 5rem)",
          }}
        >
          <span className="text-blue-200">
            Join thousands who trust us for secure, dignified, and{" "}
          </span>
          <span className="text-purple-200">impactful Zakaat Donations</span>
        </h1>
      </div>
      <MarqueeDemo />
    </div>
  );
}
