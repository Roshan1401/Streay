import type { Period } from "../../types/types";

const periodOptions = [
  { value: "allTime", label: "All Time" },
  { value: "24h", label: "last 24h" },
  { value: "7d", label: "last 7days" },
  { value: "30d", label: "last 30days" },
];

interface PeriodSelectProps {
  value: Period;
  onChange: (value: Period) => void;
}

export function PeriodSelect({ value, onChange }: PeriodSelectProps) {
  return (
    <div className="relative">
      <select
        className="h-8 w-40 appearance-none rounded-md border border-zinc-300 bg-zinc-50 px-4 pr-10 text-sm font-medium text-zinc-800 transition-all outline-none hover:border-zinc-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 md:h-11 md:w-44 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        value={value}
        onChange={(e) => onChange(e.target.value as Period)}
      >
        {periodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
