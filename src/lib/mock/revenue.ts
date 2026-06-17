import { RevenueTrendItem } from './types';

// Generate 30 days of high-quality mock trend data
const generate30DaysData = (): RevenueTrendItem[] => {
  const data: RevenueTrendItem[] = [];
  const baseDate = new Date(2026, 5, 1); // June 1, 2026
  
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i);
    const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    
    // Create organic ups and downs, upward trend
    const dayFactor = 1 + (i * 0.008) + Math.sin(i * 0.8) * 0.12;
    const baseRevenue = 40000 * dayFactor;
    const subscriptionRevenue = baseRevenue * 0.72; // ~72% subscriptions
    const oneTimeRevenue = baseRevenue * 0.28;
    const cost = (baseRevenue * 0.35) + (Math.cos(i * 0.5) * 2000); // media cost, etc.
    const roas = 2.4 + Math.sin(i * 0.6) * 0.3 + (i * 0.008);
    
    data.push({
      date: dateStr,
      revenue: Math.round(baseRevenue),
      subscriptionRevenue: Math.round(subscriptionRevenue),
      oneTimeRevenue: Math.round(oneTimeRevenue),
      cost: Math.round(cost),
      roas: Math.round(roas * 100) / 100,
    });
  }
  return data;
};

export const full30DaysRevenue = generate30DaysData();

export const revenueData: Record<'today' | '7d' | '30d', RevenueTrendItem[]> = {
  // Today's trend (hourly-like representation over the day)
  today: [
    { date: '00:00', revenue: 1200, subscriptionRevenue: 900, oneTimeRevenue: 300, cost: 450, roas: 2.66 },
    { date: '04:00', revenue: 800, subscriptionRevenue: 600, oneTimeRevenue: 200, cost: 350, roas: 2.28 },
    { date: '08:00', revenue: 4500, subscriptionRevenue: 3200, oneTimeRevenue: 1300, cost: 1600, roas: 2.81 },
    { date: '12:00', revenue: 9800, subscriptionRevenue: 7100, oneTimeRevenue: 2700, cost: 3400, roas: 2.88 },
    { date: '16:00', revenue: 12400, subscriptionRevenue: 8900, oneTimeRevenue: 3500, cost: 4200, roas: 2.95 },
    { date: '20:00', revenue: 11500, subscriptionRevenue: 8200, oneTimeRevenue: 3300, cost: 3900, roas: 2.94 },
    { date: '23:59', revenue: 6080, subscriptionRevenue: 4380, oneTimeRevenue: 1700, cost: 2100, roas: 2.89 },
  ],
  // 7 days trend
  '7d': full30DaysRevenue.slice(-7),
  // 30 days trend
  '30d': full30DaysRevenue,
};
