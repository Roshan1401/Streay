import { useState } from "react";
import { Trophy, Compass, Users, Rocket, User } from "lucide-react";
import profilImg from "../../assets/image.png";
import { LeaderboardIcon, SignInIcon } from "../../assets/Icons/index";
import { Sun, Moon } from "lucide-react";

interface Props {
  onThemeToggle: () => void;
  isDarkTheme?: boolean;
  scrolled?: boolean;
}

const navItems = [
  { name: "Leaderboard", icon: LeaderboardIcon },
  { name: "Explore", icon: Compass },
  { name: "Rank", icon: Trophy },
  { name: "Community", icon: Users },
  { name: "Get Started", icon: Rocket },
  { name: "Profile", icon: User },
];

function Navbar({
  onThemeToggle,
  isDarkTheme = false,
  scrolled = false,
}: Props) {
  const [activeItem, setActiveItem] = useState("Leaderboard");

  return (
    <div className="flex lg:min-h-screen">
      <div
        className={`fixed bottom-0 flex w-full justify-between border-t border-(--color-border) bg-(--color-bg-primary)/50 py-2 backdrop-blur-lg transition-all duration-300 lg:static lg:w-60 lg:flex-col lg:gap-6 lg:border-t-0 lg:border-r lg:bg-(--color-bg-primary) xl:w-65`}
      >
        <div className="hidden items-center gap-3 border-b border-(--color-border) px-9 py-8 lg:flex">
          <span className="h-3 w-3 rounded-full bg-orange-500" />
          <h1 className="text-2xl font-bold tracking-tight text-(--color-text-primary)">
            Devsteak
          </h1>
        </div>

        <nav className="flex w-full justify-between px-4 md:justify-between md:px-8 lg:flex-col lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveItem(item.name)}
                className={[
                  "flex cursor-pointer flex-col items-center gap-2 text-left text-xs font-medium transition-colors lg:flex-row lg:gap-3 lg:rounded-md lg:border-b-2 lg:px-3 lg:py-2 lg:text-lg xl:text-xl",
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
                  <Icon className="h-4 w-4 xl:h-5 xl:w-5" />
                </div>
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="flex-1 justify-end gap-4 lg:flex lg:flex-col lg:p-6">
          <div
            onClick={onThemeToggle}
            className="fixed right-3 bottom-25 cursor-pointer rounded-full border border-(--color-border-secondary) bg-(--color-bg-secondary) p-2 text-orange-500 transition-colors hover:bg-orange-500/10 md:right-8 lg:static lg:flex lg:justify-between lg:rounded-md"
          >
            {isDarkTheme ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
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
            <SignInIcon className="h-5 w-5" />
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
