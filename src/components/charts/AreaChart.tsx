'use client';

import React, { useEffect, useState } from 'react';
import {
  AreaChart as ReChartsArea,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Shimmer } from '../Shimmer';

interface AreaChartProps {
  data: any[];
  xKey: string;
  dataKeys: string[];
  colors?: string[];
  formatYAxis?: (val: number) => string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  xKey,
  dataKeys,
  colors = ['#14B8A6', '#6366F1'],
  formatYAxis = (val) => val.toLocaleString(),
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Shimmer className="w-full h-[260px] rounded-xl" />;
  }

  // Custom tooltips styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip text-xs space-y-1">
          <p className="font-semibold">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={p.name} className="flex justify-between items-center space-x-6">
              <span className="flex items-center text-muted">
                <span
                  className="w-2.5 h-2.5 rounded-sm mr-1.5 inline-block"
                  style={{ backgroundColor: p.color }}
                />
                {p.name}:
              </span>
              <span className="font-mono font-semibold text-foreground">
                {formatYAxis(p.value)}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <ReChartsArea
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {dataKeys.map((key, idx) => (
              <linearGradient
                key={key}
                id={`grad-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colors[idx % colors.length]} stopOpacity={0.2} />
                <stop offset="95%" stopColor={colors[idx % colors.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            stroke="var(--muted)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="var(--muted)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(20, 184, 166, 0.1)', strokeWidth: 1 }} />
          {dataKeys.map((key, idx) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#grad-${key})`}
              isAnimationActive={true}
              animationDuration={900}
            />
          ))}
        </ReChartsArea>
      </ResponsiveContainer>
    </div>
  );
};
export default AreaChart;
