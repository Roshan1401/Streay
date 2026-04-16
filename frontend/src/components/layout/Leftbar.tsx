import { useState } from "react";
import { Trophy, Compass, Users, Rocket, User, Signal } from "lucide-react";
import profilImg from "../../assets/image.png";

interface Props {
  onThemeToggle: () => void;
  isDarkTheme?: boolean;
}

function LeaderboardSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      ></path>
    </svg>
  );
}

const navItems = [
  { name: "Leaderboard", icon: LeaderboardSvg },
  { name: "Explore", icon: Compass },
  { name: "Rank", icon: Trophy },
  { name: "Community", icon: Users },
  { name: "Get Started", icon: Rocket },
  { name: "Profile", icon: User },
];

function Navbar({ onThemeToggle, isDarkTheme = false }: Props) {
  const [activeItem, setActiveItem] = useState("Leaderboard");

  return (
    <div className="flex lg:min-h-screen">
      <div className="fixed bottom-0 flex w-full justify-between border-t border-(--color-border) bg-(--color-bg-primary) py-2 lg:static lg:w-65 lg:flex-col lg:gap-6 lg:border-t-0 lg:border-r">
        <div className="hidden items-center gap-3 border-b border-(--color-border) px-9 py-8 lg:flex">
          <span className="h-3 w-3 rounded-full bg-orange-500" />
          <h1 className="text-2xl font-bold tracking-tight text-(--color-text-primary)">
            Devsteak
          </h1>
        </div>

        <nav className="flex w-full justify-center gap-8 px-1 md:justify-between md:px-8 lg:flex-col lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveItem(item.name)}
                className={[
                  "flex cursor-pointer flex-col items-center gap-2 text-left text-xs font-medium transition-colors lg:flex-row lg:gap-3 lg:rounded-md lg:border-b-2 lg:px-3 lg:py-2 lg:text-xl",
                  isActive
                    ? "text-orange-500 lg:border-orange-500 lg:bg-orange-500/20 lg:text-(--color-text-primary)"
                    : "border-transparent text-(--color-text-secondary) hover:bg-orange-500/15 hover:text-(--color-text-primary)",
                  `${item.name === "Profile" ? "flex lg:hidden" : ""}`,
                  `${item.name === "Get Started" ? "hidden lg:flex" : ""}`,
                ].join(" ")}
              >
                <div
                  className={[
                    "flex items-center justify-center rounded-full p-2 lg:p-0",
                    isActive
                      ? "bg-orange-200/50 text-orange-500 dark:bg-orange-400/30 dark:lg:bg-transparent"
                      : "",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="flex-1 justify-end gap-4 lg:flex lg:flex-col lg:p-6">
          <div
            onClick={onThemeToggle}
            className="fixed top-2 right-4 cursor-pointer rounded-full border border-(--color-border-secondary) bg-(--color-bg-secondary) p-2 text-orange-500 transition-colors hover:bg-orange-500/10 lg:static lg:flex lg:justify-between lg:rounded-md"
          >
            {isDarkTheme ? (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2a1 1 0 011 1v3a1 1 0 11-2 0V3a1 1 0 011-1zM12 18a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zM4.22 4.22a1 1 0 011.414 0l2.121 2.121a1 1 0 11-1.414 1.414L4.22 5.636a1 1 0 010-1.414zM16.243 16.243a1 1 0 011.414 0l2.121 2.121a1 1 0 11-1.414 1.414l-2.121-2.121a1 1 0 010-1.414zM2 12a1 1 0 011-1h3a1 1 0 110 2H3a1 1 0 01-1-1zM18 12a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zM4.22 19.78a1 1 0 011.414-1.414l2.121 2.121a1 1 0 11-1.414 1.414L4.22 19.78zM16.243 7.757a1 1 0 011.414-1.414l2.121 2.121a1 1 0 11-1.414 1.414l-2.121-2.121zM12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            )}
            <button
              className={`relative hidden h-5 w-9 cursor-pointer items-center rounded-4xl lg:block ${isDarkTheme ? "bg-orange-500" : "bg-gray-400"}`}
            >
              <div
                className={`absolute top-0 left-0 size-5 rounded-full border border-(--color-border) bg-white transition-all duration-300 ${isDarkTheme ? "left-4 border-0" : "left-0"}`}
              ></div>
            </button>
          </div>
          <button className="hidden cursor-pointer items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-(--color-bg-primary) px-3 py-2 text-sm font-bold text-orange-500 transition-colors hover:border-orange-500/60 active:border-orange-500 active:bg-orange-500/20 active:text-orange-100 lg:flex">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <span>Sign In</span>
          </button>
          {/* <div className="flex  hidden lg:flex items-center  border border-(--color-border-secondary) dark:border-black hover:border-orange-500 gap-5 hover:bg-(--color-bg-secondary) cursor-pointer rounded-full p-2">
            <div className="size-12 rounded-full  dark:border-black  overflow-hidden relative">
              <img
                src={profilImg}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-(--color-text-primary) text-md font-semibold">
                Roshan Patil
              </span>
              <span className="text-(--color-text-secondary) text-sm">
                @patilrosha99
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
