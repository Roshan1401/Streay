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
    avatar: "SC",
    timeSpent: "32h 10m",
    streak: 15,
    languages: [
      { name: "TypeScript", color: "#3178c6" },
      { name: "Rust", color: "#dea584" },
    ],
  },
  {
    rank: 2,
    name: "Alex Rivera",
    avatar: "AR",
    timeSpent: "26h 15m",
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
    avatar: "JK",
    timeSpent: "23h 20m",
    streak: 21,
    languages: [
      { name: "JavaScript", color: "#f1e05a" },
      { name: "React", color: "#61dafb" },
    ],
  },
  {
    rank: 4,
    name: "Taylor Swift",
    avatar: "TS",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
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
    avatar: "ML",
    timeSpent: "17h 30m",
    streak: 12,
    languages: [
      { name: "Java", color: "#b07219" },
      { name: "C++", color: "#f34b7d" },
    ],
  },
];

function Leaderboard() {
  const [activeRow, setActiveRow] = useState<"24 Hours" | "7 Days" | "30 Days">(
    "24 Hours",
  );

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { bg: "bg-yellow-500", text: "text-yellow-900" };
    if (rank === 2) return { bg: "bg-gray-400", text: "text-gray-700" };
    if (rank === 3) return { bg: "bg-amber-600", text: "text-amber-100" };
    return { bg: "bg-neutral-800", text: "text-neutral-400" };
  };

  return (
    <div className="px-15 py-5">
      <div className="my-3 flex items-center justify-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-4xl border border-(--color-border) bg-neutral-900 px-5 py-1">
          {(["24 Hours", "7 Days", "30 Days"] as const).map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveRow(day)}
              className={[
                "text-md cursor-pointer rounded-4xl px-6 py-2 font-bold transition-colors",
                activeRow === day
                  ? "bg-(--color-bg-primary) text-(--color-text-primary)"
                  : "text-(--color-text-secondary)",
              ].join(" ")}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-5 overflow-hidden rounded-2xl border border-(--color-border) bg-white dark:bg-[#0b0809]">
          <div className="flex justify-end border-b border-(--color-border) px-6 py-4">
            <div className="inline-flex items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) px-4 py-2">
              <span className="h-3 w-3 animate-pulse rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-(--color-text-primary)">
                Updates every 5 minutes
              </span>
            </div>
          </div>
          <div className="">
            <div className="text-md sticky top-0 z-10 grid grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 font-semibold tracking-wide text-(--color-text-secondary)">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Developer</div>
              <div className="col-span-3 text-center">Time Spent</div>
              <div className="col-span-4 text-right">Top Languages</div>
            </div>
            <div className="space-y-1">
              {sampleData.map((user) => {
                const badge = getRankBadge(user.rank);
                return (
                  <div
                    key={user.rank}
                    className="border-t border-(--color-border)"
                  >
                    <div className="grid cursor-pointer grid-cols-12 items-center gap-4 px-8 py-3 transition-colors hover:bg-(--color-bg-secondary)">
                      <div className="col-span-1 flex">
                        <span
                          className={`h-10 w-10 rounded-lg ${badge.bg} ${badge.text} flex items-center justify-center text-lg font-bold`}
                        >
                          {user.rank}
                        </span>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full from-purple-500 to-pink-500 text-base font-bold text-white">
                          {user.avatar}
                        </div>
                        <div>
                          <span className="text-lg font-semibold text-(--color-text-primary)">
                            {user.name}
                          </span>
                          <div>
                            img
                            <span className="text-sm text-(--color-text-secondary)">
                              Roshan1401
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 text-center font-mono text-base font-semibold text-(--color-text-primary)">
                        {user.timeSpent}
                      </div>
                      <div className="col-span-4 flex justify-end gap-2">
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
