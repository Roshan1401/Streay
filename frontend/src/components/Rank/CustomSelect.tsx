import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import type { SelectOption, FieldKey } from "../../types/types";

interface CustomSelectProps {
  fieldKey?: string;
  activeField?: FieldKey;
  setActiveField?: (field: FieldKey) => void;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string | "all") => void;
  placeholder?: string;
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
}

export function CustomSelect({
  fieldKey,
  activeField,
  setActiveField,
  options,
  value,
  onChange,
  placeholder = "Select",
  icon,
  label,
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = search
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <label
        className={`mb-2 flex w-fit cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-(--color-text-secondary) ${activeField === fieldKey ? "bg-orange-500 text-white" : ""}`}
        onClick={() =>
          setActiveField && fieldKey && setActiveField(fieldKey as FieldKey)
        }
      >
        {icon}
        {label}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={`flex h-10 w-full items-center justify-between rounded-lg border px-3 text-sm transition-colors ${
          disabled
            ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
            : open
              ? "border-orange-500 bg-(--color-bg-primary) ring-2 ring-orange-500/20"
              : "border-zinc-300 bg-(--color-bg-primary) text-(--color-text-primary) hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
        }`}
      >
        <span
          className={`truncate ${selected ? "text-(--color-text-primary)" : "text-(--color-text-secondary)"}`}
        >
          {selected ? selected.label : placeholder}
        </span>

        <span className="ml-2 flex shrink-0 items-center gap-1">
          {selected && !disabled && (
            <X
              className="size-3.5 text-(--color-text-secondary) hover:text-(--color-text-primary)"
              onClick={(e) => {
                e.stopPropagation();
                onChange("all");
              }}
            />
          )}
          <ChevronDown
            className={`size-4 text-(--color-text-secondary) transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && !disabled && (
        <div className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-zinc-300 bg-(--color-bg-primary) shadow-lg dark:border-zinc-700">
          <div className="border-b border-zinc-200 p-2 dark:border-zinc-800">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="w-full rounded-md bg-(--color-bg-secondary) px-2.5 py-1.5 text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-secondary)"
            />
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-center text-sm text-(--color-text-secondary)">
                No results found
              </div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-orange-50 dark:hover:bg-orange-950/30 ${
                    opt.value === value
                      ? "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
                      : "text-(--color-text-primary)"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {opt.value === value && <Check className="size-4 shrink-0" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
