'use client';

import React, { useEffect, useState } from 'react';
import {
  PieChart as ReChartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Shimmer } from '../Shimmer';

interface DonutData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutData[];
  formatValue?: (val: number) => string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  formatValue = (val) => `${val}%`,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Shimmer className="w-full h-[260px] rounded-xl" />;
  }

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      const pct = total === 0 ? 0 : ((p.value / total) * 100).toFixed(1);
      return (
        <div className="chart-tooltip text-xs space-y-1">
          <p className="font-semibold flex items-center">
            <span
              className="w-2.5 h-2.5 rounded-full mr-1.5 inline-block"
              style={{ backgroundColor: p.payload.color }}
            />
            {p.name}
          </p>
          <p className="flex justify-between items-center space-x-6">
            <span className="text-muted">Value:</span>
            <span className="font-mono font-semibold text-foreground">
              {formatValue(p.value)}
            </span>
          </p>
          <p className="flex justify-between items-center space-x-6">
            <span className="text-muted">Share:</span>
            <span className="font-mono font-semibold text-foreground">{pct}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center h-full min-h-[220px]">
      
      {/* Chart Canvas */}
      <div className="w-full h-[220px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <ReChartsPie>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={900}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </ReChartsPie>
        </ResponsiveContainer>
      </div>

      {/* Structured Legend */}
      <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
        {data.map((item) => {
          const sharePct = total === 0 ? 0 : Math.round((item.value / total) * 100);
          return (
            <div
              key={item.name}
              className="flex justify-between items-center text-xs text-muted hover:text-foreground transition-colors"
            >
              <div className="flex items-center space-x-2 truncate mr-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate font-medium">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2 font-mono font-semibold text-foreground flex-shrink-0 text-tabular">
                <span>{formatValue(item.value)}</span>
                <span className="text-muted font-normal text-[10px]">({sharePct}%)</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
export default DonutChart;
