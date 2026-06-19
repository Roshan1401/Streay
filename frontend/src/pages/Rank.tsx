import { useState } from "react";
import { FloatingTabs } from "../components/Rank/FloatingTabs";
import { Globe, MapPin } from "lucide-react";
import image from "../assets/image.png";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import type { SelectOption } from "../types/types";
import { PeriodSelect } from "../components/Rank/PeriodSelect";

type Mode = "global" | "region";

const globalCountryOptions: SelectOption[] = [
  { label: "All Countries", value: "all" },
  ...Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  })),
];

function Rank() {
  const [mode, setMode] = useState<Mode>("global");
  const [period, setPeriod] = useState("allTime");
  const [selectedGlobalCountry, setSelectedGlobalCountry] =
    useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("In");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const countryOptions: SelectOption[] = Country.getAllCountries().map(
    (country) => ({
      label: country.name,
      value: country.isoCode,
    }),
  );

  const stateOptions: SelectOption[] = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((state) => ({
        label: state.name,
        value: state.isoCode,
      }))
    : [];

  const cityOptions: SelectOption[] = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
        label: city.name,
        value: city.name,
      }))
    : [];

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

      <div className="h-50 w-full rounded-md border border-zinc-300 dark:border-zinc-700 dark:bg-neutral-900">
        <div className="flex w-full items-center justify-between gap-4 border-b border-zinc-300 px-5 py-3 dark:border-zinc-600">
          {mode === "global" ? (
            <div>
              <label className="block text-sm font-medium text-(--color-text-secondary) sm:mb-2">
                Country
              </label>
              <Select
                options={globalCountryOptions}
                value={globalCountryOptions.find(
                  (option) => option.value === selectedGlobalCountry,
                )}
                onChange={(option) =>
                  setSelectedGlobalCountry(option ? option.value : "all")
                }
                className="w-48"
                classNamePrefix="select"
                placeholder="Select Country"
              />
            </div>
          ) : (
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) sm:mb-2">
                  Country
                </label>
                <Select
                  options={countryOptions}
                  value={countryOptions.find(
                    (option) => option.value === selectedCountry,
                  )}
                  onChange={(option) =>
                    setSelectedCountry(option ? option.value : "")
                  }
                  className="w-48"
                  classNamePrefix="select"
                  placeholder="Select Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) sm:mb-2">
                  State
                </label>
                <Select
                  options={stateOptions}
                  value={stateOptions.find(
                    (option) => option.value === selectedState,
                  )}
                  onChange={(option) =>
                    setSelectedState(option ? option.value : "")
                  }
                  className="w-48"
                  classNamePrefix="select"
                  placeholder="Select State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-(--color-text-secondary) sm:mb-2">
                  City
                </label>
                <Select
                  options={cityOptions}
                  value={cityOptions.find(
                    (option) => option.value === selectedCity,
                  )}
                  onChange={(option) =>
                    setSelectedCity(option ? option.value : "")
                  }
                  className="w-48"
                  classNamePrefix="select"
                  placeholder="Select State"
                />
              </div>
            </div>
          )}
          <img
            src={image}
            className="size-15 rounded-full border border-black"
            alt="Rank"
          />
        </div>
      </div>
    </div>
  );
}

export default Rank;
