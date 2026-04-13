import React from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartProps {
  languages: { label: string; hours: number }[];
  getColor: (index: number) => string;
}

export default function BarChart2({ languages, getColor }: BarChartProps) {
  return (
    <div className="w-full h-full">
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
