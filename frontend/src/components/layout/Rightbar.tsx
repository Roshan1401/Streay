import { CircleAlert, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { SignOutIcon } from "../../assets/Icons/index";
import profilImg from "../../assets/image.png";

interface Props {}

function Rightbar(props: Props) {
  const {} = props;

  return (
    <div className="flex min-h-screen flex-col gap-6 border-l border-(--color-border) bg-(--color-bg-primary) px-7 py-6 lg:w-60 xl:w-75">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="size-30 overflow-hidden rounded-full border border-orange-400 dark:border-black">
          <img
            src={profilImg}
            className="h-full w-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-semibold text-(--color-text-primary)">
            Roshan Patil
          </span>
          <span className="text-md text-(--color-text-secondary)">
            @patilrosha99
          </span>
          <span className="mt-2 text-lg text-(--color-text-secondary)">
            Learning React
          </span>
        </div>

        <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-orange-500 px-4 py-2 text-xl font-semibold text-white shadow-2xl transition-all duration-200 hover:scale-102 hover:bg-orange-400">
          <span>View Profile</span>
          <ExternalLinkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold tracking-wider text-(--color-text-secondary) uppercase">
          Today's Activity
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="size-30 rounded-md border border-(--color-border) bg-(--color-bg-secondary) p-2 hover:border-orange-400">
            <div className="text-xs tracking-wider text-(--color-text-secondary) uppercase">
              Rank
            </div>
            <div className="mt-2 text-2xl font-bold text-(--color-text-primary)">
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
            <div className="mt-2 text-2xl font-bold text-(--color-text-primary)">
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
            <div className="mt-2 text-2xl font-bold text-(--color-text-primary)">
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
            <div className="mt-2 text-2xl font-bold text-(--color-text-primary)">
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
          <CopyIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Copy API token</span>
        </button>

        <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <CircleAlert className="h-5 w-5 text-orange-500" />
              <div className="flex flex-col">
                <div className="text-sm font-medium text-(--color-text-primary)">
                  Extension
                </div>
                <div className="text-xs text-(--color-text-secondary)">
                  IDE integration
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-orange-500">
              Inactive
            </span>
          </div>
          <button className="mt-3 w-full cursor-pointer rounded-md border border-(--color-border) bg-(--color-bg-primary) px-3 py-2 text-sm font-medium text-(--color-text-primary) transition-colors hover:border-orange-500/50 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500">
            Test connection
          </button>
        </div>

        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-(--color-bg-primary) px-3 py-2 text-sm font-bold text-orange-500 transition-colors hover:border-orange-500/60 active:border-orange-500 active:bg-orange-500/20 active:text-orange-100">
          <SignOutIcon className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Rightbar;
