import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
    languages : { label : string, hours : number }[],
    getColor : (index : number) => string
}

export default function DonutChart({ languages, getColor } : DonutChartProps) {
    const data = {
        labels : languages.map((lang) => lang.label),
        datasets : [
          {
          data : languages.map((lang) => lang.hours),
          backgroundColor : languages.map((_, i) => getColor(i))
    
          }
        ]
      }
    
      const options = {
        cutout : "50%",
        plugins : {
          legend : {display : false},
        }
      }

  return (
    <div className="w-full h-full flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
  )
}
