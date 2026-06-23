import { useMemo, useState, useEffect } from "react";
import { FloatingTabs } from "../components/Rank/FloatingTabs";
import { Globe, MapPin, SlidersHorizontal, X } from "lucide-react";
import image from "../assets/image.png";
import { PeriodSelect } from "../components/Rank/PeriodSelect";
import { GlobalFilters } from "../components/Rank/GlobalFilters";
import { RegionFilters } from "../components/Rank/RegionFilters";
import { useLocationFilter } from "../hooks/useLocationFilter";
import useProfileStore from "../store/useProfileStore";
import type { FieldKey, Mode, Period } from "../types/types";
import { useRankings } from "../hooks/useRankings";
import { RankSkeleton } from "../Skeletons/RankSkeleton";
import { RankUser as RankUserComponent } from "../components/Rank/RankUser";

function Rank() {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("rankMode") as Mode;
    return saved || "global";
  });
  const [period, setPeriod] = useState<Period>(() => {
    const saved = localStorage.getItem("rankPeriod") as Period;
    return saved || "allTime";
  });
  const [selectedGlobalCountry, setSelectedGlobalCountry] =
    useState<string>("all");
  const [activeField, setActiveField] = useState<FieldKey>(() => {
    const saved = localStorage.getItem("rankActiveField") as FieldKey;
    return saved || "country";
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { profile } = useProfileStore();

  useEffect(() => {
    localStorage.setItem("rankMode", mode);
    localStorage.setItem("rankPeriod", period);
    localStorage.setItem("rankActiveField", activeField);
  }, [mode, period, activeField]);

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

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
    country: profile?.country || "India",
    state: profile?.state || "all",
    city: profile?.city || "all",
  });

  const regionFetchFilters = useMemo(() => {
    if (activeField === "city") {
      return {
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
      };
    }
    if (activeField === "state") {
      return { country: selectedCountry, state: selectedState, city: null };
    }
    return { country: selectedCountry, state: null, city: null };
  }, [activeField, selectedCountry, selectedState, selectedCity]);

  const rankingFilters = useMemo(() => {
    if (mode === "global") {
      return {
        country: selectedGlobalCountry,
        state: null,
        city: null,
      };
    }
    return {
      country: regionFetchFilters.country,
      state: regionFetchFilters.state,
      city: regionFetchFilters.city,
    };
  }, [mode, selectedGlobalCountry, regionFetchFilters]);

  const {
    data: rankings,
    loading,
    error,
  } = useRankings({
    mode,
    period,
    ...rankingFilters,
  });

  const activeFilterCount = useMemo(() => {
    if (mode === "global") return selectedGlobalCountry !== "all" ? 1 : 0;
    let count = 0;
    if (selectedCountry) count++;
    if (selectedState && selectedState !== "all") count++;
    if (selectedCity && selectedCity !== "all") count++;
    return count;
  }, [
    mode,
    selectedGlobalCountry,
    selectedCountry,
    selectedState,
    selectedCity,
  ]);

  const FiltersComponent = (
    <>
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
          activeField={activeField}
          setActiveField={setActiveField}
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-4 px-5 py-5 xl:px-15">
      <div className="flex flex-col items-center justify-center gap-5 border-b border-zinc-300 pb-4 md:flex-row md:items-center md:justify-between md:gap-0 dark:border-zinc-700">
        <div className="border-b border-zinc-300 px-4 pb-2 md:border-b-0 md:p-0 md:pb-5 dark:border-zinc-700">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Developer Rankings
          </h1>
          <p className="text-sm text-zinc-400">
            Discover top developers in your region
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-center">
          <FloatingTabs
            className="mx-auto"
            value={mode}
            tabs={[
              { value: "global", label: "Global", icon: <Globe /> },
              { value: "region", label: "Region", icon: <MapPin /> },
            ]}
            onChange={(value) => setMode(value as Mode)}
          />
          <PeriodSelect value={period} onChange={setPeriod} />
        </div>
      </div>

      <button
        onClick={() => setShowFilters(true)}
        className="relative flex items-center gap-2 rounded-lg border border-zinc-300 bg-(--color-bg-secondary) px-3 py-2 text-sm font-medium text-(--color-text-primary) transition-colors hover:border-orange-500 hover:text-orange-500 md:hidden dark:border-zinc-700"
      >
        <SlidersHorizontal className="size-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
            {activeFilterCount}
          </span>
        )}
      </button>
      <div className="hidden items-start justify-between gap-4 rounded-xl border border-zinc-300 bg-(--color-bg-secondary) px-3 py-3 md:flex md:px-4 md:py-4 dark:border-zinc-700">
        <div className="flex-1">{FiltersComponent}</div>
      </div>

      <div className="w-full rounded-md border border-zinc-300 dark:border-zinc-700">
        <div className="flex items-center justify-between gap-4 rounded-t-md border-b border-zinc-300 px-5 py-4 dark:border-zinc-700">
          <div className="text-md max-w-sm text-center font-medium text-(--color-text-primary) md:text-left md:text-2xl">
            <span className="font-bold tracking-tight text-orange-500">
              Rohan Kumar
            </span>{" "}
            at the top, setting the standard for everyone else.
          </div>
          <img
            src={image}
            className="h-14 w-13 shrink-0 md:h-20 md:w-19"
            alt="Rank"
          />
        </div>
        <div className="text-md sticky top-0 z-10 hidden grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 font-semibold tracking-wide text-neutral-400 md:grid lg:px-4 xl:px-6">
          <div className="col-span-1 ml-1">Rank</div>
          <div className="col-span-4 ml-2 text-left">Developer</div>
          <div className="col-span-2 text-center">Time Spent</div>
          <div className="col-span-3 text-center">Streak</div>
          <div className="col-span-2 text-center">Location</div>
        </div>

        {loading ? (
          <RankSkeleton />
        ) : error ? (
          <div className="px-8 py-12 text-center text-sm text-red-500">
            {error}
          </div>
        ) : rankings.length === 0 ? (
          <div className="px-8 py-12 text-center text-sm text-(--color-text-secondary)">
            No developers found for the selected filters.
          </div>
        ) : (
          <div className="space-y-1">
            {rankings.map((user) => (
              <RankUserComponent
                key={user.id}
                user={user}
                mode={mode}
                isAllCountries={selectedGlobalCountry === "all"}
              />
            ))}
          </div>
        )}
      </div>

      {showFilters && (
        <div>
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />

          <div className="absolute right-0 bottom-0 left-0 rounded-t-2xl border-t border-zinc-300 bg-(--color-bg-primary) dark:border-zinc-700">
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>

            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-semibold text-(--color-text-primary)">
                  Filters
                </h3>
                <p className="text-xs text-(--color-text-secondary)">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} applied`
                    : "No filters applied"}
                </p>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-full p-2 text-(--color-text-secondary) hover:bg-(--color-bg-secondary)"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="px-5 py-5">{FiltersComponent}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rank;
