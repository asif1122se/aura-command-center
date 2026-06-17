'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GaugeRadialProps {
  value: number; // 0 to 100
  title: string;
  subtitle?: string;
  goalValue: string;
}

export const GaugeRadial: React.FC<GaugeRadialProps> = ({
  value,
  title,
  subtitle,
  goalValue,
}) => {
  const size = 180;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  // Clamped percentage
  const pct = Math.max(0, Math.min(value, 100));
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow Filters */}
        <svg width="0" height="0">
          <defs>
            <filter id="radial-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>

        <svg width={size} height={size} className="transform -rotate-90">
          {/* Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--primary)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            filter="url(#radial-glow)"
          />
        </svg>

        {/* Text indicators in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-semibold font-mono text-foreground tracking-tight tabular-nums">
            {value}%
          </span>
          <span className="text-[10px] uppercase font-semibold text-muted tracking-wider mt-0.5">
            Pacing MTD
          </span>
        </div>
      </div>

      {/* Description below */}
      <div className="text-center mt-4 space-y-1">
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
        {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        <div className="text-xs font-semibold text-primary-glow font-mono mt-2 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
          Goal: {goalValue}
        </div>
      </div>
    </div>
  );
};
