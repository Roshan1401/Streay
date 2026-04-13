import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
    languages : { label : string, hours : number }[],
    getColor : (index : number) => string
    animKey?: string
}

export default function DonutChart({ languages, getColor, animKey } : DonutChartProps) {
    const data = {
        labels : languages.map((lang) => lang.label),
        datasets : [
          {
          data : languages.map((lang) => lang.hours),
          backgroundColor : languages.map((_, i) => getColor(i))
          }
        ]
      }
    
      const options: ChartOptions<"doughnut"> = {
        cutout : "55%",
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 800,
          easing: "easeOutQuart",
        },
        plugins : {
          legend : {display : false},
        }
      }

  return (
    <div className="w-full h-full flex items-center justify-center">
        <Doughnut key={animKey} data={data} options={options} />
      </div>
  )
}
