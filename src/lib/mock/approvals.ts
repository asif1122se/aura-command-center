import { PendingApproval } from './types';

export const initialApprovals: PendingApproval[] = [
  {
    id: 'app_1',
    type: 'Paid Media',
    action: 'Reallocate $1,500 daily budget from TikTok "Superfoods Main" to Meta Ads "Hormone Retargeting".',
    reasoning: 'TikTok CPA has spiked 42% over the last 48 hours ($42 vs $29 benchmark) while Meta ROAS remains highly stable at 3.1x.',
    projectedImpact: '+8.4% blended conversion efficiency and estimated savings of $3,200/week in wasted ad spend.',
    confidenceScore: 92,
  },
  {
    id: 'app_2',
    type: 'Email Campaign',
    action: 'Queue "Summer Debloat Guide" cross-sell newsletter to 24,000 one-time Daily Greens buyers.',
    reasoning: 'Customer cohorts who purchased Daily Greens in April are showing a high propensity (4.8x) to purchase Gut Reset within 60 days.',
    projectedImpact: 'Estimated $18,500 in incremental revenue and 150+ new subscription signups.',
    confidenceScore: 89,
  },
  {
    id: 'app_3',
    type: 'SMS Campaign',
    action: 'Trigger VIP cart abandonment SMS offering a free shaker cup instead of a percentage discount.',
    reasoning: 'Historical tests show that premium physical gifts out-perform 15% discount codes for VIP segments, retaining a 68% margin.',
    projectedImpact: 'Recover 35% more abandoned carts while saving $1,400 in direct margins.',
    confidenceScore: 85,
  },
  {
    id: 'app_4',
    type: 'Affiliate Comms',
    action: 'Send automated TikTok creator outreach email inviting 25 rising creators to the Double-Commission Rally.',
    reasoning: 'Active challenges are currently pacing 15% behind goal. Launching outreach will boost participation and aggregate video views.',
    projectedImpact: 'Increase active affiliate conversions by 22% during the second half of the month.',
    confidenceScore: 94,
  },
  {
    id: 'app_5',
    type: 'Website Banner',
    action: 'Update home page hero banner to promote "Sleep Restore Eco-Refill" subscription option.',
    reasoning: 'Organic traffic for search terms around "sustainable supplements" increased 18% month-over-month.',
    projectedImpact: 'Estimated +4% conversion rate increase for landing traffic and improved LTV.',
    confidenceScore: 78,
  }
];
