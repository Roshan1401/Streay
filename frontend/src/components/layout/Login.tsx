import { useRef } from "react";
import { GithubIcon } from "../../assets/Icons";
import image from "../../assets/streaky.svg";
import bgImage from "../../assets/images/BG1.jpg";
import { supabase } from "../../lib/supabase.ts";
import { FloatingBox } from "../../components/layout/FloatingBox.tsx";
const Login = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = async (provider: "github" | "twitter") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/leaderboard`,
        },
      });

      if (error) {
        console.error("OAuth error:", error.message);
        return;
      }
    } catch (error) {
      console.error("OAuth exception:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative grid min-h-screen w-screen grid-cols-1 flex-col items-center justify-center bg-cover bg-center lg:grid-cols-2"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hidden h-full w-full lg:flex">
        <div className="flex h-full w-full items-center justify-center gap-4 xl:gap-6">
          <img
            src={image}
            alt="Logo"
            className="h-40 w-40 opacity-50 xl:h-50 xl:w-50"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) brightness(200%) contrast(100%)",
            }}
          />
          <span className="bg-linear-to-r from-orange-400 to-orange-200 bg-clip-text text-[80px] leading-none font-extrabold tracking-tight text-transparent xl:text-[130px]">
            Streaky
          </span>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 md:px-12 lg:px-8">
        <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
          <img
            src={image}
            alt="Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) brightness(250%) contrast(100%)",
            }}
          />
          <div className="mt-3 flex flex-col items-center gap-1 text-white md:mt-4 md:gap-2">
            <span className="font-display text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
              Code every day
            </span>
            <span className="font-display text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-5xl">
              Track your activity.
            </span>
          </div>
          <button
            onClick={() => handleLogin("github")}
            className="mt-7 flex w-full cursor-pointer items-center gap-3 rounded-full bg-white px-6 py-3 font-sans text-base font-semibold tracking-wide text-neutral-900 shadow-lg transition-all duration-200 hover:bg-neutral-100 hover:shadow-xl active:scale-[0.98] sm:mt-14 sm:w-[380px] sm:text-lg md:mt-10 md:w-[420px] md:py-3.5 lg:w-[400px]"
          >
            <GithubIcon className="size-5 sm:size-6" />
            <span className="w-full text-center">Sign in with GitHub</span>
          </button>
        </div>
      </div>
      <FloatingBox containerRef={containerRef} speed={2} />
    </div>
  );
};

export default Login;
