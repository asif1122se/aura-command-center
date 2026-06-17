export interface MetricItem {
  label: string;
  value: string | number;
  delta: number;
  direction: 'up' | 'down';
  sparkline: number[];
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
  subscriptionRevenue: number;
  oneTimeRevenue: number;
  cost: number;
  roas: number;
}

export interface ChannelRevenueItem {
  id: string;
  name: string;
  revenue: number;
  momPercent: number;
  vsGoalPercent: number;
  status: 'on_track' | 'ahead' | 'behind';
}

export interface CohortItem {
  cohortName: string;
  retention: number[]; // Index maps to months since signup (Month 0, 1, 2, 3, etc.)
}

export interface AtRiskSubscriber {
  id: string;
  name: string;
  plan: string;
  lifecycleStage: string;
  riskScore: number;
  intervention: string;
}

export interface KlaviyoFlow {
  name: string;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  revenuePerSend: number;
}

export interface ProductItem {
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
  conversionRate: number;
  subAttachRate: number;
  status: 'trending' | 'selling_fast' | 'stagnant' | 'declining';
  reviewsSentiment: number; // 0-100
  sparkline: number[];
  details: {
    trend: number[];
    contactVolume: number;
    recommendation: string;
  };
}

export interface PendingApproval {
  id: string;
  type: 'Paid Media' | 'Email Campaign' | 'SMS Campaign' | 'Affiliate Comms' | 'Website Banner';
  action: string;
  reasoning: string;
  projectedImpact: string;
  confidenceScore: number; // 0-100
}

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  source: string;
  message: string;
  recommendation: string;
  timestamp: string;
  resolved: boolean;
}

export interface AffiliateLeader {
  rank: number;
  name: string;
  revenue: number;
  conversions: number;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
}

export interface ContentPost {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'Pinterest';
  day: number; // 1-30 matching day in calendar
  title: string;
  hooks: string[];
  captionDraft: string;
  hashtags: string[];
  cta: string;
  complianceNote: string;
}

export interface CampaignTimelineItem {
  id: string;
  name: string;
  channel: 'Email' | 'SMS' | 'Social' | 'Paid Ads' | 'Affiliate';
  startDay: number; // Day of the month
  endDay: number;   // Day of the month
  color: string;
  budget: number;
  projectedRevenue: number;
}

export interface IntegrationItem {
  id: string;
  name: string;
  connected: boolean;
  lastSync: string;
}
