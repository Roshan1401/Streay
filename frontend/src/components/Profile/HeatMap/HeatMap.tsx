import HeatMapCalender from "./HeatMapCalender";
import activity from "./activity";
import type { ActivityData } from "./activity";

interface Props {}

function HeatMap(props: Props) {
  const {} = props;
  const activityData = activity as ActivityData[];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 364);

  return (
    <HeatMapCalender
      startDate={startDate.toISOString().split("T")[0]}
      endDate={endDate.toISOString().split("T")[0]}
      data={activityData}
    />
  );
}

export default HeatMap;
