import { useState } from "react";
import ProfileStateRow from "./ProfileStateRow";
import TopRepo from "./TopRepo";

type Tab = "Lang Chart" | "Top Repo";

interface Props {}

function ProfileState(props: Props) {
  const {} = props;
  const [activeTab, setActiveTab] = useState<Tab>("Top Repo");

  return (
    <div className="px-10">
      <div className="my-8">
        <ProfileStateRow activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div>
        {activeTab === "Top Repo" ? (
          <TopRepo repoName="DevSteak" stars={42} language="TypeScript" />
        ) : (
          <div>{/* <LangChart /> */}</div>
        )}
      </div>
    </div>
  );
}

export default ProfileState;
