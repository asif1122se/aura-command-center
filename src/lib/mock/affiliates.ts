import { AffiliateLeader } from './types';

export const affiliatesLeaderboard: AffiliateLeader[] = [
  { rank: 1, name: 'Brooke Thorne (TikTok)', revenue: 42100, conversions: 620, tier: 'Diamond' },
  { rank: 2, name: 'Dr. Andrea Patel (IG/MD)', revenue: 38400, conversions: 480, tier: 'Diamond' },
  { rank: 3, name: 'Katelyn Wellness (Blog)', revenue: 29800, conversions: 410, tier: 'Platinum' },
  { rank: 4, name: 'Aura Crew Fanpage (TikTok)', revenue: 24600, conversions: 380, tier: 'Platinum' },
  { rank: 5, name: 'Jenna Clean Eating (Pinterest)', revenue: 18900, conversions: 290, tier: 'Gold' },
  { rank: 6, name: 'Coach Sarah Miller', revenue: 15400, conversions: 240, tier: 'Gold' },
  { rank: 7, name: 'Healthy Habits Co.', revenue: 12100, conversions: 185, tier: 'Silver' },
  { rank: 8, name: 'FitMom Amanda', revenue: 9800, conversions: 140, tier: 'Silver' },
  { rank: 9, name: 'Chelsea Glow Wellness', revenue: 8400, conversions: 120, tier: 'Silver' },
  { rank: 10, name: 'Daily Detox Diaries', revenue: 7600, conversions: 110, tier: 'Silver' },
];

export const activeChallenge = {
  title: 'June Creator Launch Rally',
  description: 'Reach 50 conversions in June to unlock a custom Aura product bundle + 5% commission bump.',
  progress: 34,
  goal: 50,
  daysLeft: 14,
  reward: '$500 Bundle + 5% Bump',
};

export const affiliatesSegments = [
  { name: 'Top Earners (> $10k/mo)', count: 6, action: 'Ship custom product boxes & schedule 1-on-1 strategy sessions.' },
  { name: 'Rising Stars ($2.5k - $10k/mo)', count: 18, action: 'Offer a 2.5% commission bump for the next 30 days to boost volume.' },
  { name: 'Dormant Creators (< $1k/mo)', count: 42, action: 'Send automated win-back emails with new hooks and free sample vouchers.' },
];
