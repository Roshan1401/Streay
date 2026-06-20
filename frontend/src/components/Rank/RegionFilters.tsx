import { Flag, Building2, MapPinned } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import type { FieldKey, SelectOption } from "../../types/types";
import { useState } from "react";

interface RegionFiltersProps {
  countryOptions: SelectOption[];
  stateOptions: SelectOption[];
  cityOptions: SelectOption[];
  selectedCountry: string | null;
  selectedState: string | null;
  selectedCity: string | null;
  activeField: FieldKey;
  setActiveField: (field: FieldKey) => void;
  onCountryChange: (value: string | null) => void;
  onStateChange: (value: string | null) => void;
  onCityChange: (value: string | null) => void;
}

export function RegionFilters({
  countryOptions,
  stateOptions,
  cityOptions,
  selectedCountry,
  selectedState,
  selectedCity,
  activeField,
  setActiveField,
  onCountryChange,
  onStateChange,
  onCityChange,
}: RegionFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <CustomSelect
        fieldKey="country"
        activeField={activeField}
        setActiveField={setActiveField}
        label="Country"
        icon={<Flag className="size-3.5" />}
        options={countryOptions}
        value={selectedCountry}
        onChange={onCountryChange}
        placeholder="Select country"
      />

      <CustomSelect
        fieldKey="state"
        activeField={activeField}
        setActiveField={setActiveField}
        label="State"
        icon={<Building2 className="size-3.5" />}
        options={stateOptions}
        value={selectedState}
        onChange={onStateChange}
        placeholder="Select state"
        disabled={!selectedCountry}
      />

      <CustomSelect
        fieldKey="city"
        activeField={activeField}
        setActiveField={setActiveField}
        label="City"
        icon={<MapPinned className="size-3.5" />}
        options={cityOptions}
        value={selectedCity}
        onChange={onCityChange}
        placeholder="Select city"
        disabled={!selectedState}
      />
    </div>
  );
}
