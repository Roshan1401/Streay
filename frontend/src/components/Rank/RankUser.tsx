import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Medal, MapPin } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GithubIcon } from "../../assets/Icons";
import type { RankUser } from "../../types/types";
import type { Mode } from "../../types/types";
import { CountryFlag } from "../../utils/countryFlag";
interface RankUserProps {
  user: RankUser;
  mode: Mode;
  isAllCountries: boolean;
}

export function RankUser({ user, mode, isAllCountries }: RankUserProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="mx-2 my-3 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) md:m-0 md:rounded-none md:border-0 md:border-t">
      <div className="flex cursor-pointer items-center gap-2 border-(--color-border) p-3 transition-colors hover:bg-(--color-bg-secondary) sm:px-3.5 sm:py-4 md:grid md:grid-cols-12 md:gap-4 md:px-8 md:py-6 lg:px-4 lg:py-8 xl:px-8">
        <div className="col-span-1 flex shrink-0">
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold drop-shadow-2xl md:size-9 md:text-lg ${
              user.rank === 1
                ? "animate-pulse bg-yellow-100 text-yellow-500 shadow-[0_0_16px_4px_rgba(234,179,8,1)]"
                : user.rank === 2
                  ? "animate-pulse bg-gray-200 text-gray-500 shadow-[0_0_16px_4px_rgba(156,163,175,1)]"
                  : user.rank === 3
                    ? "animate-pulse bg-amber-700 text-amber-300 shadow-[0_0_16px_4px_rgba(217,119,6,1)]"
                    : "border border-(--color-border-secondary) bg-neutral-200 text-(--color-text-primary) dark:bg-neutral-800"
            }`}
          >
            {user.rank <= 3 ? (
              <Medal className="size-4 md:size-5" />
            ) : (
              user.rank
            )}
          </span>
        </div>

        <div className="shrink-0 md:hidden">
          <div className="size-8 overflow-hidden rounded-full">
            <img
              src={user.avatar_url}
              className="h-full w-full object-cover"
              alt="Profile"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:contents">
          <div className="col-span-4 flex min-w-0 items-center gap-3">
            <div className="hidden shrink-0 overflow-hidden rounded-full md:block md:size-11 dark:border-black">
              <img
                src={user.avatar_url}
                className="h-full w-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="min-w-0">
              <Link
                to={`/profile/${user.username}`}
                className="block text-sm font-medium text-(--color-text-primary) hover:underline md:text-lg md:font-semibold"
              >
                <span className="md:hidden">
                  {user.name && user.name.length > 15
                    ? `${user.name.slice(0, 15)}...`
                    : user.name}
                </span>
                <span className="hidden md:inline">{user.name}</span>
              </Link>
              <div className="group hidden items-center gap-1 md:flex">
                <GithubIcon className="inline-block h-4 w-4 text-(--color-text-secondary) group-hover:text-orange-500" />
                <span className="max-w-32 truncate text-sm text-(--color-text-secondary) group-hover:text-orange-500">
                  {user.username}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`shrink-0 font-mono text-xs font-medium sm:text-sm md:col-span-2 md:text-center md:text-lg md:font-medium ${
              user.rank === 1
                ? "text-orange-500 md:rounded-lg md:bg-orange-500/10 md:py-1"
                : "text-(--color-text-primary) md:rounded-lg md:bg-neutral-100 md:py-1 dark:md:bg-neutral-900/50"
            }`}
          >
            {user.hours}h
          </div>
        </div>

        <button
          className="shrink-0 md:hidden"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenDropdown((prev) => !prev);
          }}
        >
          {openDropdown ? (
            <IoIosArrowUp className="h-5 w-5 text-(--color-text-secondary)" />
          ) : (
            <IoIosArrowDown className="h-5 w-5 text-(--color-text-secondary)" />
          )}
        </button>

        <div className="col-span-3 mt-1 hidden items-center justify-center gap-1 md:mt-0 md:flex">
          <span className="flex items-center justify-center gap-1 text-sm font-medium text-(--color-text-primary)">
            <Flame size={20} className="fill-orange-500 text-orange-500" />
            {user.streak_days}d
          </span>
        </div>

        <div className="col-span-2 mt-1 hidden flex-col items-center justify-center gap-0.5 text-center md:mt-0 md:flex">
          {mode === "global" && isAllCountries && (
            <CountryFlag countryName={user.country} />
          )}
          <span className="text-sm font-semibold text-(--color-text-primary)">
            {mode === "global" && isAllCountries
              ? user.country || "—"
              : user.city || "—"}{" "}
          </span>
          {!(mode === "global" && isAllCountries) && (
            <span className="text-xs text-(--color-text-secondary)">
              {[user.state].filter(Boolean).join(", ")}
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex flex-col overflow-hidden border-t border-(--color-border) transition-all duration-500 ease-in-out md:hidden ${
          openDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-3">
          <Flame size={16} className="fill-orange-500 text-orange-500" />
          <span className="text-sm font-medium text-(--color-text-secondary)">
            {user.streak_days}d streak
          </span>
        </div>

        <div className="border-t border-(--color-border) px-4 py-3">
          <div className="flex items-center gap-1.5">
            {mode === "global" && isAllCountries ? (
              <>
                <CountryFlag countryName={user.country} />
                <span className="text-sm text-(--color-text-secondary)">
                  {user.country || "—"}
                </span>
              </>
            ) : (
              <>
                <MapPin className="size-3.5 shrink-0 text-(--color-text-secondary)" />
                <span className="text-sm text-(--color-text-secondary)">
                  {[user.city, user.state, user.country]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
