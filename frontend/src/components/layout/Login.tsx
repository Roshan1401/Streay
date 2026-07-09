import { useRef } from "react";
import { GithubIcon } from "../../assets/Icons";
import image from "../../assets/devstreakLogo.svg";
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
      className="relative grid min-h-screen w-screen grid-cols-2 flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center justify-center gap-6">
          <img
            src={image}
            alt="Logo"
            className="h-80 w-80 opacity-90"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) brightness(200%) contrast(100%)",
            }}
          />
          <span className="bg-linear-to-r from-orange-400 to-orange-200 bg-clip-text text-[140px] leading-none font-extrabold tracking-tight text-transparent">
            Streaky
          </span>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-col items-center justify-center text-center">
          <img
            src={image}
            alt="Logo"
            className="mr-3 h-36 w-36 opacity-90"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(0%) brightness(200%) contrast(100%)",
            }}
          />
          <div className="mt-4 flex flex-col items-center gap-2 text-white">
            <span className="font-display text-5xl tracking-wide">
              Code every day
            </span>
            <span className="font-display bg-linear-to-r from-orange-300 to-white bg-clip-text text-5xl tracking-wide text-transparent">
              Track your activity.
            </span>
          </div>
          <button
            onClick={() => handleLogin("github")}
            className="mt-16 flex w-[400px] cursor-pointer items-center gap-3 rounded-full bg-white px-6 py-3 font-sans text-lg font-semibold tracking-wide text-neutral-900 shadow-lg transition-all duration-200 hover:bg-neutral-100 hover:shadow-xl active:scale-[0.98]"
          >
            <GithubIcon className="size-6" />
            <span className="w-full text-center">Sign in with GitHub</span>
          </button>
        </div>
      </div>
      <FloatingBox containerRef={containerRef} speed={2} />
    </div>
  );
};

export default Login;
