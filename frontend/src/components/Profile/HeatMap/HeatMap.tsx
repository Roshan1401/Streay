import HeatMapCalender from "./HeatMapCalender";

interface Props {}

function HeatMap(props: Props) {
  const {} = props;

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 364);

  return (
    <div className="px-10">
      <HeatMapCalender />
    </div>
  );
}

export default HeatMap;
