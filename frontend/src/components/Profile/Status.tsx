import type { ReactNode } from "react";
import {
  FlameIcon,
  ClockIcon,
  CodeIcon,
  ChartIcon,
} from "../../assets/Icons";
import type { PublicProfileStats } from "../../types/types";

interface StatusItemProps {
  label: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
}

function StatusItem({ label, value, unit, icon }: StatusItemProps) {
  return (
    <div className="flex justify-between rounded-xl border border-(--color-border-secondary) bg-white p-4 xl:px-6 xl:py-5 dark:bg-[#1b1718]/50">
      <div className="flex flex-col gap-1">
        <p className="lg:text-md text-sm text-(--color-text-secondary) xl:text-xl">
          {label}
        </p>
        <div className="flex gap-1.5">
          <span className="text-2xl font-bold text-(--color-text-primary) lg:text-xl xl:text-3xl">
            {value}
          </span>
          <span className="flex items-end text-sm text-(--color-text-secondary) lg:text-sm xl:text-xl">
            {unit}
          </span>
        </div>
      </div>
      {icon}
    </div>
  );
}

function  Status({stats}: {stats: PublicProfileStats | null}) {
  return (
    <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5 xl:px-10">
      <StatusItem
        label="Streak"
        value={stats?.current_streak || 0}
        unit="days"
        icon={
          <FlameIcon className="h-4 w-4 shrink-0 text-orange-500 xl:h-5 xl:w-5" />
        }
      />
      <StatusItem
        label="Total Hours"
        value={stats?.total_hours || 0}
        unit="hours"
        icon={
          <ClockIcon className="h-4 w-4 shrink-0 text-blue-500 xl:h-5 xl:w-5" />
        }
      />
      <StatusItem
        label="Languages"
        value={stats?.total_languages || 0}
        unit="languages"
        icon={
          <CodeIcon className="h-4 w-4 shrink-0 text-purple-500 xl:h-5 xl:w-5" />
        }
      />
      <StatusItem
        label="Daily Avg"
        value={stats?.avg_hours.toFixed(1) || 0}
        unit="hours"
        icon={
          <ChartIcon className="h-4 w-4 shrink-0 text-emerald-500 xl:h-5 xl:w-5" />
        }
      />
    </div>
  );
}

export default Status;
