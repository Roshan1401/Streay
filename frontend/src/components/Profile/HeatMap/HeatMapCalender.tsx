import { useEffect, useRef, useState, useMemo } from "react";
import ReactDOM from "react-dom";

interface TooltipState {
  date: string;
  hours: number;
  x: number;
  y: number;
}

function HeatMapCalender({
  heatmapData,
}: {
  heatmapData: { date: string; hours: number }[];
}) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const element = gridScrollRef.current;
    if (!element) return;
    element.scrollLeft = element.scrollWidth;
  }, [heatmapData]);

  const handleMouseEnter = (
    e: React.MouseEvent,
    day: { date: string; hours: number },
  ) => {
    if (!day.date) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      date: day.date,
      hours: day.hours,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  const getFilledActivity = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);

    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const activityMap = new Map(
      heatmapData.map((day) => [day.date, day.hours]),
    );

    const result: { date: string; hours: number }[] = [];
    const current = new Date(startDate);

    while (current <= today) {
      const dateStr = current.toISOString().split("T")[0];
      result.push({
        date: dateStr,
        hours: activityMap.get(dateStr) ?? 0,
      });
      current.setDate(current.getDate() + 1);
    }
    return result;
  };

  const activity = useMemo(getFilledActivity, [heatmapData]);

  const getWeeks = () => {
    const weeks: (typeof activity)[] = [];
    let currentWeek: typeof activity = [];

    activity.forEach((day, index) => {
      currentWeek.push(day);

      if (currentWeek.length === 7 || index === activity.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeks;
  };

  const maxHours = Math.max(...activity.map((day) => day.hours));

  const getIntensity = (hours: number) => {
    if (hours <= 0) return 0;
    return hours / maxHours;
  };

  const getColor = (intensity: number) => {
    if (intensity === 0) return "#ffffff10";
    return `rgba(241, 146, 46, ${intensity})`;
  };

  const weeks = getWeeks();

  return (
    <>
      <div className="px-4 xl:px-10">
        <div className="my-4 rounded-xl border border-(--color-border) bg-(--color-surface)">
          <div className="flex flex-col items-center justify-between gap-3 p-6 md:flex-row">
            <h3 className="m-0 text-base font-semibold text-(--color-text-primary)">
              Contribution Activity
            </h3>
            <div className="flex items-center gap-1 text-xs text-(--color-text-secondary)">
              <span className="mx-1">Less</span>
              <div className="h-2 w-2 rounded-sm bg-[#f3f4f6] md:h-3 md:w-3 dark:bg-[#1f2937]"></div>
              <div className="h-2 w-2 rounded-sm bg-[#fed7aa] md:h-3 md:w-3 dark:bg-[#7c2d12]"></div>
              <div className="h-2 w-2 rounded-sm bg-[#fdba74] md:h-3 md:w-3 dark:bg-[#9a3412]"></div>
              <div className="h-2 w-2 rounded-sm bg-[#fb923c] md:h-3 md:w-3 dark:bg-[#c2410c]"></div>
              <div className="h-2 w-2 rounded-sm bg-[#f97316] md:h-3 md:w-3 dark:bg-[#ea580c]"></div>
              <span className="mx-1">More</span>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="flex items-start">
              <div className="mt-1.5 mr-3 flex flex-col gap-2">
                {dayLabels.map((label) => (
                  <div
                    key={label}
                    className="flex h-8 items-center text-xs font-semibold text-(--color-text-secondary)"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div
                ref={gridScrollRef}
                className="scrollbar-hide flex scroll-p-2.5 flex-row gap-1 overflow-x-auto px-1 py-1"
              >
                <div className="grid auto-cols-max grid-flow-col gap-2">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => {
                        const intensity = getIntensity(day.hours);
                        const color = getColor(intensity);
                        return (
                          <div
                            key={dayIndex}
                            className="m-1 h-7 w-7 cursor-pointer rounded-md border border-(--color-border-secondary) transition-transform hover:scale-110"
                            style={{ backgroundColor: color }}
                            onMouseEnter={(e) => handleMouseEnter(e, day)}
                            onMouseLeave={handleMouseLeave}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal tooltip — renders into document.body */}
      {tooltip &&
        ReactDOM.createPortal(
          <div
            className="pointer-events-none fixed z-9999 flex -translate-x-1/2 -translate-y-full flex-col rounded-md border border-(--color-border-secondary) bg-(--color-bg-primary) px-3 py-2 text-sm font-semibold whitespace-nowrap text-(--color-text-primary) shadow-lg"
            style={{
              left: tooltip.x,
              top: tooltip.y - 8,
            }}
          >
            <span>{tooltip.date}</span>
            <span>{tooltip.hours.toFixed(1)} hours</span>
          </div>,
          document.body,
        )}
    </>
  );
}

export default HeatMapCalender;
