import { useState } from "react";
import ProfileStateRow from "./ProfileStateRow";
import TopRepo from "./TopRepo";
import LangChart from "./LangChart";

type Tab = "Lang Chart" | "Top Repo";

interface Props {}

function ProfileState(props: Props) {
  const {} = props;
  const [activeTab, setActiveTab] = useState<Tab>("Lang Chart");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 100);
  };

  return (
    <div className="px-4 xl:px-10">
      <div className="my-8">
        <ProfileStateRow activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div
        className={`my-10 mb-28 flex h-auto w-full items-center justify-center transition-all duration-200 ease-out lg:mb-10 ${
          isTransitioning
            ? "translate-y-2 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {activeTab === "Lang Chart" ? <LangChart /> : <TopRepo />}
      </div>
    </div>
  );
}

export default ProfileState;
