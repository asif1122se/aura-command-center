import { ProductItem } from './types';

export const productsData: Record<'today' | '7d' | '30d', ProductItem[]> = {
  today: [
    {
      id: 'prod_1',
      name: 'Daily Greens & Superfoods',
      unitsSold: 284,
      revenue: 17040,
      conversionRate: 3.82,
      subAttachRate: 78.5,
      status: 'trending',
      reviewsSentiment: 94,
      sparkline: [250, 240, 260, 290, 275, 310, 284],
      details: {
        trend: [220, 230, 245, 260, 255, 270, 284],
        contactVolume: 12,
        recommendation: 'Amplify: Run social proof retargeting ads focusing on the taste and morning routine integration to push conversion past 4.0%.'
      }
    },
    {
      id: 'prod_2',
      name: 'Hormone Balance Support',
      unitsSold: 195,
      revenue: 12675,
      conversionRate: 4.12,
      subAttachRate: 85.2,
      status: 'selling_fast',
      reviewsSentiment: 91,
      sparkline: [170, 182, 175, 190, 188, 192, 195],
      details: {
        trend: [150, 162, 175, 180, 188, 192, 195],
        contactVolume: 8,
        recommendation: 'Maintain: Increase search ad spend for keywords around "PMS relief" and "cycle regulator" to leverage the strong subscription rate.'
      }
    },
    {
      id: 'prod_3',
      name: 'Sleep Restore Gummies',
      unitsSold: 142,
      revenue: 7100,
      conversionRate: 2.95,
      subAttachRate: 64.8,
      status: 'declining',
      reviewsSentiment: 78,
      sparkline: [180, 172, 165, 158, 150, 145, 142],
      details: {
        trend: [190, 180, 170, 160, 150, 145, 142],
        contactVolume: 42,
        recommendation: 'Intervene: Customers are reporting a flavor shift in reviews. Pause auto-ship notifications, trigger proactive winback feedback, and review formulas with manufacturing.'
      }
    },
    {
      id: 'prod_4',
      name: 'Collagen Glow Peptides',
      unitsSold: 124,
      revenue: 8680,
      conversionRate: 2.48,
      subAttachRate: 58.6,
      status: 'stagnant',
      reviewsSentiment: 88,
      sparkline: [130, 128, 125, 122, 124, 123, 124],
      details: {
        trend: [140, 135, 130, 125, 128, 126, 124],
        contactVolume: 15,
        recommendation: 'Amplify: Introduce a "Subscribe & Save 20%" popup on exit intent for this SKU. Cross-sell to Daily Greens buyers.'
      }
    },
    {
      id: 'prod_5',
      name: 'Gut Reset Pre/Probiotic',
      unitsSold: 98,
      revenue: 5880,
      conversionRate: 3.15,
      subAttachRate: 72.1,
      status: 'selling_fast',
      sparkline: [75, 80, 84, 89, 92, 95, 98],
      reviewsSentiment: 92,
      details: {
        trend: [60, 70, 80, 85, 90, 95, 98],
        contactVolume: 5,
        recommendation: 'Amplify: Run influencer placements around bloating. Subscriptions are renewing strongly at month 3.'
      }
    },
    {
      id: 'prod_6',
      name: 'Immunity Boost Elixir',
      unitsSold: 45,
      revenue: 2025,
      conversionRate: 1.85,
      subAttachRate: 41.2,
      status: 'stagnant',
      sparkline: [52, 48, 50, 47, 44, 46, 45],
      reviewsSentiment: 85,
      details: {
        trend: [50, 48, 47, 46, 45, 46, 45],
        contactVolume: 2,
        recommendation: 'Evaluate: Consider bundling with Daily Greens as a free sample or transition SKU to clear inventory.'
      }
    }
  ],
  '7d': [
    {
      id: 'prod_1',
      name: 'Daily Greens & Superfoods',
      unitsSold: 1950,
      revenue: 117000,
      conversionRate: 3.75,
      subAttachRate: 76.8,
      status: 'trending',
      reviewsSentiment: 93,
      sparkline: [1650, 1720, 1780, 1820, 1890, 1920, 1950],
      details: {
        trend: [1500, 1600, 1700, 1800, 1850, 1900, 1950],
        contactVolume: 74,
        recommendation: 'Amplify: Run social proof retargeting ads focusing on taste.'
      }
    },
    {
      id: 'prod_2',
      name: 'Hormone Balance Support',
      unitsSold: 1340,
      revenue: 87100,
      conversionRate: 4.05,
      subAttachRate: 84.5,
      status: 'selling_fast',
      reviewsSentiment: 92,
      sparkline: [1180, 1220, 1250, 1280, 1310, 1330, 1340],
      details: {
        trend: [1000, 1100, 1200, 1250, 1300, 1320, 1340],
        contactVolume: 48,
        recommendation: 'Maintain: Increase search ad spend for PMS relief keywords.'
      }
    },
    {
      id: 'prod_3',
      name: 'Sleep Restore Gummies',
      unitsSold: 980,
      revenue: 49000,
      conversionRate: 2.88,
      subAttachRate: 63.2,
      status: 'declining',
      reviewsSentiment: 79,
      sparkline: [1200, 1150, 1100, 1050, 1010, 990, 980],
      details: {
        trend: [1300, 1200, 1150, 1100, 1050, 1000, 980],
        contactVolume: 245,
        recommendation: 'Intervene: Flavor shift reports. Review formula with manufacturers.'
      }
    },
    {
      id: 'prod_4',
      name: 'Collagen Glow Peptides',
      unitsSold: 880,
      revenue: 61600,
      conversionRate: 2.52,
      subAttachRate: 59.1,
      status: 'stagnant',
      reviewsSentiment: 89,
      sparkline: [910, 895, 890, 882, 885, 878, 880],
      details: {
        trend: [950, 920, 900, 890, 885, 880, 880],
        contactVolume: 92,
        recommendation: 'Amplify: Exit popup discounts for subscription.'
      }
    },
    {
      id: 'prod_5',
      name: 'Gut Reset Pre/Probiotic',
      unitsSold: 670,
      revenue: 40200,
      conversionRate: 3.08,
      subAttachRate: 71.4,
      status: 'selling_fast',
      reviewsSentiment: 91,
      sparkline: [520, 550, 580, 610, 630, 650, 670],
      details: {
        trend: [450, 500, 550, 600, 620, 650, 670],
        contactVolume: 35,
        recommendation: 'Amplify: Bloating influencer partnerships.'
      }
    },
    {
      id: 'prod_6',
      name: 'Immunity Boost Elixir',
      unitsSold: 310,
      revenue: 13950,
      conversionRate: 1.88,
      subAttachRate: 40.5,
      status: 'stagnant',
      reviewsSentiment: 86,
      sparkline: [340, 332, 325, 318, 312, 315, 310],
      details: {
        trend: [350, 340, 330, 320, 315, 312, 310],
        contactVolume: 14,
        recommendation: 'Evaluate: Bundle with core products to clear remaining stock.'
      }
    }
  ],
  '30d': [
    {
      id: 'prod_1',
      name: 'Daily Greens & Superfoods',
      unitsSold: 8450,
      revenue: 507000,
      conversionRate: 3.84,
      subAttachRate: 77.2,
      status: 'trending',
      reviewsSentiment: 94,
      sparkline: [7200, 7400, 7650, 7900, 8100, 8300, 8450],
      details: {
        trend: [6500, 7000, 7500, 7800, 8000, 8200, 8450],
        contactVolume: 320,
        recommendation: 'Amplify: Run social proof retargeting ads focusing on taste and morning habits.'
      }
    },
    {
      id: 'prod_2',
      name: 'Hormone Balance Support',
      unitsSold: 5820,
      revenue: 378300,
      conversionRate: 4.15,
      subAttachRate: 85.8,
      status: 'selling_fast',
      reviewsSentiment: 93,
      sparkline: [5100, 5250, 5380, 5520, 5650, 5740, 5820],
      details: {
        trend: [4500, 4800, 5100, 5300, 5500, 5700, 5820],
        contactVolume: 210,
        recommendation: 'Maintain: Increase search ad spend for PMS relief search keywords.'
      }
    },
    {
      id: 'prod_3',
      name: 'Sleep Restore Gummies',
      unitsSold: 4280,
      revenue: 214000,
      conversionRate: 2.92,
      subAttachRate: 64.1,
      status: 'declining',
      reviewsSentiment: 78,
      sparkline: [5200, 5050, 4850, 4650, 4500, 4380, 4280],
      details: {
        trend: [5500, 5300, 5000, 4700, 4500, 4350, 4280],
        contactVolume: 1045,
        recommendation: 'Intervene: Flavor shift reports from manufacturing batch 082. Contact affected subscribers and offer replacement or pause credit.'
      }
    },
    {
      id: 'prod_4',
      name: 'Collagen Glow Peptides',
      unitsSold: 3790,
      revenue: 265300,
      conversionRate: 2.45,
      subAttachRate: 57.9,
      status: 'stagnant',
      reviewsSentiment: 88,
      sparkline: [3900, 3880, 3850, 3820, 3800, 3785, 3790],
      details: {
        trend: [4100, 4000, 3950, 3900, 3850, 3800, 3790],
        contactVolume: 420,
        recommendation: 'Amplify: Exit popup discounts for subscription with VIP loyalty rewards.'
      }
    },
    {
      id: 'prod_5',
      name: 'Gut Reset Pre/Probiotic',
      unitsSold: 2890,
      revenue: 173400,
      conversionRate: 3.12,
      subAttachRate: 72.8,
      status: 'selling_fast',
      reviewsSentiment: 92,
      sparkline: [2100, 2250, 2400, 2550, 2680, 2780, 2890],
      details: {
        trend: [1800, 2000, 2200, 2400, 2600, 2750, 2890],
        contactVolume: 160,
        recommendation: 'Amplify: Bloating influencer partnerships across TikTok.'
      }
    },
    {
      id: 'prod_6',
      name: 'Immunity Boost Elixir',
      unitsSold: 1380,
      revenue: 62100,
      conversionRate: 1.82,
      subAttachRate: 41.8,
      status: 'stagnant',
      reviewsSentiment: 85,
      sparkline: [1480, 1460, 1440, 1420, 1400, 1390, 1380],
      details: {
        trend: [1600, 1550, 1500, 1450, 1420, 1400, 1380],
        contactVolume: 58,
        recommendation: 'Evaluate: Bundle with core products to clear remaining stock before expiry.'
      }
    }
  ]
};
