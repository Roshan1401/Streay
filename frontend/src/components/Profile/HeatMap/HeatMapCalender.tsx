import { useEffect, useRef, useState } from "react";
import activityData from "./activity";

interface Props {}

function HeatMapCalender(props: Props) {
  const {} = props;
  const [activity] = useState(activityData);
  const gridScrollRef = useRef<HTMLDivElement>(null);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const element = gridScrollRef.current;
    if (!element) return;

    element.scrollLeft = element.scrollWidth;
  }, []);

  const getWeeks = () => {
    const weeks: (typeof activity)[] = [];
    let currentWeek: typeof activity = [];

    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365);

    const filteredActivity = activity.filter((day) => {
      const date = new Date(day.date);
      return date >= startDate && date <= today;
    });

    if (filteredActivity.length === 0) return weeks;

    const firstDate = new Date(filteredActivity[0].date);
    const startDayOfWeek = firstDate.getDay();

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push({ date: "", hours: -1 });
    }

    filteredActivity.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      currentWeek.push(day);

      if (dayOfWeek === 6 || index === filteredActivity.length - 1) {
        while (currentWeek.length < 7) {
          currentWeek.push({ date: "", hours: -1 });
        }
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

    return `rgba(241, 146, 46, ${intensity}) dark:rgba(241, 146, 46, ${intensity})`;
  };

  const weeks = getWeeks();

  return (
    <div className="bg-(--color-surface)  border border-(--color-border) rounded-xl  my-4">
      <div className="flex justify-between items-center p-6 flex-wrap gap-3">
        <h3 className="text-base font-semibold text-(--color-text-primary) m-0">
          Contribution Activity
        </h3>
        <div className="flex items-center gap-1 text-xs text-(--color-text-secondary)">
          <span className="mx-1">Less</span>
          <div className="w-3 h-3 rounded-sm bg-[#f3f4f6] dark:bg-[#1f2937]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#fed7aa] dark:bg-[#7c2d12]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#fdba74] dark:bg-[#9a3412]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#fb923c] dark:bg-[#c2410c]"></div>
          <div className="w-3 h-3 rounded-sm bg-[#f97316] dark:bg-[#ea580c]"></div>
          <span className="mx-1">More</span>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex items-start ">
          <div className="felx flex-col gap-2 mr-3">
            {dayLabels.map((label) => (
              <div
                key={label}
                className="h-13 flex items-center text-sm text-(--color-text-secondary) font-semibold"
              >
                {label}
              </div>
            ))}
          </div>

          <div
            ref={gridScrollRef}
            className="flex gap-1 py-1 flex-row overflow-hidden scroll-p-2.5 px-1"
          >
            <div className="grid grid-flow-col auto-cols-max gap-2 ">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col  gap-1">
                  {week.map((day, dayIndex) => {
                    const intensity = getIntensity(day.hours);
                    const color = getColor(intensity);
                    return (
                      <div className="relative group">
                        <div
                          key={dayIndex}
                          className="w-10 h-10 rounded-md cursor-pointer m-1 border border-(--color-border-secondary) transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                        <div className="hidden group-hover:flex group-hover:flex-col absolute z-1000 top-5 -left-26 border border-(--color-border-secondary) bg-(--color-bg-primary) text-(--color-text-primary) text-ms rounded-md p-2 whitespace-nowrap">
                          <span>{day.date}</span>
                          <span>{day.hours} hour</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeatMapCalender;
