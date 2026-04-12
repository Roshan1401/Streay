import { useState } from "react";
import activityData from "./activity";

interface Props {}

function HeatMapCalender(props: Props) {
  const {} = props;
  const [activity] = useState(activityData);
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    console.log(hours / maxHours);
    return hours / maxHours;
  };

  const getColor = (intensity: number) => {
    if (intensity === 0) return "#ffffff10";

    return `rgba(241, 146, 46, ${intensity})`;
  };

  const weeks = getWeeks();

  return (
    <div className="bg-(--color-surface) border border-(--color-border) rounded-xl p-6 my-4">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
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

      <div className="flex gap-2 overflow-x-auto pb-2">
        <div className="grid grid-rows-7 gap-2 shrink-0 min-w-8 text-left text-sm font-semibold text-(--color-text-secondary)">
          {dayLabels.map((label) => (
            <div key={label} className="h-10 flex items-center">
              {label}
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((day, dayIndex) => {
                const intensity = getIntensity(day.hours);
                const color = getColor(intensity);
                return (
                  <div
                    key={dayIndex}
                    className={`w-10 h-10 rounded-md cursor-pointer m-1 border border-(--color-border-secondary) transition-transform hover:scale-125 
                    }`}
                    style={{ backgroundColor: color }}
                    title={day.date ? `${day.date}: ${day.hours} hours` : ""}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeatMapCalender;
