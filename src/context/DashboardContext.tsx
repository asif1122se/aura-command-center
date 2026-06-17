'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PendingApproval, AlertItem, IntegrationItem } from '../lib/mock/types';
import { initialApprovals } from '../lib/mock/approvals';
import { initialAlerts } from '../lib/mock/alerts';
import { initialIntegrations } from '../lib/mock/integrations';
import { mockReviews, ReviewItem } from '../lib/mock/reviews';
import { toast } from 'sonner';

export type DateRange = 'today' | '7d' | '30d';

interface DashboardContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  approvals: PendingApproval[];
  approveAction: (id: string) => void;
  declineAction: (id: string) => void;
  alerts: AlertItem[];
  resolveAlert: (id: string) => void;
  integrations: IntegrationItem[];
  toggleIntegration: (id: string) => void;
  reviews: ReviewItem[];
  amplifyReview: (id: string, channel: string) => void;
  loading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dateRange, setDateRangeState] = useState<DateRange>('30d');
  const [approvals, setApprovals] = useState<PendingApproval[]>(initialApprovals);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(initialIntegrations);
  const [reviews, setReviews] = useState<ReviewItem[]>(mockReviews);
  const [loading, setLoading] = useState(false);

  // Trigger brief shimmer loading state when changing date filters (simulates async fetching)
  const setDateRange = (range: DateRange) => {
    setLoading(true);
    setDateRangeState(range);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  // Approvals operations
  const approveAction = (id: string) => {
    const item = approvals.find((a) => a.id === id);
    if (item) {
      setApprovals((prev) => prev.filter((a) => a.id !== id));
      toast.success(`Approved: ${item.type}`, {
        description: `Successfully initiated: "${item.action.slice(0, 50)}..."`,
      });
    }
  };

  const declineAction = (id: string) => {
    const item = approvals.find((a) => a.id === id);
    if (item) {
      setApprovals((prev) => prev.filter((a) => a.id !== id));
      toast.error(`Dismissed: ${item.type}`, {
        description: `Declined proposed action.`,
      });
    }
  };

  // Alerts operations
  const resolveAlert = (id: string) => {
    const item = alerts.find((a) => a.id === id);
    if (item) {
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
      );
      toast.success(`Alert Resolved`, {
        description: `Resolved issue on ${item.source}`,
      });
    }
  };

  // Integrations operations
  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.connected;
          if (nextState) {
            toast.success(`${item.name} Connected`, {
              description: `Successfully integrated and synced with Aura.`,
            });
          } else {
            toast.warning(`${item.name} Disconnected`, {
              description: `API link closed.`,
            });
          }
          return { ...item, connected: nextState, lastSync: nextState ? 'Just now' : 'Never' };
        }
        return item;
      })
    );
  };

  // Review amplification operations
  const amplifyReview = (id: string, channel: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'amplified' } : r))
    );
    const review = reviews.find((r) => r.id === id);
    if (review) {
      toast.success(`Review Amplified!`, {
        description: `Placed review by ${review.author} into ${channel} marketing channel.`,
      });
    }
  };

  // Simulate a live alert incoming every 45 seconds to demonstrate dynamic dashboards
  useEffect(() => {
    const timer = setInterval(() => {
      const randomId = `alert_live_${Date.now()}`;
      const liveAlert: AlertItem = {
        id: randomId,
        severity: 'warning',
        source: 'Attentive SMS Gate',
        message: 'SMS click-through rate fell 5% below average for the last batch.',
        recommendation: 'Launch an AB test on the hero coupon image for the next scheduled campaign.',
        timestamp: 'Just now',
        resolved: false,
      };
      
      setAlerts((prev) => [liveAlert, ...prev]);
      toast('Live System Alert Triggered', {
        description: liveAlert.message,
        action: {
          label: 'View',
          onClick: () => {
            window.location.href = '/alerts';
          },
        },
      });
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dateRange,
        setDateRange,
        approvals,
        approveAction,
        declineAction,
        alerts,
        resolveAlert,
        integrations,
        toggleIntegration,
        reviews,
        amplifyReview,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
