import ActivityCard from "./ActivityCard";

function ActivitySection() {
  const activityData = [
    {
      title: "Rank",
      value: "—",
      description: "Past 24h leaderboard",
    },
    {
      title: "Streak",
      value: "0 days",
      description: "Current streak",
    },
    {
      title: "Hours",
      value: "0m",
      description: "Past 24h",
    },
    {
      title: "Lines",
      value: 0,
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
