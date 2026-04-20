interface props {
  languages: { label: string; hours: number }[];
  getColor: (index: number) => string;
}

export default function LangStateList({ languages, getColor }: props) {
  return (
    <div className="scrollbar-hide w-full space-y-2 overflow-y-auto [scrollbar-width:none]">
      {languages.map((lang, index) => (
        <List
          key={index}
          language={lang.label}
          hours={lang.hours}
          color={getColor(index)}
        />
      ))}
    </div>
  );
}

function List({
  language,
  hours,
  color,
}: {
  language: string;
  hours: number;
  color: string;
}) {
  return (
    <div className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-(--color-border) bg-(--color-bg-primary) px-3 py-3 transition-colors duration-200 hover:bg-(--color-bg-secondary) sm:gap-4 sm:px-5 sm:py-4 lg:px-3 lg:py-3">
      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className="h-4 w-4 shrink-0 rounded-full sm:h-4 sm:w-4 xl:h-5 xl:w-5"
          style={{ backgroundColor: color }}
        />
        <span className="truncate text-base font-semibold text-(--color-text-primary) sm:text-lg xl:text-xl">
          {language}
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-end text-right">
        <span className="text-base font-semibold text-(--color-text-primary) sm:text-lg xl:text-xl">
          {hours}
        </span>
        <span className="text-xs font-medium text-(--color-text-secondary) sm:text-sm">
          50.3%
        </span>
      </div>
    </div>
  );
}
