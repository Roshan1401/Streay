import { Trophy, Compass, Rocket, User } from "lucide-react";
import {
  LeaderboardIcon,
  SignInIcon,
  SignOutIcon,
} from "../../assets/Icons/index";
import { Sun, Moon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useProfileStore from "../../store/useProfileStore";
import logo from "../../assets/image.png";

interface Props {
  onThemeToggle: () => void;
  isDarkTheme?: boolean;
  scrolled?: boolean;
}

const navItems = [
  { name: "Leaderboard", path: "/leaderboard", icon: LeaderboardIcon },
  { name: "Explore", path: "/explore", icon: Compass },
  { name: "Rank", path: "/rank", icon: Trophy },
  { name: "Get Started", path: "/get-started", icon: Rocket },
];

function Navbar({ onThemeToggle, isDarkTheme = false }: Props) {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const profile = useProfileStore((state) => state.profile);
  const profileLoading = useProfileStore((state) => state.loading);

  const avatar_url = profile?.avatar_url;
  const name = profile?.name;
  const username = profile?.username;
  const logOut = useUserStore((state) => state.logOut);
  const navigate = useNavigate();

  const profilePath = user && username ? `/profile/${username}` : "/login";

  return (
    <div className="flex lg:min-h-screen">
      <div
        className={`fixed bottom-0 flex w-full justify-between border-t border-(--color-border) bg-(--color-bg-primary)/50 py-2 backdrop-blur-lg transition-all duration-300 lg:static lg:w-60 lg:flex-col lg:gap-6 lg:border-t-0 lg:border-r lg:bg-(--color-bg-primary) xl:w-65`}
      >
        <div className="hidden items-center gap-1 border-b border-(--color-border) px-6 py-8 lg:flex">
          <img src={logo} className="h-15 w-14" alt="logo" />
          <h1 className="flex text-2xl font-bold tracking-tight text-(--color-text-primary)">
            CODE <span className="text-orange-500">PULSE</span>
          </h1>
        </div>

        <ul className="flex w-full justify-between px-4 md:justify-between md:px-8 lg:flex-col lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isGetStarted = item.name === "Get Started";

            return (
              <li
                key={item.name}
                className={[
                  isGetStarted ? "hidden lg:block" : "",
                  "w-full lg:w-auto",
                ].join(" ")}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex cursor-pointer flex-col items-center gap-2 text-left text-xs font-medium transition-colors lg:flex-row lg:gap-3 lg:rounded-md lg:border-b-2 lg:px-3 lg:py-2 lg:text-lg xl:text-xl",
                      isActive
                        ? "text-orange-500 lg:border-orange-500 lg:bg-orange-500/20 lg:text-(--color-text-primary)"
                        : "border-transparent text-(--color-text-secondary) hover:bg-orange-500/15 hover:text-(--color-text-primary)",
                      `${item.name === "Get Started" ? "hidden lg:flex" : ""}`,
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={[
                          "flex items-center justify-center rounded-full p-2 lg:p-0",
                          isActive
                            ? "bg-orange-200/50 text-orange-500 dark:bg-orange-400/30 dark:lg:bg-transparent"
                            : "",
                        ].join(" ")}
                      >
                        <Icon className="h-4 w-4 xl:h-5 xl:w-5" />
                      </span>
                      {item.name}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}

          <li className="block w-full lg:hidden lg:w-auto">
            <NavLink
              to={profilePath}
              className={({ isActive }) =>
                [
                  "flex cursor-pointer flex-col items-center gap-2 text-left text-xs font-medium transition-colors",
                  isActive
                    ? "text-orange-500"
                    : "text-(--color-text-secondary) hover:text-(--color-text-primary)",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      "flex items-center justify-center rounded-full p-2",
                      isActive
                        ? "bg-orange-200/50 text-orange-500 dark:bg-orange-400/30"
                        : "",
                    ].join(" ")}
                  >
                    <User className="h-4 w-4 xl:h-5 xl:w-5" />
                  </span>
                  Profile
                </>
              )}
            </NavLink>
          </li>
        </ul>

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

          {!loading && !user ? (
            <button
              className="hidden cursor-pointer items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-(--color-bg-primary) px-3 py-2 text-sm font-bold text-orange-500 transition-colors hover:border-orange-500/60 active:border-orange-500 active:bg-orange-500/20 active:text-orange-100 lg:flex"
              onClick={() => navigate("/login")}
            >
              <SignInIcon className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          ) : profileLoading ? (
            <div className="hidden items-center gap-5 rounded-full p-2 lg:flex">
              <div className="skeleton size-12 rounded-full" />

              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-28 rounded-md" />
                <div className="skeleton h-3 w-20 rounded-md" />
              </div>
            </div>
          ) : (
            <div className="hidden cursor-pointer items-center justify-between gap-2 rounded-md border border-(--color-border-secondary) px-3 py-2.5 hover:border-orange-500 hover:bg-(--color-bg-secondary) lg:flex">
              <Link to={`/profile/${username}`} className="flex gap-2">
                <div className="relative size-10 overflow-hidden rounded-full dark:border-black">
                  <img
                    src={avatar_url}
                    className="h-full w-full object-cover"
                    alt="Profile"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold text-(--color-text-primary)">
                    {name}
                  </span>
                  <span className="text-sm text-(--color-text-secondary)">
                    {username}
                  </span>
                </div>
              </Link>
              <button
                className="cursor-pointer hover:scale-110"
                onClick={async () => {
                  try {
                    await logOut();
                    navigate("/login");
                  } catch (error) {
                    console.error("Logout failed:", error);
                    alert(
                      "An error occurred while logging out. Please try again.",
                    );
                  }
                }}
              >
                <SignOutIcon className="h-5 w-5 text-orange-500 transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
