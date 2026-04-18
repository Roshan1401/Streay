import { useState } from "react";
import DonutChart from "./DonutChart";
import BarChart2 from "./BarChart";
import LangStateList from "./LangStateList";

type LanguageDatum = { label: string; hours: number };
type ChartType = "Donut" | "Bar";

export default function LangChart() {
  const languages: LanguageDatum[] = [
    { label: "JavaScript", hours: 120 },
    { label: "Python", hours: 80 },
    { label: "TypeScript", hours: 60 },
    { label: "Go", hours: 40 },
    { label: "Rust", hours: 20 },
    { label: "C++", hours: 10 },
    { label: "Java", hours: 5 },
    { label: "Ruby", hours: 2 },
    { label: "PHP", hours: 1 },
    { label: "PHP", hours: 1 },
    { label: "PHP", hours: 1 },
    { label: "PHP", hours: 1 },
    { label: "PHP", hours: 1 },
  ];

  const getColor = (index: number) => {
    const colors = [
      "#f97316",
      "#2563eb",
      "#10b981",
      "#a855f7",
      "#ef4444",
      "#14b8a6",
      "#f59e0b",
      "#64748b",
    ];
    return colors[index % colors.length];
  };

  const charts: ChartType[] = ["Donut", "Bar"];
  const [activeTab, setActiveTab] = useState<ChartType>("Donut");

  const totalHours = languages.reduce((sum, l) => sum + l.hours, 0);

  return (
    <div className="h-auto w-full rounded-xl border border-(--color-border) bg-white dark:bg-[#1b1718]/50">
      <div className="flex flex-col border-b border-(--color-border) p-6 md:flex-row md:items-center md:justify-between md:px-7 md:py-3">
        <div className="flex flex-row justify-between gap-2 md:flex-col md:justify-normal md:gap-0">
          <span className="text-md font-semibold text-(--color-text-primary) xl:text-xl">
            Language Distribution
          </span>
          <span className="text-sm font-medium text-(--color-text-secondary) xl:text-lg">
            Total: {totalHours}h
          </span>
        </div>

        <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 p-1.5 md:gap-0 md:rounded-full">
          {charts.map((chart) => (
            <button
              key={chart}
              type="button"
              onClick={() => setActiveTab(chart)}
              className={[
                "md:text-md flex-1 cursor-pointer rounded-md px-2 py-1 text-sm font-semibold tracking-tight transition-colors md:rounded-full md:px-8 md:py-2.5",
                activeTab === chart
                  ? "bg-white text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-200",
              ].join(" ")}
            >
              {chart}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-10 overflow-hidden px-4 py-6 sm:px-6 sm:py-12 lg:flex-row lg:gap-8">
        <div className="flex min-w-0 flex-1 items-center justify-center pt-10 md:p-0">
          {activeTab === "Donut" ? (
            <DonutChart languages={languages} getColor={getColor} />
          ) : (
            <BarChart2 languages={languages} getColor={getColor} />
          )}
        </div>

        <div className="h-80 w-100 shrink-0 overflow-hidden xl:h-101">
          <LangStateList languages={languages} getColor={getColor} />
        </div>
      </div>
    </div>
  );
}
