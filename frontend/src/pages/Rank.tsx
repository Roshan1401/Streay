import { useState } from "react";
import { FloatingTabs } from "../components/Rank/FloatingTabs";

function Rank() {
  const [rankType, setRankType] = useState("global");
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10">
      <div className="flex justify-center gap-4">
        <FloatingTabs
          tabs={[
            { value: "global", label: "Global" },
            { value: "region", label: "Region" },
          ]}
          defaultValue="global"
          onChange={(value) => setRankType(value)}
        />
      </div>
    </div>
  );
}

export default Rank;
