import { GithubIcon } from "../assets/Icons";
import LeaderboardRow from "../components/leaderboard/LeaderboardRow";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { Medal } from "lucide-react";
import { fetchLeaderboard } from "../queries/fetchLeaderboard";
import LeaderboardSkeleton from "../Skeletons/LeaderboardSkeleton";
import { formatTime } from "../utils/formatTime";
import { getLanguageColor, getLanguageIcon } from "../utils/languageConfig";
import { Link } from "react-router-dom";
import type { Range } from "../types/types";

interface LeaderboardUser {
  rank: number;
  name: string | null;
  username: string | null;
  avatar_url: string;
  timeSpent: number;
  byLanguage: {
    language: string;
    hours: string;
  }[];
}

function Leaderboard() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<Range>("24h");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(activeRow);
      setLeaderboardData(data);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000); // Fetch new data every 5 minutes

    return () => clearInterval(interval);
  }, [activeRow]);

  return (
    <>
      <div className="px-5 py-5 xl:px-15">
        <div className="my-3 flex items-center justify-center">
          <LeaderboardRow activeRow={activeRow} setActiveRow={setActiveRow} />
        </div>
        {loading ? (
          <LeaderboardSkeleton />
        ) : (
          <div className="mt-8">
            <div className="mt-5 overflow-hidden rounded-2xl border border-(--color-border) bg-white dark:bg-[#0b0809]">
              <div className="flex flex-col gap-4 border-b border-(--color-border) px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-sm text-center text-2xl font-medium text-(--color-text-primary) md:text-left">
                  <span className="font-bold tracking-tight text-orange-500">
                    Rohit Singh
                  </span>{" "}
                  is surpassing his limits right here, right now.
                  <div className="mt-1 flex flex-col gap-1 text-sm font-medium text-(--color-text-secondary) md:flex-row md:gap-4">
                    <span className="">showing top 100 developers.</span>
                    <span>your rank:#12</span>
                  </div>
                </div>

                <div className="mx-auto inline-flex items-center gap-2 rounded-md border border-(--color-border) bg-(--color-bg-secondary) px-4 py-2 md:mx-0 md:shrink-0">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500" />
                  <span className="text-sm font-medium whitespace-nowrap text-(--color-text-primary)">
                    Updates every 5 minutes
                  </span>
                </div>
              </div>
              <div className="">
                <div className="text-md sticky top-0 z-10 hidden grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 font-semibold tracking-wide text-(--color-text-secondary) md:grid lg:px-4 xl:px-8">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5 text-left">Developer</div>
                  <div className="col-span-2 text-center">Time Spent</div>
                  <div className="col-span-4 text-right">Top Languages</div>
                </div>
                <div className="space-y-1">
                  {leaderboardData.map(
                    (user: LeaderboardUser, index: number) => {
                      return (
                        <Link
                          to={`/profile/${user.username}`}
                          key={index}
                          className="mx-2 my-3 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) md:m-0 md:rounded-none md:border-0 md:border-t"
                        >
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
                                {user.rank === 1 ||
                                user.rank === 2 ||
                                user.rank === 3 ? (
                                  <Medal />
                                ) : (
                                  user.rank
                                )}
                              </span>
                            </div>
                            <div className="col-span-5 flex items-center gap-3">
                              <div className="size-8 overflow-hidden rounded-full transition-all duration-75 ease-out hover:scale-103 md:size-11 dark:border-black">
                                <img
                                  src={user?.avatar_url}
                                  className="h-full w-full object-cover"
                                  alt="Profile"
                                />
                              </div>
                              <div>
                                <Link
                                  to={`/profile/${user.username}`}
                                  className="w-20 truncate text-sm font-medium text-(--color-text-primary) hover:underline md:w-fit md:text-lg md:font-semibold md:whitespace-normal"
                                >
                                  {user.name}
                                </Link>
                                <div className="group justify-left hidden items-center gap-1 md:flex">
                                  <GithubIcon className="inline-block h-4 w-4 text-(--color-text-secondary) group-hover:text-orange-500" />
                                  <span className="text-sm text-(--color-text-secondary) group-hover:text-orange-500">
                                    Roshan1401
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`mt-1 flex-1 items-center text-right font-mono text-xs font-medium sm:text-sm md:col-span-2 md:text-center md:text-base md:font-semibold ${
                                user.rank === 1
                                  ? "text-orange-500 md:rounded-lg md:bg-orange-500/10 md:py-1"
                                  : "text-(--color-text-primary) md:rounded-lg md:bg-neutral-100 md:py-1 dark:md:bg-neutral-900/50"
                              }`}
                            >
                              {formatTime(Math.floor(user.timeSpent))}
                            </div>
                            <button
                              className="md:hidden"
                              onClick={() =>
                                setOpenDropdown(
                                  index === openDropdown ? null : index,
                                )
                              }
                            >
                              {index === openDropdown ? (
                                <IoIosArrowUp className="mt-1 h-5 w-5 text-(--color-text-secondary)" />
                              ) : (
                                <IoIosArrowDown className="mt-1 h-5 w-5 text-(--color-text-secondary)" />
                              )}
                            </button>

                            <div className="hidden justify-end gap-2 md:col-span-4 md:flex">
                              {user.byLanguage.slice(0, 3).map((lang, i) => (
                                <span
                                  key={i}
                                  className="flex h-10 w-10 items-center justify-center rounded-md p-1.5 text-2xl font-medium"
                                  style={{
                                    backgroundColor: `${getLanguageColor(lang.language)}20`,
                                    color: getLanguageColor(lang.language),
                                    border: `0.5px solid ${getLanguageColor(lang.language)}`,
                                  }}
                                >
                                  {getLanguageIcon(lang.language)}
                                </span>
                              ))}
                              {user.byLanguage.length > 3 && (
                                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg-secondary) text-sm font-semibold text-(--color-text-secondary)">
                                  +{user.byLanguage.length - 3}
                                </span>
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
                            <div className="flex items-center gap-2 px-4 py-3">
                              <GithubIcon className="h-4 w-4 text-(--color-text-secondary)" />
                              <span className="text-sm font-medium text-(--color-text-secondary)">
                                Roshan1401
                              </span>
                            </div>
                            <div className="border-t border-(--color-border) px-4 py-3">
                              <div className="mb-2 text-sm font-medium text-(--color-text-secondary)">
                                Top Languages
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {user.byLanguage.slice(0, 8).map((lang, i) => (
                                  <span
                                    key={i}
                                    className="rounded-md p-1.5 text-xl font-medium"
                                    style={{
                                      backgroundColor: `${getLanguageColor(lang.language)}20`,
                                      color: getLanguageColor(lang.language),
                                      border: `0.5px solid ${getLanguageColor(lang.language)}`,
                                    }}
                                  >
                                    {getLanguageIcon(lang.language)}{" "}
                                  </span>
                                ))}

                                {user.byLanguage.length > 8 && (
                                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-(--color-border) bg-(--color-bg-secondary) text-sm font-semibold text-(--color-text-secondary)">
                                    +{user.byLanguage.length - 8}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Leaderboard;
