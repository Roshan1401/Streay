import { useState } from "react";
import { FloatingTabs } from "../components/Rank/FloatingTabs";
import { Globe, MapPin } from "lucide-react";

function Rank() {
  const [rankType, setRankType] = useState("global");
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10">
      <div className="flex justify-center gap-4">
        <FloatingTabs
          tabs={[
            { value: "global", label: "Global", icon: <Globe /> },
            { value: "region", label: "Region", icon: <MapPin /> },
          ]}
          onChange={(value) => setRankType(value)}
          defaultValue="global"
          className=""
        />
      </div>
    </div>
  );
}

export default Rank;
