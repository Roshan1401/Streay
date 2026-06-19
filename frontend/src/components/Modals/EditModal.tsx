import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import {
  Camera,
  User,
  AtSign,
  MessageSquareQuote,
  X,
  ArrowRight,
} from "lucide-react";
import { uploadToCloudinary } from "../../lib/cloudinary";
import type { SelectOption } from "../../types/types";

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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name?: string;
    username?: string;
    bio?: string;
    avatar_url?: string;
    banner_url?: string;
    country?: string;
    state?: string;
    city?: string;
  };
  onSave?: (data: {
    name: string;
    username: string;
    bio: string;
    avatar_url: string;
    banner_url: string;
    country: string;
    state: string;
    city: string;
  }) => void;
}

interface FilePreview {
  file: File;
  preview: string;
}

interface SelectedFiles {
  avatar_url: FilePreview | null;
  banner_url: FilePreview | null;
}

const EMPTY_FILES: SelectedFiles = { avatar_url: null, banner_url: null };

const countryOptions: SelectOption[] = Country.getAllCountries().map((c) => ({
  label: c.name,
  value: c.isoCode,
}));

const selectStyles = (hasError: boolean) => ({
  control: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: "var(--color-bg-secondary)",
    borderColor: hasError
      ? "#ef4444"
      : state.isFocused
        ? "#f97316"
        : "var(--color-border)",
    boxShadow: "none",
    "&:hover": {
      borderColor: hasError ? "#ef4444" : "var(--color-border)",
    },
  }),
  menu: (base: object) => ({
    ...base,
    backgroundColor: "var(--color-bg-secondary)",
    border: "1px solid var(--color-border)",
    zIndex: 9999,
  }),
  menuPortal: (base: object) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base: object) => ({
    ...base,
    backgroundColor: "var(--color-bg-secondary)",
  }),
  option: (
    base: object,
    state: { isFocused: boolean; isSelected: boolean },
  ) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#f97316"
      : state.isFocused
        ? "var(--color-bg-primary)"
        : "transparent",
    color: state.isSelected ? "#ffffff" : "var(--color-text-primary)",
    cursor: "pointer",
  }),
  singleValue: (base: object) => ({
    ...base,
    color: "var(--color-text-primary)",
  }),
  input: (base: object) => ({
    ...base,
    color: "var(--color-text-primary)",
  }),
  placeholder: (base: object) => ({
    ...base,
    color: "var(--color-text-secondary)",
  }),
  indicatorSeparator: (base: object) => ({
    ...base,
    backgroundColor: "var(--color-border)",
  }),
  dropdownIndicator: (base: object) => ({
    ...base,
    color: "var(--color-text-secondary)",
    "&:hover": { color: "var(--color-text-primary)" },
  }),
  clearIndicator: (base: object) => ({
    ...base,
    color: "var(--color-text-secondary)",
    "&:hover": { color: "var(--color-text-primary)" },
  }),
});

function resolveCountry(value?: string): SelectedCountry | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  const countries = Country.getAllCountries();
  const byIso = countries.find((c) => c.isoCode === trimmed);
  if (byIso) return { isoCode: byIso.isoCode, name: byIso.name };
  const byName = countries.find(
    (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
  );
  return byName ? { isoCode: byName.isoCode, name: byName.name } : null;
}

function resolveState(
  countryIso: string,
  value?: string,
): SelectedState | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  const states = State.getStatesOfCountry(countryIso);
  const byIso = states.find((s) => s.isoCode === trimmed);
  if (byIso) return { isoCode: byIso.isoCode, name: byIso.name };
  const byName = states.find(
    (s) => s.name.toLowerCase() === trimmed.toLowerCase(),
  );
  return byName ? { isoCode: byName.isoCode, name: byName.name } : null;
}

