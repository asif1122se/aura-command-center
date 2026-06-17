import { IntegrationItem } from './types';

export const initialIntegrations: IntegrationItem[] = [
  { id: 'shopify', name: 'Shopify Storefront', connected: true, lastSync: '10 mins ago' },
  { id: 'recharge', name: 'Recharge Subscriptions', connected: true, lastSync: '10 mins ago' },
  { id: 'klaviyo', name: 'Klaviyo Email Engine', connected: true, lastSync: '1 hour ago' },
  { id: 'attentive', name: 'Attentive SMS Gate', connected: true, lastSync: '1 hour ago' },
  { id: 'yotpo', name: 'Yotpo Reviews & Loyalty', connected: true, lastSync: '3 hours ago' },
  { id: 'gorgias', name: 'Gorgias Helpdesk', connected: true, lastSync: '30 mins ago' },
  { id: 'meta_ads', name: 'Meta Ads Manager', connected: true, lastSync: '15 mins ago' },
  { id: 'google_ads', name: 'Google Ads Manager', connected: true, lastSync: '15 mins ago' },
  { id: 'tiktok_ads', name: 'TikTok Ads Manager', connected: false, lastSync: 'Never' },
  { id: 'ga4', name: 'Google Analytics 4', connected: true, lastSync: '6 hours ago' },
];

export const brandVoiceBrain = {
  toneDescriptors: ['Empowering', 'Scientific yet Accessible', 'Aesthetic & Clean', 'Candid', 'Warm'],
  wordsWeUse: ['Holistic wellness', 'Bio-aligned formulas', 'Daily ritual', 'Cycle pacing', 'Adrenal nourishing'],
  wordsWeNeverUse: ['Quick fix', 'Instant weight loss', 'Skinny tea', 'Miracle cure', 'Guilt-free'],
  audienceDemographics: 'Primary: Women aged 25-44, interested in holistic endocrinology, clean ingredient profiles, aesthetic shelfies, and daily wellness rituals.',
};
