import { useState, useMemo, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import type { SelectOption } from "../types/types";

interface InitialLocation {
  country?: string;
  state?: string;
  city?: string;
}

export function useLocationFilter(initial?: InitialLocation) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const countryOptions: SelectOption[] = useMemo(
    () =>
      Country.getAllCountries().map((c) => ({
        label: c.name,
        value: c.isoCode,
      })),
    [],
  );

  const stateOptions: SelectOption[] = useMemo(
    () =>
      selectedCountry
        ? [
            { label: "All states", value: "all" },
            ...State.getStatesOfCountry(selectedCountry).map((s) => ({
              label: s.name,
              value: s.isoCode,
            })),
          ]
        : [],
    [selectedCountry],
  );

  const cityOptions: SelectOption[] = useMemo(
    () =>
      selectedCountry && selectedState
        ? [
            { label: "All cities", value: "all" },
            ...City.getCitiesOfState(selectedCountry, selectedState).map(
              (c) => ({
                label: c.name,
                value: c.name,
              }),
            ),
          ]
        : [],
    [selectedCountry, selectedState],
  );

  useEffect(() => {
    if (!initial?.country) return;

    const countries = Country.getAllCountries();

    const matchedCountry =
      countries.find((c) => c.isoCode === initial.country) ??
      countries.find(
        (c) => c.name.toLowerCase() === initial.country?.toLowerCase(),
      );

    if (!matchedCountry) return;
    setSelectedCountry(matchedCountry.isoCode);

    if (initial.state) {
      const states = State.getStatesOfCountry(matchedCountry.isoCode);
      const matchedState =
        states.find((s) => s.isoCode === initial.state) ??
        states.find(
          (s) => s.name.toLowerCase() === initial.state?.toLowerCase(),
        );

      if (matchedState) {
        setSelectedState(matchedState.isoCode);
        if (initial.city) {
          setSelectedCity(initial.city);
        }
      }
    }
  }, [initial?.country, initial?.state, initial?.city]);

  const handleCountryChange = (value: string | null) => {
    setSelectedCity(value);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (value: string | null) => {
    setSelectedState(value);
    setSelectedCity(null);
  };

  return {
    selectedCountry,
    selectedState,
    selectedCity,
    countryOptions,
    stateOptions,
    cityOptions,
    handleCountryChange,
    handleStateChange,
    setSelectedCity,
  };
}
