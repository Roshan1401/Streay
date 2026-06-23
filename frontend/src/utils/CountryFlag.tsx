import { Country } from "country-state-city";
import * as Flags from "country-flag-icons/react/3x2";

interface CountryFlagProps {
  countryName: string;
}

export function CountryFlag({ countryName }: CountryFlagProps) {
  const match = Country.getAllCountries().find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase(),
  );

  if (!match) return null;

  const Flag = Flags[match.isoCode as keyof typeof Flags];

  return Flag ? <Flag className="h-4 w-6 rounded-sm" /> : null;
}
