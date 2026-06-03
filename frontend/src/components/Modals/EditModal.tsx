import { useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";

// ── Types ──────────────────────────────────────────────────────────────────
interface SelectedCountry {
  isoCode: string;
  name: string;
}

interface SelectedState {
  isoCode: string;
  name: string;
}

interface SelectedCity {
  name: string;
}

interface SelectOption {
  label: string;
  value: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name?: string;
    username?: string;
    bio?: string;
  };
  onSave?: (data: {
    name: string;
    username: string;
    bio: string;
    country: string;
    state: string;
    city: string;
  }) => void;
}

const countryOptions: SelectOption[] = Country.getAllCountries().map((c) => ({
  label: c.name,
  value: c.isoCode,
}));

const selectStyles = (hasError: boolean) => ({
  control: (base: object) => ({
    ...base,
    borderColor: hasError ? "#ef4444" : undefined,
  }),
  menuPortal: (base: object) => ({
    ...base,
    zIndex: 9999,
  }),
});

export default function EditModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditModalProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState(initialData?.name ?? "");
  const [username, setUsername] = useState(initialData?.username ?? "");
  const [bio, setBio] = useState(initialData?.bio ?? "");
  const [country, setCountry] = useState<SelectedCountry | null>(null);
  const [state, setState] = useState<SelectedState | null>(null);
  const [city, setCity] = useState<SelectedCity | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const clearError = (key: string) =>
    setErrors((prev) => ({ ...prev, [key]: false }));

  const validate = (fields: Record<string, unknown>) => {
    const newErrors = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, !v]),
    );
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (validate({ name, username })) setPage(2);
  };

  const handleSave = () => {
    if (validate({ country, state, city }) && onSave) {
      onSave({
        name,
        username,
        bio,
        country: country?.name ?? "",
        state: state?.name ?? "",
        city: city?.name ?? "",
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setPage(1);
    setErrors({});
    onClose();
  };

  const stateOptions: SelectOption[] = country
    ? State.getStatesOfCountry(country.isoCode).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  const cityOptions: SelectOption[] =
    country && state
      ? City.getCitiesOfState(country.isoCode, state.isoCode).map((c) => ({
          label: c.name,
          value: c.name,
        }))
      : [];

  const inputClass = (hasError: boolean) =>
    `w-full rounded-md border bg-transparent p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-white sm:p-3 ${
      hasError ? "border-red-500" : "border-(--color-border)"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-(--color-border) bg-white p-4 sm:max-w-md sm:p-6 md:max-w-lg md:p-8 lg:max-w-xl dark:bg-[#0b0809]">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <h2 className="text-xl font-semibold text-(--color-text-primary) md:text-2xl">
            Edit Information
          </h2>
          <button
            onClick={handleClose}
            className="cursor-pointer rounded-md p-1 text-gray-500 hover:bg-(--color-bg-secondary) hover:text-(--color-text-primary)"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ── Page 1 ── */}
        {page === 1 && (
          <div className="min-h-[280px] space-y-3 sm:min-h-[340px] sm:space-y-4">
            {(
              [
                {
                  label: "Name",
                  value: name,
                  setter: setName,
                  key: "name",
                  placeholder: "Enter your name",
                },
                {
                  label: "Username",
                  value: username,
                  setter: setUsername,
                  key: "username",
                  placeholder: "Enter your username",
                },
              ] as const
            ).map(({ label, value, setter, key, placeholder }) => (
              <div key={key}>
                <label className="mb-1 block text-base font-medium text-gray-700 sm:mb-2 md:text-lg dark:text-gray-300">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setter(e.target.value);
                    if (errors[key]) clearError(key);
                  }}
                  className={inputClass(errors[key])}
                  placeholder={placeholder}
                />
                {errors[key] && (
                  <p className="mt-1 text-sm text-red-500">
                    {label} is required
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="mb-1 block text-base font-medium text-gray-700 sm:mb-2 md:text-lg dark:text-gray-300">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value.slice(0, 150));
                }}
                className={`h-20 resize-none p-2 sm:h-24 sm:p-3 ${inputClass(errors.bio)}`}
                placeholder="Write something about yourself..."
              />
              <div className="flex justify-between">
                <p className="mt-1 ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {bio.length}/150
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Page 2 ── */}
        {page === 2 && (
          <div className="min-h-[280px] space-y-3 sm:min-h-[340px] sm:space-y-4">
            <div>
              <label className="mb-1 block text-base font-medium text-gray-700 sm:mb-2 md:text-lg dark:text-gray-300">
                Country
              </label>
              <Select
                options={countryOptions}
                value={
                  country
                    ? { label: country.name, value: country.isoCode }
                    : null
                }
                onChange={(opt) => {
                  setCountry(
                    opt ? { isoCode: opt.value, name: opt.label } : null,
                  );
                  setState(null);
                  setCity(null);
                  if (errors.country) clearError("country");
                }}
                placeholder="Select country"
                isClearable
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={selectStyles(errors.country)}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">Country is required</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-base font-medium text-gray-700 sm:mb-2 md:text-lg dark:text-gray-300">
                State
              </label>
              <Select
                options={stateOptions}
                value={
                  state ? { label: state.name, value: state.isoCode } : null
                }
                onChange={(opt) => {
                  setState(
                    opt ? { isoCode: opt.value, name: opt.label } : null,
                  );
                  setCity(null);
                  if (errors.state) clearError("state");
                }}
                placeholder="Select state"
                isDisabled={!country}
                isClearable
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={selectStyles(errors.state)}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">State is required</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-base font-medium text-gray-700 sm:mb-2 md:text-lg dark:text-gray-300">
                City
              </label>
              <Select
                value={city ? { label: city.name, value: city.name } : null}
                options={cityOptions}
                onChange={(opt) => {
                  setCity(opt ? { name: opt.label } : null);
                  if (errors.city) clearError("city");
                }}
                placeholder="Select city"
                isDisabled={!state}
                isClearable
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={selectStyles(errors.city)}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">City is required</p>
              )}
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">
          {page === 2 && (
            <button
              onClick={() => {
                setErrors({});
                setPage(1);
              }}
              className="flex-1 cursor-pointer rounded-md border border-(--color-border) px-3 py-2 text-sm transition-colors hover:bg-gray-100 sm:px-4 md:text-base dark:text-white dark:hover:bg-neutral-800"
            >
              Previous
            </button>
          )}
          <button
            onClick={page === 1 ? handleNext : handleSave}
            className="flex-1 cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-sm text-white transition-colors hover:bg-orange-600 sm:px-4 md:text-base"
          >
            {page === 1 ? "Next" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
