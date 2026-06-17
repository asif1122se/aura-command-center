import React from 'react';
import { clsx } from 'clsx';

export type StatusType =
  | 'trending'
  | 'selling_fast'
  | 'stagnant'
  | 'declining'
  | 'operational'
  | 'degraded'
  | 'critical'
  | 'warning'
  | 'info'
  | 'on_track'
  | 'ahead'
  | 'behind'
  | 'connected'
  | 'disconnected';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const normStatus = status.toLowerCase().replace(/\s+/g, '_');

  let styles = 'bg-muted/15 text-muted border-muted/20';
  let label = status;

  switch (normStatus) {
    case 'trending':
      styles = 'bg-primary/15 text-primary-glow border-primary/30';
      label = 'Trending';
      break;
    case 'selling_fast':
      styles = 'bg-emerald-accent/15 text-emerald-accent border-emerald-accent/30';
      label = 'Selling Fast';
      break;
    case 'stagnant':
      styles = 'bg-amber-accent/15 text-amber-accent border-amber-accent/30';
      label = 'Stagnant';
      break;
    case 'declining':
      styles = 'bg-rose-accent/15 text-rose-accent border-rose-accent/30';
      label = 'Declining';
      break;
    case 'operational':
    case 'on_track':
    case 'connected':
    case 'ahead':
      styles = 'bg-emerald-accent/15 text-emerald-accent border-emerald-accent/30';
      label = normStatus === 'on_track' ? 'On Track' : normStatus === 'ahead' ? 'Ahead' : normStatus === 'connected' ? 'Connected' : 'Operational';
      break;
    case 'degraded':
    case 'warning':
    case 'behind':
      styles = 'bg-amber-accent/15 text-amber-accent border-amber-accent/30';
      label = normStatus === 'behind' ? 'Behind' : normStatus === 'degraded' ? 'Degraded' : 'Warning';
      break;
    case 'critical':
      styles = 'bg-rose-accent/15 text-rose-accent border-rose-accent/30';
      label = 'Critical';
      break;
    case 'info':
      styles = 'bg-secondary/15 text-secondary-glow border-secondary/30';
      label = 'Info';
      break;
    default:
      label = status;
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border tabular-nums',
        styles,
        className
      )}
    >
      {label}
    </span>
  );
};
