import type { RankUser } from "../../types/types";
import { GithubIcon } from "../../assets/Icons";
import { Flame, Medal } from "lucide-react";

export function RankUser({ user }: { user: RankUser }) {
  return (
    <div className="mx-2 my-3 rounded-xl border border-(--color-border) md:m-0 md:rounded-none md:border-0 md:border-t">
      <div className="flex cursor-pointer items-center gap-2 border-t border-(--color-border) p-3 transition-colors hover:bg-(--color-bg-secondary) sm:px-3.5 sm:py-4 md:grid md:grid-cols-12 md:gap-4 md:px-8 md:py-6 lg:px-4 lg:py-8 xl:px-8">
        <div className="col-span-1 flex">
          <span
            className={`flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold drop-shadow-2xl md:size-9 md:text-lg lg:px-3 ${
              user.rank === 1
                ? "animate-pulse bg-yellow-100 text-yellow-500 shadow-[0_0_16px_4px_rgba(234,179,8,1)]"
                : user.rank === 2
                  ? "animate-pulse bg-gray-200 text-gray-500 shadow-[0_0_16px_4px_rgba(156,163,175,1)]"
                  : user.rank === 3
                    ? "animate-pulse bg-amber-700 text-amber-300 shadow-[0_0_16px_4px_rgba(217,119,6,1)]"
                    : "border border-(--color-border-secondary) bg-neutral-200 text-(--color-text-primary) dark:bg-neutral-800"
            }`}
          >
            {user.rank === 1 || user.rank === 2 || user.rank === 3 ? (
              <Medal />
            ) : (
              user.rank
            )}
          </span>
        </div>

        <div className="col-span-4 flex items-center gap-3">
          <div className="size-8 overflow-hidden rounded-full transition-all duration-75 ease-out hover:scale-103 md:size-11 dark:border-black">
            <img
              src={user.avatar_url}
              className="h-full w-full object-cover"
              alt="Profile"
            />
          </div>
          <div>
            <div className="w-20 truncate text-sm font-medium text-(--color-text-primary) hover:underline md:w-fit md:text-lg md:font-semibold md:whitespace-normal">
              {user.name}
            </div>
            <div className="group justify-left hidden items-center gap-1 md:flex">
              <GithubIcon className="inline-block h-4 w-4 text-(--color-text-secondary) group-hover:text-orange-500" />
              <span className="text-sm text-(--color-text-secondary) group-hover:text-orange-500">
                {user.username}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`mt-1 flex-1 items-center text-right font-mono text-xs font-medium sm:text-sm md:col-span-2 md:text-center md:text-xl md:font-semibold ${
            user.rank === 1
              ? "text-orange-500 md:rounded-lg md:bg-orange-500/10 md:py-1"
              : "text-(--color-text-primary) md:rounded-lg md:bg-neutral-100 md:py-1 dark:md:bg-neutral-900/50"
          }`}
        >
          {user.hours}h
        </div>

        <div className="col-span-3 mt-1 flex items-center justify-center gap-1 md:mt-0">
          <span
            className={`flex items-center justify-center gap-1 text-sm font-medium text-(--color-text-secondary)`}
          >
            <Flame size={20} className="fill-orange-500 text-orange-500" />
            {user.streak_days}d
          </span>
        </div>

        <div className="text-md col-span-2 mt-1 flex flex-col text-center font-semibold text-(--color-text-secondary) md:mt-0">
          {user.city}
          <span>
            {user.state}, {user.country}
          </span>
        </div>
      </div>
    </div>
  );
}
