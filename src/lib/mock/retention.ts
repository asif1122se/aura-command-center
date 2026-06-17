import { CohortItem, AtRiskSubscriber, KlaviyoFlow } from './types';

// Historical churn trend (last 6 months)
export const churnTrendData = [
  { month: 'Jan', churnRate: 5.2, benchmark: 4.8 },
  { month: 'Feb', churnRate: 5.1, benchmark: 4.8 },
  { month: 'Mar', churnRate: 4.95, benchmark: 4.8 },
  { month: 'Apr', churnRate: 4.88, benchmark: 4.8 },
  { month: 'May', churnRate: 4.75, benchmark: 4.8 },
  { month: 'Jun', churnRate: 4.68, benchmark: 4.8 },
];

// Cancel reasons donut
export const cancelReasonsData = [
  { name: 'Pricing too high', value: 38, color: '#6366F1' },
  { name: 'No noticeable results', value: 24, color: '#14B8A6' },
  { name: 'Too much product / backlog', value: 18, color: '#FBBF24' },
  { name: 'Temporary pause', value: 12, color: '#34D399' },
  { name: 'Other reasons', value: 8, color: '#8B97AC' },
];

// Winback flows performance
export const winbackFlowsData: KlaviyoFlow[] = [
  { name: 'Standard 30-Day Winback', openRate: 48.2, clickRate: 8.5, conversionRate: 4.2, revenuePerSend: 2.84 },
  { name: 'Sub Cancel Specific Flow', openRate: 54.6, clickRate: 11.2, conversionRate: 6.8, revenuePerSend: 4.12 },
  { name: 'Pause-Interval Warmup', openRate: 42.1, clickRate: 6.4, conversionRate: 3.1, revenuePerSend: 1.95 },
  { name: 'VIP Inactive Flow', openRate: 61.8, clickRate: 14.5, conversionRate: 8.9, revenuePerSend: 7.42 },
];

// Cohort Retention Heatmap (Cohorts from Nov to Apr, and their retention rate % from Month 0 to Month 5)
export const cohortRetentionData: CohortItem[] = [
  { cohortName: 'Nov 2025', retention: [100, 88.5, 79.2, 74.5, 71.0, 68.2] },
  { cohortName: 'Dec 2025', retention: [100, 87.2, 78.4, 73.1, 69.8, 67.5] },
  { cohortName: 'Jan 2026', retention: [100, 89.1, 80.8, 75.9, 72.4, 69.9] },
  { cohortName: 'Feb 2026', retention: [100, 90.5, 82.4, 77.8, 74.1, 0] }, // Month 5 not reached yet
  { cohortName: 'Mar 2026', retention: [100, 91.2, 83.9, 79.2, 0, 0] },
  { cohortName: 'Apr 2026', retention: [100, 92.4, 85.1, 0, 0, 0] },
];

// At-risk subscribers list
export const atRiskSubscribersData: AtRiskSubscriber[] = [
  { id: 'sub_1', name: 'Jessica Vance', plan: 'Hormone Balance (Monthly)', lifecycleStage: 'Month 3', riskScore: 88, intervention: 'Offer Pause/Delay instead of cancel' },
  { id: 'sub_2', name: 'Amanda Miller', plan: 'Daily Greens (Monthly)', lifecycleStage: 'Month 1', riskScore: 84, intervention: 'Send "How to Use" guide & recipes' },
  { id: 'sub_3', name: 'Sarah Jenkins', plan: 'Sleep Restore (Monthly)', lifecycleStage: 'Month 6', riskScore: 78, intervention: 'Offer VIP 15% discount for Month 7' },
  { id: 'sub_4', name: 'Chloe Watson', plan: 'Collagen Glow (Bi-Monthly)', lifecycleStage: 'Month 2', riskScore: 75, intervention: 'Send usage check-in feedback survey' },
  { id: 'sub_5', name: 'Emily Davis', plan: 'Gut Reset (Monthly)', lifecycleStage: 'Month 4', riskScore: 72, intervention: 'Promote subscription swap to Daily Greens' },
  { id: 'sub_6', name: 'Rachel Taylor', plan: 'Immunity Boost (Monthly)', lifecycleStage: 'Month 1', riskScore: 68, intervention: 'Trigger automatic loyalty reward points' },
  { id: 'sub_7', name: 'Lauren Brooks', plan: 'Daily Greens (Monthly)', lifecycleStage: 'Month 2', riskScore: 65, intervention: 'Provide customized shaker bottle gift' },
  { id: 'sub_8', name: 'Megan Foster', plan: 'Hormone Balance (Monthly)', lifecycleStage: 'Month 5', riskScore: 62, intervention: 'Send hormonal health video check-in' },
];
