import { useState } from "react";
import { FloatingTabs } from "../components/Rank/FloatingTabs";
import { Globe, MapPin, Medal, Flame } from "lucide-react";
import image from "../assets/image.png";
import { PeriodSelect } from "../components/Rank/PeriodSelect";
import { GlobalFilters } from "../components/Rank/GlobalFilters";
import { RegionFilters } from "../components/Rank/RegionFilters";
import { useLocationFilter } from "../hooks/useLocationFilter";
import useProfileStore from "../store/useProfileStore";
import { GithubIcon } from "../assets/Icons";

type Mode = "global" | "region";

interface RankUser {
  rank: number;
  name: string;
  username: string;
  avatar_url: string;
  hours: number;
  streakDays: number;
  location: string;
  countryIso: string;
  stateIso: string;
  city: string;
}

const sampleRankData: RankUser[] = [
  {
    rank: 1,
    name: "Arjun Kumar",
    username: "arjunkumar",
    avatar_url: image,
    hours: 9.2,
    streakDays: 18,
    location: "Ahmedabad",
    countryIso: "IN",
    stateIso: "GJ",
    city: "Ahmedabad",
  },
  {
    rank: 2,
    name: "Priya Shah",
    username: "priyashah",
    avatar_url: image,
    hours: 8.4,
    streakDays: 9,
    location: "Surat",
    countryIso: "IN",
    stateIso: "GJ",
    city: "Surat",
  },
  {
    rank: 3,
    name: "Meet Vora",
    username: "meetvora",
    avatar_url: image,
    hours: 7.1,
    streakDays: 5,
    location: "Vadodara",
    countryIso: "IN",
    stateIso: "GJ",
    city: "Vadodara",
  },
  {
    rank: 4,
    name: "Neel Desai",
    username: "neeldesai",
    avatar_url: image,
    hours: 5.8,
    streakDays: 3,
    location: "Ahmedabad",
    countryIso: "IN",
    stateIso: "GJ",
    city: "Ahmedabad",
  },
  {
    rank: 5,
    name: "Raj Joshi",
    username: "rajjoshi",
    avatar_url: image,
    hours: 4.9,
    streakDays: 2,
    location: "Mumbai",
    countryIso: "IN",
    stateIso: "MH",
    city: "Mumbai",
  },
  {
    rank: 6,
    name: "Jake Miller",
    username: "jakemiller",
    avatar_url: image,
    hours: 10.8,
    streakDays: 31,
    location: "New York",
    countryIso: "US",
    stateIso: "NY",
    city: "New York",
  },
];

function Rank() {
  const [mode, setMode] = useState<Mode>("global");
  const [period, setPeriod] = useState("allTime");
  const [selectedGlobalCountry, setSelectedGlobalCountry] =
    useState<string>("all");
  const { profile } = useProfileStore();

  const {
    selectedCountry,
    selectedState,
    selectedCity,
    countryOptions,
    stateOptions,
    cityOptions,
    handleCountryChange,
    handleStateChange,
    setSelectedCity,
  } = useLocationFilter({
    country: profile?.country || undefined,
    state: profile?.state || undefined,
    city: profile?.city || undefined,
  });

  const filteredData = sampleRankData.filter((user) => {
    if (mode === "global") {
      if (selectedGlobalCountry === "all") return true;
      return user.countryIso === selectedGlobalCountry;
    }

    // Region mode
    if (selectedCity) return user.city === selectedCity;
    if (selectedState) return user.stateIso === selectedState;
    if (selectedCountry) return user.countryIso === selectedCountry;
    return true; // no filter selected -> show all
  });

  return (
    <div className="flex flex-col gap-4 px-5 py-10 xl:px-15">
      <div className="flex items-center justify-between border-b border-zinc-300 pb-4 dark:border-zinc-700">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Developer Rankings
          </h1>
          <p className="text-sm text-zinc-400">
            Discover top developers in your region
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FloatingTabs
            tabs={[
              { value: "global", label: "Global", icon: <Globe /> },
              { value: "region", label: "Region", icon: <MapPin /> },
            ]}
            onChange={(value) => setMode(value as Mode)}
            defaultValue="global"
          />
          <PeriodSelect value={period} onChange={setPeriod} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 rounded-xl border border-zinc-300 bg-(--color-bg-secondary) px-4 py-4 dark:border-zinc-700">
        <div className="flex-1">
          {mode === "global" ? (
            <GlobalFilters
              selectedCountry={selectedGlobalCountry}
              onCountryChange={setSelectedGlobalCountry}
            />
          ) : (
            <RegionFilters
              countryOptions={countryOptions}
              stateOptions={stateOptions}
              cityOptions={cityOptions}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              onCountryChange={handleCountryChange}
              onStateChange={handleStateChange}
              onCityChange={setSelectedCity}
            />
          )}
        </div>
      </div>

      <div className="w-full rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex items-center justify-between gap-4 rounded-t-md border-b border-zinc-300 px-5 py-4 dark:border-zinc-700">
          <div className="max-w-sm text-center text-2xl font-medium text-(--color-text-primary) md:text-left">
            <span className="font-bold tracking-tight text-orange-500">
              Rohan Kumar
            </span>{" "}
            at the top, setting the standard for everyone else.
          </div>
          <img src={image} className="h-20 w-19 shrink-0" alt="Rank" />
        </div>
        <div className="text-md sticky top-0 z-10 hidden grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 font-semibold tracking-wide text-neutral-400 md:grid lg:px-4 xl:px-6">
          <div className="col-span-1 ml-1">Rank</div>
          <div className="col-span-4 ml-2 text-left">Developer</div>
          <div className="col-span-2 text-center">Time Spent</div>
          <div className="col-span-3 text-center">Streak</div>
          <div className="col-span-2 text-center">Location</div>
        </div>

        <div className="space-y-1">
          {sampleRankData.map((user, index) => (
            <div
              key={index}
              className="mx-2 my-3 rounded-xl border border-(--color-border) md:m-0 md:rounded-none md:border-0 md:border-t"
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
                  className={`mt-1 flex-1 items-center text-right font-mono text-xs font-medium sm:text-sm md:col-span-2 md:text-center md:text-base md:font-semibold ${
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
                    <Flame
                      size={20}
                      className="fill-orange-500 text-orange-500"
                    />
                    {user.streakDays}d
                  </span>
                </div>

                <div className="text-md col-span-2 mt-1 text-center font-semibold text-(--color-text-secondary) md:mt-0">
                  {user.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rank;
