import { fetchActivity } from "../../../queries/fetchActivity";
import useProfileStore from "../../../store/useProfileStore";
import type { UserActivityStats } from "../../../types/types";
import { formatTime } from "../../../utils/formatTime";
import { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";

function ActivitySection() {
  const userId = useProfileStore((state) => state.profile?.id);
  const [activity, setActivity] = useState<UserActivityStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadActivity = async () => {
      setLoading(true);
      const data = await fetchActivity(userId, "24h");
      setActivity(data);
      setLoading(false);
    };
    const interval = setInterval(loadActivity, 5 * 60 * 1000); // refresh every 5 minute
    loadActivity();
    return () => clearInterval(interval);
  }, [userId]);

  const activityData = [
    {
      title: "Rank",
      value: loading ? "..." : activity?.rank ? `#${activity.rank}` : "—",
      description: "Past 24h leaderboard",
    },
    {
      title: "Streak",
      value: loading ? "..." : activity?.streak ? `${activity.streak}` : "0",
      description: "Current streak",
    },
    {
      title: "Hours",
      value: loading
        ? "..."
        : activity?.timeSpent
          ? activity.timeSpent <= 3600
            ? (activity.timeSpent / 60).toFixed(0) + "m"
            : formatTime(activity.timeSpent)
          : "0h",
      description: "Past 24h",
    },
    {
      title: "Lines",
      value: "—",
      description: "Past 24h",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-center text-xs font-semibold tracking-wider text-(--color-text-secondary) uppercase">
        Today's Activity
      </h3>
      <div className="grid grid-cols-1 gap-3 text-center xl:grid-cols-2">
        {activityData.map((item) => (
          <ActivityCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivitySection;
