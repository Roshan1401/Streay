import { useState } from "react";
import profilImg from "../../assets/image.png";


interface Props {
  onThemeToggle: () => void;
  isDarkTheme?: boolean;
}

const navItems = ["Leaderboard", "Explore", "Community", "Get Started"];

function Navbar({ onThemeToggle, isDarkTheme = false }: Props) {
  const [activeItem, setActiveItem] = useState("Leaderboard");

  return (
    <div className="flex min-h-screen   ">
     
      <div className=" flex flex-col w-70 gap-6 border-r border-(--color-border) bg-(--color-bg-primary) ">
        <div className="flex p-8 border-b border-(--color-border)  items-center gap-3 ">
          <span className="h-3 w-3 rounded-full bg-orange-500" />
          <h1 className="text-xl font-bold tracking-tight text-(--color-text-primary)">
            Devsteak
          </h1>
        </div>

        <nav className="flex flex-col px-8 gap-2">
          {navItems.map((item) => {
            const isActive = activeItem === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setActiveItem(item)}
                className={[
                  "rounded-md border-b-2 cursor-pointer px-3 py-2 text-lg text-left font-medium transition-colors",
                  isActive
                    ? "border-orange-500 bg-orange-500/20 text-(--color-text-primary)"
                    : "border-transparent text-(--color-text-secondary) hover:bg-orange-500/15 hover:text-(--color-text-primary)",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col  justify-end flex-1 p-8 gap-4">
          <div
            onClick={onThemeToggle}
            className="rounded-md flex justify-between p-2 cursor-pointer border border-(--color-border-secondary) text-orange-500 transition-colors hover:bg-orange-500/10"
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
              className={`w-9 h-5   flex items-center cursor-pointer relative rounded-4xl ${isDarkTheme ? "bg-orange-500" : "bg-gray-400"}`}
            >
              <div
                className={`size-5 border border-(--color-border) transition-all duration-300  absolute left-0 top-0 bg-white rounded-full ${isDarkTheme ? "left-4  border-0" : "left-0"}`}
              ></div>
            </button>
          </div>
          {/* <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-(--color-bg-primary) px-3 py-2 text-sm text-orange-500 font-bold  transition-colors hover:border-orange-500/60  active:border-orange-500 active:bg-orange-500/20 active:text-orange-100">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <span>Sign In</span>
          </button> */}
          <div className="flex items-center  border border-(--color-border-secondary) hover:border-orange-500 gap-5 hover:bg-(--color-bg-secondary) cursor-pointer rounded-full p-2">
          <div className="size-12 rounded-full border border-orange-400 dark:border-black  overflow-hidden">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
