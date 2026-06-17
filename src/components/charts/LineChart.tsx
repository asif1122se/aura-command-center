'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart as ReChartsLine,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Shimmer } from '../Shimmer';

interface LineChartProps {
  data: any[];
  xKey: string;
  dataKeys: string[];
  colors?: string[];
  dashTypes?: boolean[]; // Should the line be dashed? (e.g. for benchmarks)
  formatYAxis?: (val: number) => string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  dataKeys,
  colors = ['#14B8A6', '#6366F1'],
  dashTypes = [false, true],
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
                  className="w-2.5 h-0.5 mr-1.5 inline-block"
                  style={{ borderBottom: `2px ${p.strokeDasharray ? 'dashed' : 'solid'} ${p.color}` }}
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
        <ReChartsLine
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
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.05)' }} />
          {dataKeys.map((key, idx) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              strokeDasharray={dashTypes[idx % dashTypes.length] ? '5 5' : undefined}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              isAnimationActive={true}
              animationDuration={900}
            />
          ))}
        </ReChartsLine>
      </ResponsiveContainer>
    </div>
  );
};
export default LineChart;
