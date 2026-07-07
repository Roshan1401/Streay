import { Link } from "react-router-dom";
import { getLanguageColor, getLanguageIcon } from "../../utils/languageConfig";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Flame } from "lucide-react";
import { GithubIcon } from "../../assets/Icons";
import { formatTime } from "../../utils/formatTime";
import type { LeaderboardUser } from "../../types/types";
import You from "../You";
import UserHoverCard from "./UserHoverCard";
import { useFloating, offset, flip, shift } from "@floating-ui/react";

interface UserRowProps {
  user: LeaderboardUser;
  index: number;
  isCurrentUser: boolean;
  openDropdown?: number | null;
  setOpenDropdown?: (index: number | null) => void;
}

function UserRow({
  user,
  index,
  isCurrentUser,
  openDropdown,
  setOpenDropdown,
}: UserRowProps) {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [offset(10), flip(), shift()],
  });

  return (
    <>
      <div
        className={`relative mx-2 my-3 rounded-xl border border-(--color-border) md:m-0 md:rounded-none md:border-0 md:border-t`}
      >
        <div
          className={`flex cursor-pointer items-center gap-2 p-3 transition-colors sm:px-3.5 sm:py-4 md:grid md:grid-cols-12 md:gap-4 md:rounded-none md:px-8 md:py-6 lg:px-4 lg:py-5 xl:px-8 ${
            isCurrentUser
              ? "rounded-xl border-l-4 border-l-orange-500 bg-orange-500/5 dark:bg-orange-500/10"
              : "hover:bg-(--color-bg-secondary)"
          }`}
        >
          <div className="col-span-1 flex shrink-0">
            <span
              className={`md:text-md flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold drop-shadow-2xl ${
                user.rank === 1
                  ? "animate-pulse bg-yellow-100 text-yellow-500 shadow-[0_0_16px_4px_rgba(234,179,8,1)]"
                  : user.rank === 2
                    ? "animate-pulse bg-gray-200 text-gray-500 shadow-[0_0_16px_4px_rgba(156,163,175,1)]"
                    : user.rank === 3
                      ? "animate-pulse bg-amber-700 text-amber-300 shadow-[0_0_16px_4px_rgba(217,119,6,1)]"
                      : "border border-(--color-border-secondary) bg-neutral-200 text-(--color-text-primary) dark:bg-neutral-800"
              }`}
            >
              {user.rank <= 3 ? user.rank : user.rank}
            </span>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:contents">
            <div className="col-span-4 flex min-w-0 items-center gap-3">
              <div className="relative shrink-0 rounded-full">
                <img
                  src={user?.avatar_url}
                  className="size-8 rounded-full object-cover md:size-11"
                  alt="Profile"
                />
                {user?.is_extension_active && (
                  <span className="absolute right-0 bottom-0 size-2 rounded-full bg-emerald-400 ring-2 ring-white md:size-2.5 dark:ring-neutral-900" />
                )}
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
                  <div
                    ref={refs.setReference}
                    className="group relative hidden items-center gap-2 md:flex"
                  >
                    <span className="hidden cursor-pointer md:inline">
                      {user.name}
                    </span>
                    {isCurrentUser && <You />}
                    <div
                      ref={refs.setFloating}
                      style={floatingStyles}
                      className="pointer-events-none z-50 scale-95 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
                    >
                      <UserHoverCard
                        rank={user.rank}
                        username={user.username || ""}
                      />
                    </div>
                  </div>
                </Link>
                {user.github_url && (
                  <Link
                    to={`https://github.com/${user.github_url}`}
                    className="group hidden items-center gap-1 md:flex"
                  >
                    <GithubIcon className="inline-block h-4 w-4 text-(--color-text-secondary) group-hover:text-orange-500" />
                    <span className="max-w-32 truncate text-sm text-(--color-text-secondary) group-hover:text-orange-500">
                      {user.github_url}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            <div
              className={`shrink-0 font-mono text-xs font-medium tracking-wide sm:text-sm md:col-span-2 md:text-center md:text-base md:font-semibold ${
                isCurrentUser
                  ? "text-orange-500 md:rounded-lg md:bg-orange-500/10 md:py-1"
                  : "text-(--color-text-primary) md:rounded-lg md:py-1"
              }`}
            >
              {formatTime(Math.floor(user.timeSpent))}
            </div>

            <div className="col-span-2 hidden items-center justify-center gap-1 md:flex">
              <Flame size={20} className="fill-orange-500 text-orange-500" />
              <span className="text-sm font-medium text-(--color-text-primary)">
                {user.streak}d
              </span>
            </div>
          </div>

          <button
            className="shrink-0 md:hidden"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenDropdown &&
                setOpenDropdown(index === openDropdown ? null : index);
            }}
          >
            {index === openDropdown ? (
              <IoIosArrowUp className="h-5 w-5 text-(--color-text-secondary)" />
            ) : (
              <IoIosArrowDown className="h-5 w-5 text-(--color-text-secondary)" />
            )}
          </button>

          <div className="hidden justify-end gap-2 md:col-span-3 md:flex">
            {user.byLanguage.slice(0, 3).map((lang, i) => (
              <div className="group relative flex" key={i}>
                <span
                  className="flex h-9 w-8.5 items-center justify-center rounded-md p-1.5 text-2xl font-medium transition-all duration-200 group-hover:scale-110"
                  style={{
                    backgroundColor: `${getLanguageColor(lang.language)}20`,
                    color: getLanguageColor(lang.language),
                    border: `0.5px solid ${getLanguageColor(lang.language)}`,
                  }}
                >
                  {getLanguageIcon(lang.language)}
                </span>
                <span className="absolute right-0 bottom-12 z-9999 hidden rounded-md bg-(--color-bg-primary) px-2 py-1 text-xs font-medium text-(--color-text-primary) shadow-lg group-hover:block">
                  {lang.language}
                </span>
              </div>
            ))}
            {user.byLanguage.length > 3 && (
              <div className="group relative">
                <span className="flex h-9 w-8.5 cursor-pointer items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg-secondary) text-xs font-semibold text-(--color-text-secondary)">
                  +{user.byLanguage.length - 3}
                </span>

                <div className="absolute top-12 right-0 z-50 hidden min-w-36 rounded-lg border border-(--color-border) bg-(--color-bg-primary) p-2 shadow-xl group-hover:block">
                  {user.byLanguage.slice(3).map((lang, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-md px-2 py-1 text-sm"
                    >
                      <span
                        style={{
                          color: getLanguageColor(lang.language),
                        }}
                        className="text-lg"
                      >
                        {getLanguageIcon(lang.language)}
                      </span>

                      <span className="text-(--color-text-primary)">
                        {lang.language}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex flex-col overflow-hidden border-t border-(--color-border) transition-all duration-500 ease-in-out md:hidden ${
            openDropdown === index
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {user.github_url && (
            <Link
              to={`https://github.com/${user.github_url}`}
              className="flex items-center gap-2 px-4 py-3"
            >
              <GithubIcon className="h-4 w-4 text-(--color-text-secondary)" />
              <span className="max-w-32 truncate text-sm text-(--color-text-secondary) group-hover:text-orange-500">
                {user.github_url}
              </span>
            </Link>
          )}
          <div className="flex items-center gap-2 border-t border-(--color-border) px-4 py-2">
            <Flame size={16} className="fill-orange-500 text-orange-500" />
            <span className="text-sm font-medium text-(--color-text-secondary)">
              {user.streak}d streak
            </span>
          </div>
          <div className="border-t border-(--color-border) px-4 py-2">
            <div className="mb-2 text-sm font-medium text-(--color-text-secondary)">
              Top Languages
            </div>
            <div className="flex flex-wrap gap-2">
              {user.byLanguage.slice(0, 4).map((lang, i) => (
                <div className="group relative flex" key={i}>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-md p-1.5 text-2xl font-medium transition-all duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: `${getLanguageColor(lang.language)}20`,
                      color: getLanguageColor(lang.language),
                      border: `0.5px solid ${getLanguageColor(lang.language)}`,
                    }}
                  >
                    {getLanguageIcon(lang.language)}
                  </span>
                  <span className="absolute -mt-10 hidden rounded-md bg-(--color-bg-primary) px-2 py-1 text-xs font-medium text-(--color-text-primary) shadow-lg group-hover:block">
                    {lang.language}
                  </span>
                </div>
              ))}
              {user.byLanguage.length > 4 && (
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg-secondary) text-xs font-semibold text-(--color-text-secondary)">
                  +{user.byLanguage.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRow;
