'use client';

import React from 'react';
import { Sparkline } from './Sparkline';
import { useCountUp } from '../lib/hooks/useCountUp';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  delta: number;
  direction: 'up' | 'down';
  sparkline: number[];
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  direction,
  sparkline,
  loading = false,
}) => {
  // Parse numeric values and formatters from string
  const rawString = String(value);
  const isCurrency = rawString.startsWith('$');
  const isPercent = rawString.endsWith('%');
  const isMultiplier = rawString.endsWith('x');

  const cleanNumStr = rawString.replace(/[$,%x]/g, '').replace(/,/g, '');
  const numericTarget = parseFloat(cleanNumStr) || 0;

  // Run the count up animation hook
  const animatedValue = useCountUp(numericTarget, 900, !loading);

  // Re-format the animated number back to its original representation
  const formatValue = (num: number) => {
    if (isCurrency) {
      return `$${Math.round(num).toLocaleString()}`;
    }
    if (isPercent) {
      return `${num.toFixed(2)}%`;
    }
    if (isMultiplier) {
      return `${num.toFixed(2)}x`;
    }
    return Math.round(num).toLocaleString();
  };

  const isPositive = (direction === 'up' && delta >= 0) || (direction === 'down' && delta < 0);
  const deltaColor = isPositive ? 'text-emerald-accent' : 'text-rose-accent';
  const DeltaIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Decorative gradient corner glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all duration-300 pointer-events-none" />

      <div className="space-y-4">
        {/* Card Header Label */}
        <div className="flex justify-between items-start">
          <span className="text-xs uppercase tracking-wider text-muted font-semibold">
            {label}
          </span>
          <span className={clsx('flex items-center text-xs font-semibold', deltaColor)}>
            <DeltaIcon className="w-3.5 h-3.5 mr-0.5" />
            {Math.abs(delta)}%
          </span>
        </div>

        {/* Main Number and Sparkline */}
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-3xl font-semibold font-mono tracking-tight text-foreground text-tabular">
              {formatValue(animatedValue)}
            </span>
            <p className="text-xs text-muted">vs last period</p>
          </div>

          <div className="h-10 flex items-end opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkline
              data={sparkline}
              color={direction === 'up' ? '#14B8A6' : '#6366F1'}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
