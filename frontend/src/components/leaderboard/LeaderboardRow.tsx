import type { Range } from "../../types/types";

interface Props {
  activeRow: Range;
  setActiveRow: (row: Range) => void;
}

function LeaderboardRow(props: Props) {
  const { activeRow, setActiveRow } = props;
  const days: Range[] = ["24h", "7day", "30day"];

  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-4xl border border-(--color-border) bg-neutral-900 px-2 py-1">
      {days.map((day) => {
        const isActive = activeRow === day;
        return (
          <button
            key={day}
            type="button"
            onClick={() => setActiveRow(day)}
            className={[
              "md:text:md cursor-pointer rounded-4xl px-3 py-1 text-sm font-bold transition-colors md:px-6 md:py-2",
              isActive
                ? "bg-(--color-bg-primary) text-(--color-text-primary)"
                : "text-(--color-text-secondary)",
            ].join(" ")}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

export default LeaderboardRow;
