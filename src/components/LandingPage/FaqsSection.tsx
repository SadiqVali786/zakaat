import Faq from "./Faq";
import Pill from "./Pill";

const FAQS = [
  {
    question:
      "Can I apply for Zakaat without revealing my face and personal details?",
    answer:
      "Your privacy is our top priority. We never display your personal details or photos to others on our platform. If you feel uncomfortable accepting Zakaat from specific individuals, such as family or friends, you can opt to exclude them as donors. This way, you have complete control over who contributes to your cause, ensuring that you feel at ease and respected throughout the process.",
  },
  {
    question: "Is this Platform Free for Zakaat Donors & Recipients?",
    answer:
      "Your privacy is our top priority. We never display your personal details or photos to others on our platform. If you feel uncomfortable accepting Zakaat from specific individuals, such as family or friends, you can opt to exclude them as donors. This way, you have complete control over who contributes to your cause, ensuring that you feel at ease and respected throughout the process.",
  },
  {
    question: "How do you filter out the fraudulent Zakaat Applications?",
    answer:
      "Your privacy is our top priority. We never display your personal details or photos to others on our platform. If you feel uncomfortable accepting Zakaat from specific individuals, such as family or friends, you can opt to exclude them as donors. This way, you have complete control over who contributes to your cause, ensuring that you feel at ease and respected throughout the process.",
  },
  {
    question: "As a Donor, can i see whom i am giving zakaat money?",
    answer:
      "Your privacy is our top priority. We never display your personal details or photos to others on our platform. If you feel uncomfortable accepting Zakaat from specific individuals, such as family or friends, you can opt to exclude them as donors. This way, you have complete control over who contributes to your cause, ensuring that you feel at ease and respected throughout the process.",
  },
  {
    question: "If you are doing all this for free, then how you are surviving?",
    answer:
      "Your privacy is our top priority. We never display your personal details or photos to others on our platform. If you feel uncomfortable accepting Zakaat from specific individuals, such as family or friends, you can opt to exclude them as donors. This way, you have complete control over who contributes to your cause, ensuring that you feel at ease and respected throughout the process.",
  },
];

export default function FaqsSection() {
  return (
    <div
      className="mb-44 mx-auto flex flex-col gap-y-24 items-center"
      style={{
        marginLeft: "clamp(1rem, 4.9vw, 5rem)",
        marginRight: "clamp(1rem, 4.9vw, 5rem)",
      }}
    >
      <div className="flex flex-col gap-y-11">
        <Pill
          text="✨ Frequently Asked Questions"
          className="mx-0 text-center sm:mx-auto"
        />
        <h1
          className="leading-none font-bold md:text-center"
          style={{ fontSize: "clamp(35px, 6vw, 55px)" }}
        >
          <span className="text-blue-200">
            Not sure if our Zakaat platform is right for you?{" "}
          </span>
          <span className="text-purple-200">
            We&apos;re here to help and guide you.
          </span>
        </h1>
      </div>
      <div className="flex flex-col gap-y-8">
        {FAQS.map((faq, index) => (
          <Faq key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

//
// clamp(min, curr, max) // return curr if min < curr < max else min if curr < min or max if curr > max
// clamp(50px, 8vw, 100px)
// clamp(50px, 7vw + 1rem, 100px)
//
//
// clamp(3.5rem, 12vw + 1rem, 8rem)
// clamp(2rem, 5vw, 5rem)
//
// py: min(20vh, 10rem)
// px: min(20vw, 10rem)

// max(500px, 70%)
// min(500px, 70%)
