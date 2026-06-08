import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartProps {
  languages: { language: string; hours: number }[];
  getColor: (index: number) => string;
}

export default function BarChart2({ languages, getColor }: BarChartProps) {
  return (
    <div className="flex h-70 w-60 items-center justify-center md:h-90 md:w-80 lg:h-70 lg:w-50 xl:h-90 xl:w-70">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={languages}>
          <Tooltip />
          <Bar dataKey="hours" radius={[10, 10, 0, 0]} barSize={25}>
            {languages.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
