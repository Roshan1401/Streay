import { useEffect, useState } from "react";
import { GithubIcon, TwitterIcon } from "../../assets/Icons";
import { supabase } from "../supabase.ts";

const Login = () => {
  const [blink, setBlink] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (provider: "github" | "twitter") => {
    setStatus(provider);
    console.log(`Initiating login with ${provider}...`);
    try {
      await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/leaderboard`,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0d0d0d]">
        <div className="flex items-center gap-2 border-b border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[13px] text-[#666]">
            devsteak — auth
          </span>
        </div>

        <div className="p-7 font-mono">
          <div className="mb-5">
            <p className="mb-1 text-[13px] text-[#666]">$ whoami</p>
            <p className="text-[13px] text-[#e05c5c]">→ not authenticated</p>
          </div>

          <div className="mb-6">
            <p className="mb-1 text-[13px] text-[#666]">
              $ devsteak login --provider
            </p>
            <p className="text-[13px] text-[#aaa]">
              → select a provider to continue:
            </p>
          </div>

          <button
            onClick={() => handleLogin("github")}
            className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#30363d] bg-[#161b22] p-4 transition-colors duration-200 hover:border-[#e05c5c]"
          >
            <GithubIcon className="h-5 w-5 text-[#e6edf3]" />
            <div className="flex-1 text-left">
              <p className="text-[13px] text-[#e6edf3]">[ 1 ] GitHub</p>
              <p className="mt-0.5 text-[11px] text-[#666]">
                continue with github oauth
              </p>
            </div>
            <span className="text-[11px] text-[#444]">↵</span>
          </button>

          <button
            disabled
            className="mb-6 flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#30363d] bg-[#0d1117] p-4 blur-xs transition-colors duration-200 hover:border-[#e05c5c]"
          >
            <TwitterIcon className="h-5 w-5 text-[#e6edf3]" />
            <div className="flex-1 text-left">
              <p className="text-[13px] text-[#e6edf3]">[ 2 ] Twitter / X</p>
              <p className="mt-0.5 text-[11px] text-[#666]">
                continue with twitter auth
              </p>
            </div>
            <span className="text-[11px] text-[#444]">↵</span>
          </button>

          <div className="border-t border-[#1e1e1e] pt-4">
            {status ? (
              <p className="text-[13px] text-[#666]">
                → connecting to <span className="text-[#e05c5c]">{status}</span>
                {"... "}
                <span className="text-[#e05c5c]">_</span>
              </p>
            ) : (
              <p className="text-[13px] text-[#666]">
                → awaiting input...{" "}
                <span
                  className="text-[#e05c5c]"
                  style={{ opacity: blink ? 1 : 0 }}
                >
                  _
                </span>
              </p>
            )}
          </div>

          <div className="mt-5 flex gap-4">
            <span className="text-[11px] text-[#444]">terms</span>
            <span className="text-[11px] text-[#444]">·</span>
            <span className="text-[11px] text-[#444]">privacy</span>
            <span className="text-[11px] text-[#444]">·</span>
            <span className="text-[11px] text-[#444]">devsteak v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
