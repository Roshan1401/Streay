import step1 from "../../assets/images/step1.png";
import step2 from "../../assets/images/step2.png";
import step3 from "../../assets/images/step3.png";
import step4 from "../../assets/images/step4.png";
import step5 from "../../assets/images/step5.png";

interface StepCardProps {
  num: string;
  title: string;
  desc: string;
  img: string;
  side: "left" | "right";
}

function StepCard({ num, title, desc, img, side }: StepCardProps) {
  const rowDir = side === "left" ? "md:flex-row" : "md:flex-row-reverse";

  return (
    <div
      className={`flex flex-col ${rowDir} items-center gap-8 rounded-2xl border border-(--color-border) bg-(--color-bg-primary) p-6 shadow-sm md:p-10`}
    >
      <div className="flex flex-1 flex-col justify-center gap-3">
        <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
          Step {num}
        </span>
        <h3 className="text-2xl font-bold text-(--color-text-primary) md:text-3xl">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-(--color-text-secondary)">
          {desc}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <img
          src={img}
          alt={title}
          className="max-h-72 w-full rounded-xl object-cover shadow-md"
        />
      </div>
    </div>
  );
}

const steps = [
  {
    num: "01",
    title: "Install Extension",
    desc: "Install the Streaky VS Code extension from the marketplace. It runs silently in the background and tracks your coding activity automatically.",
    img: step1,
    side: "left" as const,
  },
  {
    num: "02",
    title: "Sign In to Your Account",
    desc: "Sign in with GitHub to create your Streaky profile. Your coding journey starts here — no complicated setup needed.",
    img: step2,
    side: "right" as const,
  },
  {
    num: "03",
    title: "Copy Your API Token",
    desc: "Open the Streaky dashboard and click Copy API Token. This unique key connects your editor activity to your account.",
    img: step3,
    side: "left" as const,
  },
  {
    num: "04",
    title: "Paste API Token",
    desc: "In VS Code, run the 'Connect to Streaky' command and paste the token. The extension links to your account instantly.",
    img: step4,
    side: "right" as const,
  },
  {
    num: "05",
    title: "Start Coding",
    desc: "Start coding! Watch your streaks grow, climb the leaderboard, and compete with developers around the world.",
    img: step5,
    side: "left" as const,
  },
];

function GetStarted() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:px-10 md:py-16">
      <div className="mb-12 text-center md:mb-16">
        <h1 className="text-4xl font-extrabold text-(--color-text-primary) md:text-5xl">
          Get Started with <span className="text-orange-500">Streaky</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-(--color-text-secondary)">
          Five simple steps to start tracking your coding streaks and competing
          on the leaderboard.
        </p>
      </div>

      <div className="flex flex-col gap-10 md:gap-16">
        {steps.map((s) => (
          <StepCard key={s.num} {...s} />
        ))}
      </div>
    </div>
  );
}

export default GetStarted;
