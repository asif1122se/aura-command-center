import { ChannelRevenueItem } from './types';

export const channelsData: Record<'today' | '7d' | '30d', ChannelRevenueItem[]> = {
  today: [
    { id: 'shopify', name: 'Shopify Store (One-Time)', revenue: 12958, momPercent: 4.8, vsGoalPercent: 102.5, status: 'ahead' },
    { id: 'recharge', name: 'Recharge (Subscription)', revenue: 33322, momPercent: -3.8, vsGoalPercent: 96.2, status: 'behind' },
    { id: 'klaviyo', name: 'Klaviyo (Email Marketing)', revenue: 14810, momPercent: 8.2, vsGoalPercent: 104.8, status: 'ahead' },
    { id: 'attentive', name: 'Attentive (SMS Marketing)', revenue: 6480, momPercent: 12.4, vsGoalPercent: 109.1, status: 'ahead' },
    { id: 'paid_media', name: 'Paid Media (Meta/Google)', revenue: 22400, momPercent: -5.2, vsGoalPercent: 98.4, status: 'on_track' },
    { id: 'yotpo', name: 'Yotpo Loyalty & Referrals', revenue: 4120, momPercent: 14.6, vsGoalPercent: 110.2, status: 'ahead' },
    { id: 'affiliate', name: 'Affiliate & Creator Program', revenue: 6940, momPercent: 18.2, vsGoalPercent: 112.5, status: 'ahead' },
  ],
  '7d': [
    { id: 'shopify', name: 'Shopify Store (One-Time)', revenue: 89150, momPercent: 3.5, vsGoalPercent: 101.2, status: 'on_track' },
    { id: 'recharge', name: 'Recharge (Subscription)', revenue: 229300, momPercent: -4.1, vsGoalPercent: 95.8, status: 'behind' },
    { id: 'klaviyo', name: 'Klaviyo (Email Marketing)', revenue: 101850, momPercent: 7.6, vsGoalPercent: 103.5, status: 'ahead' },
    { id: 'attentive', name: 'Attentive (SMS Marketing)', revenue: 44600, momPercent: 10.8, vsGoalPercent: 107.4, status: 'ahead' },
    { id: 'paid_media', name: 'Paid Media (Meta/Google)', revenue: 154100, momPercent: -2.4, vsGoalPercent: 99.1, status: 'on_track' },
    { id: 'yotpo', name: 'Yotpo Loyalty & Referrals', revenue: 28350, momPercent: 12.1, vsGoalPercent: 108.9, status: 'ahead' },
    { id: 'affiliate', name: 'Affiliate & Creator Program', revenue: 47780, momPercent: 15.9, vsGoalPercent: 111.4, status: 'ahead' },
  ],
  '30d': [
    { id: 'shopify', name: 'Shopify Store (One-Time)', revenue: 387800, momPercent: 12.4, vsGoalPercent: 103.2, status: 'ahead' },
    { id: 'recharge', name: 'Recharge (Subscription)', revenue: 997100, momPercent: -4.2, vsGoalPercent: 95.9, status: 'behind' },
    { id: 'klaviyo', name: 'Klaviyo (Email Marketing)', revenue: 443200, momPercent: 18.6, vsGoalPercent: 106.8, status: 'ahead' },
    { id: 'attentive', name: 'Attentive (SMS Marketing)', revenue: 194100, momPercent: 24.8, vsGoalPercent: 112.5, status: 'ahead' },
    { id: 'paid_media', name: 'Paid Media (Meta/Google)', revenue: 671800, momPercent: -6.5, vsGoalPercent: 97.2, status: 'on_track' },
    { id: 'yotpo', name: 'Yotpo Loyalty & Referrals', revenue: 123500, momPercent: 28.4, vsGoalPercent: 115.8, status: 'ahead' },
    { id: 'affiliate', name: 'Affiliate & Creator Program', revenue: 207900, momPercent: 32.1, vsGoalPercent: 118.2, status: 'ahead' },
  ],
};
