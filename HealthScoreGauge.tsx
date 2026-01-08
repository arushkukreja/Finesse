
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  score: number;
}

const HealthScoreGauge: React.FC<Props> = ({ score }) => {
  const data = [
    { value: score },
    { value: 100 - score },
  ];
  
  const getColor = (s: number) => {
    if (s > 85) return '#10b981'; // Emerald
    if (s > 70) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const color = getColor(score);

  return (
    <div className="relative w-full h-48 flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundColor: color }}></div>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#1e293b" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 text-center">
        <span className="text-4xl font-bold" style={{ color }}>{score}</span>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Security Score</p>
      </div>
    </div>
  );
};

export default HealthScoreGauge;
