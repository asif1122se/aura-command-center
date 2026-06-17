import { CampaignTimelineItem } from './types';

export const campaignTimelineData: CampaignTimelineItem[] = [
  {
    id: 'camp_1',
    name: 'Summer Debloat Bundle Launch',
    channel: 'Paid Ads',
    startDay: 1,
    endDay: 15,
    color: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    budget: 45000,
    projectedRevenue: 120000,
  },
  {
    id: 'camp_2',
    name: 'VIP Early Access - Refills',
    channel: 'Email',
    startDay: 4,
    endDay: 8,
    color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    budget: 5000,
    projectedRevenue: 65000,
  },
  {
    id: 'camp_3',
    name: 'TikTok Creator Seeding - Cortisol Reset',
    channel: 'Social',
    startDay: 10,
    endDay: 28,
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    budget: 15000,
    projectedRevenue: 48000,
  },
  {
    id: 'camp_4',
    name: 'Father\'s Day Partner Gift Campaign',
    channel: 'SMS',
    startDay: 12,
    endDay: 16,
    color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    budget: 8000,
    projectedRevenue: 32000,
  },
  {
    id: 'camp_5',
    name: 'Affiliate Double-Commission Flash Rally',
    channel: 'Affiliate',
    startDay: 18,
    endDay: 24,
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    budget: 12000,
    projectedRevenue: 55000,
  },
  {
    id: 'camp_6',
    name: 'End-of-Month Subscriber Restock Push',
    channel: 'Email',
    startDay: 25,
    endDay: 30,
    color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    budget: 6000,
    projectedRevenue: 80000,
  },
];

export const campaignMixData = [
  { name: 'Paid Ads', value: 45, color: '#14B8A6' },
  { name: 'Email Marketing', value: 25, color: '#6366F1' },
  { name: 'SMS Marketing', value: 12, color: '#FB7185' },
  { name: 'Affiliate Program', value: 10, color: '#34D399' },
  { name: 'Social & Organic', value: 8, color: '#FBBF24' },
];

export const campaignPlanSummary = {
  activeCount: 6,
  totalBudget: 91000,
  projectedReturn: 400000,
  blendedRoiGoal: 4.4,
  retentionFocus: 'This month allocates 45% of communications to repeat buyers and active subscribers, targeting a 12% increase in average subscriber order value through accessories and sample add-ons.'
};
