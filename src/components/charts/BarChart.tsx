'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart as ReChartsBar,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Shimmer } from '../Shimmer';

interface BarChartProps {
  data: any[];
  xKey: string;
  dataKeys: string[];
  colors?: string[];
  stacked?: boolean;
  formatYAxis?: (val: number) => string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  dataKeys,
  colors = ['#14B8A6', '#6366F1', '#FBBF24'],
  stacked = false,
  formatYAxis = (val) => val.toLocaleString(),
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Shimmer className="w-full h-[260px] rounded-xl" />;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip text-xs space-y-1">
          <p className="font-semibold">{label}</p>
          {payload.map((p: any) => (
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
        <ReChartsBar
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
          {dataKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={stacked ? 'stack' : undefined}
              fill={colors[idx % colors.length]}
              radius={
                stacked
                  ? idx === dataKeys.length - 1
                    ? [4, 4, 0, 0] // round only top of stacks
                    : [0, 0, 0, 0]
                  : [4, 4, 0, 0]
              }
              isAnimationActive={true}
              animationDuration={900}
            />
          ))}
        </ReChartsBar>
      </ResponsiveContainer>
    </div>
  );
};
export default BarChart;
