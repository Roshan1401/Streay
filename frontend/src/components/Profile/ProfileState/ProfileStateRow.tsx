type Tab = "Lang Chart" | "Top Repo";

interface ProfileStateRowProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

function ProfileStateRow({ activeTab, onTabChange }: ProfileStateRowProps) {
  const tabs: Tab[] = ["Lang Chart", "Top Repo"];

  return (
    <div className="flex flex-row items-center rounded-full bg-neutral-900 p-1 border border-neutral-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={[
            "flex-1 rounded-full px-8 py-2.5 text-md font-semibold tracking-tight transition-colors cursor-pointer",
            activeTab === tab
              ? "bg-white text-neutral-900"
              : "text-neutral-400 hover:text-neutral-200",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ProfileStateRow;