import { GithubIcon } from "../assets/Icons";
import LeaderboardRow from "../components/leaderboard/LeaderboardRow";
import profileimg from "../assets/image.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  timeSpent: string;
  streak: number;
  languages: { name: string; color: string }[];
}

const sampleData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: profileimg,
    timeSpent: "32h:10m",
    streak: 15,
    languages: [
      { name: "TypeScript", color: "#3178c6" },
      { name: "Rust", color: "#dea584" },
    ],
  },
  {
    rank: 2,
    name: "Alex Rivera",
    avatar: profileimg,
    timeSpent: "26h:15m",
    streak: 8,
    languages: [
      { name: "Python", color: "#3572A5" },
      { name: "Go", color: "#00ADD8" },
      { name: "Go", color: "#00ADD8" },
    ],
  },
  {
    rank: 3,
    name: "Jordan Kim",
    avatar: profileimg,
    timeSpent: "23h:20m",
    streak: 21,
    languages: [
      { name: "JavaScript", color: "#f1e05a" },
      { name: "React", color: "#61dafb" },
    ],
  },
  {
    rank: 4,
    name: "Taylor Swift",
    avatar: profileimg,
    timeSpent: "20h 45m",
    streak: 5,
    languages: [
      { name: "Swift", color: "#F05138" },
      { name: "Kotlin", color: "#A97BFF" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan dfgdgfLee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan Lee",
    avatar: profileimg,
    timeSpent: "17h:30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
  {
    rank: 5,
    name: "Morgan fgdfgdfsgsdfgLee",
    avatar: profileimg,
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
];

function Leaderboard() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="px-5 py-5 xl:px-15">
      <div className="my-3 flex items-center justify-center">
        <LeaderboardRow />
      </div>
      <div className="mt-8">
        <div className="mt-5 overflow-hidden rounded-2xl border border-(--color-border) bg-white dark:bg-[#0b0809]">
          <div className="flex justify-center border-b border-(--color-border) px-6 py-4 md:justify-end">
            <div className="inline-flex items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) px-4 py-2">
              <span className="h-3 w-3 animate-pulse rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-(--color-text-primary)">
                Updates every 5 minutes
              </span>
            </div>
          </div>
          <div className="">
            <div className="text-md sticky top-0 z-10 hidden grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 font-semibold tracking-wide text-(--color-text-secondary) md:grid">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4 text-center">Developer</div>
              <div className="col-span-3 text-center">Time Spent</div>
              <div className="col-span-4 text-right">Top Languages</div>
            </div>
            <div className="space-y-1">
              {sampleData.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="mx-2 my-3 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) md:m-0 md:rounded-none md:border-0 md:border-t"
                  >
                    <div className="flex cursor-pointer items-center gap-2 p-3 transition-colors hover:bg-(--color-bg-secondary) sm:px-3.5 sm:py-4 md:grid md:grid-cols-12 md:gap-4 md:px-8 md:py-6">
                      <div className="col-span-1 flex">
                        <span
                          className={`flex items-center justify-center rounded-full bg-neutral-200 px-2 py-1 text-xs font-semibold text-(--color-text-primary) md:size-9 md:text-lg dark:bg-neutral-800`}
                        >
                          {user.rank}
                        </span>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="size-8 overflow-hidden rounded-full transition-all duration-75 ease-out hover:scale-103 md:size-11 dark:border-black">
                          <img
                            src={user.avatar}
                            className="h-full w-full object-cover"
                            alt="Profile"
                          />
                        </div>
                        <div>
                          <div className="w-20 truncate text-sm font-medium text-(--color-text-primary) hover:underline md:w-fit md:text-lg md:font-semibold md:whitespace-normal">
                            {user.name}
                          </div>
                          <div className="group hidden items-center justify-center gap-1 md:flex">
                            <GithubIcon className="inline-block h-4 w-4 text-(--color-text-secondary) group-hover:text-orange-500" />
                            <span className="text-sm text-(--color-text-secondary) group-hover:text-orange-500">
                              Roshan1401
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 flex-1 items-center text-right font-mono text-xs font-medium text-(--color-text-primary) sm:text-sm md:col-span-3 md:text-center md:text-base md:font-semibold">
                        {user.timeSpent}
                      </div>
                      <button
                        className="md:hidden"
                        onClick={() =>
                          setOpenDropdown(index === openDropdown ? null : index)
                        }
                      >
                        {index === openDropdown ? (
                          <IoIosArrowUp className="mt-1 h-5 w-5 text-(--color-text-secondary)" />
                        ) : (
                          <IoIosArrowDown className="mt-1 h-5 w-5 text-(--color-text-secondary)" />
                        )}
                      </button>

                      <div className="hidden justify-end gap-2 md:col-span-4 md:flex">
                        {user.languages.map((lang, i) => (
                          <span
                            key={i}
                            className="rounded-md px-2.5 py-1 text-sm font-medium"
                            style={{
                              backgroundColor: `${lang.color}20`,
                              color: lang.color,
                            }}
                          >
                            {lang.name}
                          </span>
                        ))}
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
                          {user.languages.map((lang, i) => (
                            <span
                              key={i}
                              className="rounded-md px-2.5 py-1 text-xs font-medium"
                              style={{
                                backgroundColor: `${lang.color}20`,
                                color: lang.color,
                              }}
                            >
                              {lang.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
