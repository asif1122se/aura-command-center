import React from 'react';
import { clsx } from 'clsx';

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Shimmer: React.FC<ShimmerProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-muted/20 dark:bg-muted/10',
        className
      )}
      {...props}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <Shimmer className="h-4 w-2/3" />
      <Shimmer className="h-8 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Shimmer className="h-3 w-1/3" />
        <Shimmer className="h-6 w-1/4 rounded-full" />
      </div>
    </div>
  );
};
