import { CircleAlert, CopyIcon } from "lucide-react";
import { SignOutIcon } from "../../../assets/Icons/index";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import ProfileSection from "./ProfileSection";

function Rightbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 border-l border-(--color-border) bg-(--color-bg-primary) px-7 py-6 lg:w-55 xl:w-75">
      <ProfileSection />
      <div className="flex flex-col gap-3">
        <h3 className="text-center text-xs font-semibold tracking-wider text-(--color-text-secondary) uppercase">
          Today's Activity
        </h3>
        <div className="grid grid-cols-1 gap-3 text-center xl:grid-cols-2">
          <div className="rounded-md border border-(--color-border) bg-(--color-bg-secondary) p-2 hover:border-orange-400">
            <div className="text-xs tracking-wider text-(--color-text-secondary) uppercase">
              Rank
            </div>
            <div className="mt-2 text-xl font-bold text-(--color-text-primary) xl:text-2xl">
              —
            </div>
            <div className="mt-1 text-xs text-(--color-text-secondary)">
              Past 24h leaderboard
            </div>
          </div>
          <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3 hover:border-orange-400">
            <div className="text-xs tracking-wider text-(--color-text-secondary) uppercase">
              Streak
            </div>
            <div className="mt-2 text-xl font-bold text-(--color-text-primary) xl:text-2xl">
              0 days
            </div>
            <div className="mt-1 text-xs text-(--color-text-secondary)">
              Current streak
            </div>
          </div>
          <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3 hover:border-orange-400">
            <div className="text-xs tracking-wider text-(--color-text-secondary) uppercase">
              Hours
            </div>
            <div className="mt-2 text-xl font-bold text-(--color-text-primary) xl:text-2xl">
              0m
            </div>
            <div className="mt-1 text-xs text-(--color-text-secondary)">
              Past 24h
            </div>
          </div>
          <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3 hover:border-orange-400">
            <div className="text-xs tracking-wider text-(--color-text-secondary) uppercase">
              Lines
            </div>
            <div className="mt-2 text-xl font-bold text-(--color-text-primary) xl:text-2xl">
              0
            </div>
            <div className="mt-1 text-xs text-(--color-text-secondary)">
              Past 24h
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) px-3 py-2 text-(--color-text-primary) transition-all hover:border-orange-500/50 hover:bg-orange-500/10 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500">
          <CopyIcon className="h-4 w-4 xl:h-5 xl:w-5" />
          <span className="text-xs font-medium xl:text-sm">Copy API token</span>
        </button>

        <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <CircleAlert className="h-4 w-4 text-orange-500 xl:h-5 xl:w-5" />
              <div className="flex flex-col">
                <div className="text-sm font-medium text-(--color-text-primary)">
                  Extension
                </div>
                <div className="text-xs text-(--color-text-secondary)">
                  IDE integration
                </div>
              </div>
            </div>
            <span className="hidden text-xs font-semibold text-orange-500 xl:flex">
              Inactive
            </span>
          </div>
          <button className="mt-3 w-full cursor-pointer rounded-md border border-(--color-border) bg-(--color-bg-primary) px-3 py-2 text-xs font-medium text-(--color-text-primary) transition-colors hover:border-orange-500/50 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500 xl:text-sm">
            Test connection
          </button>
        </div>

        <button
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-(--color-bg-primary) px-3 py-2 text-xs font-bold text-orange-500 transition-colors hover:border-orange-500/60 active:border-orange-500 active:bg-orange-500/20 active:text-orange-100 xl:text-sm"
          onClick={handleLogout}
        >
          <SignOutIcon className="h-4 w-4 xl:h-5 xl:w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Rightbar;
