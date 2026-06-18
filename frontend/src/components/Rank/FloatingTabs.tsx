import { useState, useRef, useLayoutEffect } from "react";

type Tab = {
  value: string;
  label: string;
  content?: React.ReactNode;
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

  const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative flex w-fit items-center gap-1 rounded-lg border border-zinc-800/50 bg-zinc-900/40 p-1"
      >
        <div
          className="absolute h-[calc(100%-8px)] rounded-md bg-zinc-800 transition-all duration-300 ease-out"
          style={indicatorStyle}
        />

        {tabs.map((tab) => (
          <button
            key={tab.value}
            data-value={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`relative z-10 cursor-pointer rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.value
                ? "text-zinc-200"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeContent && (
        <div className="animate-in fade-in-0 mt-4 duration-200">
          {activeContent}
        </div>
      )}
    </div>
  );
}
