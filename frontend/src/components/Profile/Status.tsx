import React from "react";

interface StatusItemProps {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
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

function FlameIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 shrink-0 text-orange-500 xl:h-5 xl:w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.75 8.75 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 shrink-0 text-blue-500 xl:h-5 xl:w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 shrink-0 text-purple-500 lg:hidden xl:h-5 xl:w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 shrink-0 text-emerald-500 xl:h-5 xl:w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  );
}

function Status() {
  return (
    <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5 xl:px-10">
      <StatusItem label="Steak" value={4} unit="days" icon={<FlameIcon />} />
      <StatusItem
        label="Total Hours"
        value={64}
        unit="hours"
        icon={<ClockIcon />}
      />
      <StatusItem
        label="Languages"
        value={15}
        unit="languages"
        icon={<CodeIcon />}
      />
      <StatusItem
        label="Daily Avg"
        value={1}
        unit="hours"
        icon={<ChartIcon />}
      />
    </div>
  );
}

export default Status;
