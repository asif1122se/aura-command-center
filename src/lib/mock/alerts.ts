import { AlertItem } from './types';

export const systemHealthStatus = [
  { id: 'shopify', name: 'Shopify Storefront', status: 'operational' },
  { id: 'recharge', name: 'Recharge Subscriptions', status: 'operational' },
  { id: 'klaviyo', name: 'Klaviyo Email Engine', status: 'operational' },
  { id: 'attentive', name: 'Attentive SMS Gate', status: 'operational' },
  { id: 'yotpo', name: 'Yotpo Reviews & Loyalty', status: 'operational' },
  { id: 'gorgias', name: 'Gorgias Helpdesk', status: 'operational' },
  { id: 'meta_ads', name: 'Meta Ads Manager', status: 'operational' },
  { id: 'google_ads', name: 'Google Ads Manager', status: 'operational' },
  { id: 'tiktok_ads', name: 'TikTok Ads Manager', status: 'degraded' }, // degraded alert!
  { id: 'ga4', name: 'Google Analytics 4', status: 'operational' },
];

export const initialAlerts: AlertItem[] = [
  {
    id: 'alert_1',
    severity: 'critical',
    source: 'Recharge Subscriptions',
    message: 'Subscription skips for Sleep Restore Gummies rose 24% yesterday.',
    recommendation: 'Verify the product reviews and Gorgias support tickets to isolate potential customer dissatisfaction trends.',
    timestamp: '2 hours ago',
    resolved: false,
  },
  {
    id: 'alert_2',
    severity: 'warning',
    source: 'TikTok Ads Manager',
    message: 'Cost Per Acquisition (CPA) on TikTok increased by 42% over the last 48 hours.',
    recommendation: 'Temporarily scale back budget on the "Greens-Taste Test" ad group and reallocate to the higher-converting Meta Lookalikes.',
    timestamp: '4 hours ago',
    resolved: false,
  },
  {
    id: 'alert_3',
    severity: 'info',
    source: 'Klaviyo Email Engine',
    message: 'Monthly Win-back Flow open rate is 4.2% above the DTC supplement industry average.',
    recommendation: 'Analyze top-performing copy structures and migrate successful subject lines to the Browse Abandonment flows.',
    timestamp: '6 hours ago',
    resolved: false,
  },
  {
    id: 'alert_4',
    severity: 'warning',
    source: 'Gorgias Helpdesk',
    message: 'Support tickets regarding "Sleep Restore Gummy flavor" increased 3.5x.',
    recommendation: 'Flag batch 082 with production and send a proactive newsletter explanation to recurring subscribers.',
    timestamp: '1 day ago',
    resolved: false,
  },
  {
    id: 'alert_5',
    severity: 'critical',
    source: 'Meta Ads Manager',
    message: 'Payment method declined on primary ad account (Acct ID *8912).',
    recommendation: 'Update primary card credentials immediately or verify spending limits to avoid campaign delivery pause.',
    timestamp: '1 day ago',
    resolved: true,
  },
  {
    id: 'alert_6',
    severity: 'info',
    source: 'Affiliate Program',
    message: 'Creator Brooke Thorne generated $4,200 in e-commerce sales in a single day.',
    recommendation: 'Highlight this creator in the weekly affiliate newsletter and share her video hooks with other creators.',
    timestamp: '2 days ago',
    resolved: false,
  }
];
