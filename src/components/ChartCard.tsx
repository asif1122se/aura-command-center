'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  headerActions,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      className="glass-card rounded-2xl p-6 flex flex-col h-full relative"
    >
      {/* Header section */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-foreground tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted">
              {subtitle}
            </p>
          )}
        </div>
        {headerActions && (
          <div className="flex items-center space-x-2">
            {headerActions}
          </div>
        )}
      </div>

      {/* Chart body */}
      <div className="flex-1 min-h-[260px] relative w-full">
        {children}
      </div>
    </motion.div>
  );
};
