import { useState, useRef, useLayoutEffect } from "react";

type Tab = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type FloatingTabsProps = {
  value: string;
  tabs: Tab[];
  onChange?: (value: string) => void;
  className?: string;
};

export function FloatingTabs({
  tabs,
  value,
  onChange,
  className = "",
}: FloatingTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    updateIndicator();
  }, [value]);

  const updateIndicator = () => {
    if (containerRef.current) {
      const activeButton =
        containerRef.current.querySelector<HTMLButtonElement>(
          `[data-value="${value}"]`,
        );

      if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton;

        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
          opacity: 1,
        });
      }
    }
  };

  const handleTabChange = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative z-20 flex w-fit items-center gap-1 rounded-lg border border-zinc-300 p-0.5 md:p-1 dark:border-zinc-800"
      >
        <div
          className="absolute h-[calc(100%-8px)] rounded-md bg-orange-500 transition-all duration-300 ease-out"
          style={indicatorStyle}
        />

        {tabs.map((tab) => (
          <button
            key={tab.value}
            data-value={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              value === tab.value
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-500"
            }`}
          >
            {tab.icon && tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
