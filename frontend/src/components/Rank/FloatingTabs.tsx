import { useState, useRef, useLayoutEffect } from "react";

type Tab = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type FloatingTabsProps = {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function FloatingTabs({
  tabs,
  defaultValue,
  onChange,
  className = "",
}: FloatingTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeTab]);

  const updateIndicator = () => {
    if (containerRef.current) {
      const activeButton =
        containerRef.current.querySelector<HTMLButtonElement>(
          `[data-value="${activeTab}"]`,
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
    setActiveTab(value);
    onChange?.(value);
  };

  const activeContent = tabs.find((tab) => tab.value === activeTab);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative flex w-fit items-center gap-1 rounded-lg border border-zinc-800/50 p-1 dark:border-zinc-800"
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
              activeTab === tab.value
                ? "text-white"
                : "text-zinc-300 hover:text-zinc-500"
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
