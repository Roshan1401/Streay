import  { useState } from "react";

interface Props {}
type LeaderboardRow = "24 Hours" | "7 Days" | "30 Days";

function LeaderboardRow(props: Props) {
  const {} = props;
  const days: LeaderboardRow[] = ["24 Hours", "7 Days", "30 Days"];
  const [activeRow, setActiveRow] = useState<LeaderboardRow>("24 Hours");

  return (
    <div className="inline-flex gap-2 items-center rounded-4xl bg-neutral-900 justify-center px-5 py-1   border border-(--color-border)">
      {days.map((day) => {
        const isActive = activeRow === day;
        return (
          <button
            key={day}
            type="button"
            onClick={() => setActiveRow(day)}
            className={[
              "rounded-4xl cursor-pointer px-6 py-2  text-md font-bold transition-colors",
              isActive
                ? "text-(--color-text-primary) bg-(--color-bg-primary)  "
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