export default function EditModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditModalProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [banner_url, setBannerUrl] = useState("");
  const [country, setCountry] = useState<SelectedCountry | null>(null);
  const [state, setState] = useState<SelectedState | null>(null);
  const [city, setCity] = useState<SelectedCity | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFiles>(EMPTY_FILES);

  useEffect(() => {
    return () => {
      if (selectedFile.avatar_url?.preview)
        URL.revokeObjectURL(selectedFile.avatar_url.preview);
      if (selectedFile.banner_url?.preview)
        URL.revokeObjectURL(selectedFile.banner_url.preview);
    };
  }, [selectedFile]);

  useEffect(() => {
    if (!isOpen) return;

    setPage(1);
    setErrors({});
    setUploadError(null);
    setSelectedFile(EMPTY_FILES);
    setName(initialData?.name ?? "");
    setUsername(initialData?.username ?? "");
    setBio(initialData?.bio ?? "");
    setAvatarUrl(initialData?.avatar_url ?? "");
    setBannerUrl(initialData?.banner_url ?? "");

    const resolvedCountry = resolveCountry(initialData?.country);
    const resolvedState = resolvedCountry
      ? resolveState(resolvedCountry.isoCode, initialData?.state)
      : null;
    const resolvedCity = initialData?.city?.trim()
      ? { name: initialData.city.trim() }
      : null;

    setCountry(resolvedCountry);
    setState(resolvedState);
    setCity(resolvedCity);
  }, [
    isOpen,
    initialData?.name,
    initialData?.username,
    initialData?.bio,
    initialData?.avatar_url,
    initialData?.banner_url,
    initialData?.country,
    initialData?.state,
    initialData?.city,
  ]);

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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "avatar_url" | "banner_url",
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSelectedFile((prev) => ({ ...prev, [type]: { file, preview } }));
  };

  const handleSave = async () => {
    if (!validate({ country, state, city }) || !onSave) return;

    setSaving(true);
    setUploadError(null);

    try {
      const [finalAvatarUrl, finalBannerUrl] = await Promise.all([
        selectedFile.avatar_url?.file
          ? uploadToCloudinary(selectedFile.avatar_url.file, "avatars")
          : Promise.resolve(avatar_url),
        selectedFile.banner_url?.file
          ? uploadToCloudinary(selectedFile.banner_url.file, "banners")
          : Promise.resolve(banner_url),
      ]);

      onSave({
        name,
        username,
        bio,
        avatar_url: finalAvatarUrl,
        banner_url: finalBannerUrl,
        country: country?.name ?? "",
        state: state?.name ?? "",
        city: city?.name ?? "",
      });

      handleClose();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setPage(1);
    setErrors({});
    setUploadError(null);
    setSelectedFile(EMPTY_FILES);
    onClose();
  };

  const stateOptions: SelectOption[] = country
    ? State.getStatesOfCountry(country.isoCode).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  const cityOptions: SelectOption[] = (() => {
    if (!country || !state) return [];
    const options = City.getCitiesOfState(country.isoCode, state.isoCode).map(
      (c) => ({ label: c.name, value: c.name }),
    );
    if (city && !options.some((o) => o.value === city.name)) {
      return [{ label: city.name, value: city.name }, ...options];
    }
    return options;
  })();

  const fieldClass = (hasError: boolean) =>
    `flex items-start gap-3 rounded-lg border bg-(--color-bg-secondary) p-3 transition-colors focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 sm:p-4 ${
      hasError ? "border-red-500" : "border-(--color-border)"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl border border-(--color-border) bg-(--color-bg-primary) p-4 sm:max-w-md sm:p-6 md:max-w-lg md:p-8 lg:max-w-xl">
        <div className="mb-5 flex items-start justify-between sm:mb-6">
          <div>
            <h2 className="text-xl font-semibold text-(--color-text-primary) md:text-2xl">
              Edit Information
            </h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              Update your profile details
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={saving}
            className="cursor-pointer rounded-full bg-(--color-bg-secondary) p-2 text-(--color-text-secondary) hover:text-(--color-text-primary) disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {page === 1 && (
          <div className="min-h-70 space-y-4 sm:min-h-85">
            <div className="relative mb-16 sm:mb-20">
              <div className="relative h-45 w-full overflow-hidden rounded-xl border border-(--color-border)">
                <img
                  src={selectedFile.banner_url?.preview || banner_url}
                  className="h-full w-full object-cover blur-[2px]"
                  alt=""
                />
                <label className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-2 text-white">
                  <div className="rounded-full bg-[rgba(67,67,67,0.7)] p-2 hover:bg-white hover:text-black">
                    <Camera className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Change cover</span>{" "}
                  {/* ✅ added */}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "banner_url")}
                  />
                </label>
              </div>

              <div className="absolute inset-x-0 top-28 ml-5 h-33.5 w-33.5 overflow-hidden rounded-full border-3 border-orange-500 bg-gray-300">
                <img
                  src={selectedFile.avatar_url?.preview || avatar_url}
                  className="h-full w-full object-cover"
                  alt="Profile"
                />
                <label className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center text-white">
                  <div className="rounded-full bg-[rgba(67,67,67,0.7)] p-2 hover:bg-white hover:text-black">
                    <Camera className="h-4 w-4" />
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "avatar_url")}
                  />
                </label>
              </div>
            </div>

            <div>
              <div className={fieldClass(errors.name)}>
                <User className="mt-0.5 h-5 w-5 shrink-0 text-(--color-text-secondary)" />
                <div className="w-full">
                  <label className="block text-xs font-medium text-(--color-text-secondary)">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) clearError("name");
                    }}
                    className="w-full bg-transparent text-base text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary)"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">Name is required</p>
              )}
            </div>

            <div>
              <div className={fieldClass(errors.username)}>
                <AtSign className="mt-0.5 h-5 w-5 shrink-0 text-(--color-text-secondary)" />
                <div className="w-full">
                  <label className="block text-xs font-medium text-(--color-text-secondary)">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errors.username) clearError("username");
                    }}
                    className="w-full bg-transparent text-base text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary)"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  Username is required
                </p>
              )}
            </div>

            <div>
              <div className={`h-22 ${fieldClass(errors.bio)}`}>
                <MessageSquareQuote className="mt-0.5 h-5 w-5 shrink-0 text-(--color-text-secondary)" />
                <div className="w-full">
                  <label className="block text-xs font-medium text-(--color-text-secondary)">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 150))}
                    className="h-16 w-full resize-none bg-transparent text-base text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary) sm:h-20"
                    placeholder="Write something about yourself..."
                  />
                  <p className="text-right text-xs text-(--color-text-secondary)">
                    {bio.length}/150
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="min-h-70 space-y-3 sm:min-h-85 sm:space-y-4">
            <div>
              <label className="mb-1 block text-base font-medium text-(--color-text-secondary) sm:mb-2 md:text-lg">
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
              <label className="mb-1 block text-base font-medium text-(--color-text-secondary) sm:mb-2 md:text-lg">
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
              <label className="mb-1 block text-base font-medium text-(--color-text-secondary) sm:mb-2 md:text-lg">
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

        {uploadError && (
          <p className="mt-3 text-center text-sm text-red-500">{uploadError}</p>
        )}

        {/* ── Footer ── */}
        <div className="mt-5 flex gap-2 sm:mt-6 sm:gap-3">
          {page === 2 && (
            <button
              onClick={() => {
                setErrors({});
                setPage(1);
              }}
              disabled={saving}
              className="flex-1 cursor-pointer rounded-lg border border-(--color-border) px-3 py-3 text-sm font-medium text-(--color-text-primary) transition-colors hover:bg-(--color-bg-secondary) disabled:opacity-50 sm:px-4 md:text-base"
            >
              Previous
            </button>
          )}
          <button
            onClick={page === 1 ? handleNext : handleSave}
            disabled={saving} // ✅ disabled during upload
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 md:text-base"
          >
            {saving ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Uploading...
              </>
            ) : page === 1 ? (
              <>
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
