'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { channelsData } from '../../lib/mock/channels';
import { ChartCard } from '../../components/ChartCard';
import { BarChart } from '../../components/charts/BarChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { PageTransition } from '../../components/PageTransition';
import { StatusBadge } from '../../components/StatusBadge';
import { Shimmer } from '../../components/Shimmer';
import { ArrowUpDown, TrendingUp, Sparkles, Check, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type SortField = 'name' | 'revenue' | 'momPercent' | 'vsGoalPercent';
type SortOrder = 'asc' | 'desc';

export default function FinancePage() {
  const { dateRange, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [goalsApproved, setGoalsApproved] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeChannels = [...channelsData[dateRange]];

  // Sort channels
  const sortedChannels = activeChannels.sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string') {
      return sortOrder === 'asc'
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    } else {
      return sortOrder === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Calculations for Total row
  const totalRevenue = activeChannels.reduce((sum, c) => sum + c.revenue, 0);
  const avgMom = activeChannels.reduce((sum, c) => sum + c.momPercent, 0) / activeChannels.length;
  const avgPacing = activeChannels.reduce((sum, c) => sum + c.vsGoalPercent, 0) / activeChannels.length;

  // Donut mix formatting
  const donutColors = ['#14B8A6', '#6366F1', '#818CF8', '#1B2A4A', '#34D399', '#FBBF24', '#FB7185'];
  const donutData = activeChannels.map((c, idx) => ({
    name: c.name.split(' (')[0], // shorten names
    value: c.revenue,
    color: donutColors[idx % donutColors.length],
  }));

  // Generating multi-channel stacked timeline for the bar chart
  const getChannelsTimeline = () => {
    const dates = dateRange === 'today'
      ? ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
      : dateRange === '7d'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const shareRatios = {
      recharge: 0.48,
      shopify: 0.18,
      klaviyo: 0.14,
      attentive: 0.08,
      other: 0.12,
    };

    return dates.map((d, index) => {
      const dailyBase = totalRevenue / dates.length * (1 + Math.sin(index) * 0.15);
      return {
        date: d,
        'Subscription (Recharge)': Math.round(dailyBase * shareRatios.recharge),
        'One-Time (Shopify)': Math.round(dailyBase * shareRatios.shopify),
        'Klaviyo Email': Math.round(dailyBase * shareRatios.klaviyo),
        'Paid Channels': Math.round(dailyBase * shareRatios.attentive),
        'Other Channels': Math.round(dailyBase * shareRatios.other),
      };
    });
  };

  const handleApproveGoals = () => {
    setGoalsApproved(true);
    toast.success('AI Goal Settings Approved!', {
      description: 'Next month target benchmarks have been deployed to Shopify & Recharge tracking suites.',
    });
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Financial Intelligence</h1>
          <p className="text-xs text-muted font-medium">Detailed attribution, performance margin reviews, and automated goal adjustments.</p>
        </div>

        {/* Dynamic pacing callout */}
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-amber-accent flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-bold text-amber-accent bg-amber-accent/15 px-2 py-0.5 rounded border border-amber-accent/20 uppercase tracking-wide">
              Mid-Month Target Alert
            </span>
            <p className="text-xs text-muted leading-relaxed">
              <span className="font-semibold text-foreground">Aura Forecast:</span> Subscription renewals (Recharge) are pacing <span className="font-semibold text-rose-accent">4.1% below</span> targets due to recent product skips. Paid media returns remain robust.
            </p>
            <p className="text-xs font-semibold text-foreground">
              Recommended: Automatically offer a 15% discount for a 1-month delay to current skips to recover $40k in projected MRR.
            </p>
          </div>
          <button
            onClick={() => toast.success('Corrective Action Initiated', { description: 'Automatic subscription discount campaign queued for skipped cohorts.' })}
            className="h-8 px-4 rounded-lg bg-amber-accent hover:bg-amber-accent/80 text-brand-navy text-xs font-bold transition-all flex items-center cursor-pointer shrink-0"
          >
            Deploy Interception
          </button>
        </div>

        {/* Charts block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard
              title="Revenue Attribution Mix Over Time"
              subtitle="Comparison of revenue capture channels over period timeline"
            >
              {loading ? (
                <Shimmer className="w-full h-full rounded-xl" />
              ) : (
                <BarChart
                  data={getChannelsTimeline()}
                  xKey="date"
                  dataKeys={['Subscription (Recharge)', 'One-Time (Shopify)', 'Klaviyo Email', 'Paid Channels', 'Other Channels']}
                  colors={['#14B8A6', '#6366F1', '#818CF8', '#FB7185', '#FBBF24']}
                  stacked={true}
                  formatYAxis={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
              )}
            </ChartCard>
          </div>

          <div>
            <ChartCard
              title="Channel Revenue Share"
              subtitle="Visual ratio breakdown of aggregate sales channels"
            >
              {loading ? (
                <Shimmer className="w-full h-full rounded-xl" />
              ) : (
                <DonutChart
                  data={donutData}
                  formatValue={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
              )}
            </ChartCard>
          </div>
        </div>

        {/* Channel revenue table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-border">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-lg font-medium text-foreground tracking-tight">Channel Revenue Performance</h3>
            <p className="text-xs text-muted">Complete breakdown of gross capture, growth trajectory, and pacing benchmarks.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/30 bg-card/20 text-muted font-semibold uppercase tracking-wider text-[10px]">
                  <th onClick={() => handleSort('name')} className="p-4 cursor-pointer hover:text-foreground transition-colors select-none">
                    <span className="flex items-center">Channel <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted" /></span>
                  </th>
                  <th onClick={() => handleSort('revenue')} className="p-4 cursor-pointer hover:text-foreground transition-colors select-none text-right">
                    <span className="flex items-center justify-end">Revenue <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted" /></span>
                  </th>
                  <th onClick={() => handleSort('momPercent')} className="p-4 cursor-pointer hover:text-foreground transition-colors select-none text-right">
                    <span className="flex items-center justify-end">MoM % <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted" /></span>
                  </th>
                  <th onClick={() => handleSort('vsGoalPercent')} className="p-4 cursor-pointer hover:text-foreground transition-colors select-none text-right">
                    <span className="flex items-center justify-end">vs Goal % <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted" /></span>
                  </th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-border/10">
                      <td className="p-4"><Shimmer className="h-4 w-28" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-16 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-12 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-12 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-14" /></td>
                    </tr>
                  ))
                ) : (
                  <>
                    {sortedChannels.map((channel) => (
                      <tr key={channel.id} className="border-b border-border/10 hover:bg-card/10 transition-colors">
                        <td className="p-4 font-semibold text-foreground">{channel.name}</td>
                        <td className="p-4 font-mono text-right text-foreground font-semibold">${channel.revenue.toLocaleString()}</td>
                        <td className={`p-4 font-mono text-right font-semibold ${channel.momPercent >= 0 ? 'text-emerald-accent' : 'text-rose-accent'}`}>
                          {channel.momPercent >= 0 ? '+' : ''}{channel.momPercent.toFixed(1)}%
                        </td>
                        <td className="p-4 font-mono text-right text-foreground font-semibold">{channel.vsGoalPercent.toFixed(1)}%</td>
                        <td className="p-4"><StatusBadge status={channel.status} /></td>
                      </tr>
                    ))}
                    {/* Sum/Aggregate row */}
                    <tr className="bg-card/30 font-semibold border-t border-border/50 text-foreground">
                      <td className="p-4 uppercase tracking-wider text-[10px]">Total Attribution</td>
                      <td className="p-4 font-mono text-right text-base text-primary-glow font-bold">${totalRevenue.toLocaleString()}</td>
                      <td className={`p-4 font-mono text-right ${avgMom >= 0 ? 'text-emerald-accent' : 'text-rose-accent'}`}>
                        {avgMom >= 0 ? '+' : ''}{avgMom.toFixed(1)}%
                      </td>
                      <td className="p-4 font-mono text-right text-foreground font-semibold">{avgPacing.toFixed(1)}%</td>
                      <td className="p-4">
                        <StatusBadge status={avgPacing >= 100 ? 'ahead' : 'on_track'} />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goal pacing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-foreground">Shopify One-Time Pacing</h4>
              <span className="text-xs font-mono font-semibold text-emerald-accent">103.2%</span>
            </div>
            <div className="w-full bg-border/20 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-accent h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="text-[10px] text-muted leading-relaxed">Shopify margins are performing exceptionally well due to higher average order value (AOV) on bundle configurations.</p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-foreground">Recharge Subscription Pacing</h4>
              <span className="text-xs font-mono font-semibold text-rose-accent">95.9%</span>
            </div>
            <div className="w-full bg-border/20 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-accent h-full rounded-full" style={{ width: '95.9%' }} />
            </div>
            <p className="text-[10px] text-muted leading-relaxed">Pacing slightly behind targets due to month 3 skips on Sleep Restore. Interception emails scheduled to run tomorrow.</p>
          </div>

          {/* AI next month goal target settings */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all pointer-events-none" />
            
            <div className="space-y-2.5">
              <h4 className="text-sm font-medium text-foreground flex items-center">
                AI Next-Month Goal Setting <Sparkles className="w-4 h-4 ml-1.5 text-primary-glow" />
              </h4>
              <p className="text-[10px] text-muted leading-relaxed">
                Aura recommends setting next month target at <span className="font-semibold text-foreground">$1,520,000</span> (representing a 5.5% MoM stretch) based on seasonal volume scaling.
              </p>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-[10px] font-semibold text-muted">Status: {goalsApproved ? 'Active' : 'Awaiting Approval'}</span>
              <button
                onClick={handleApproveGoals}
                disabled={goalsApproved}
                className={`h-8 px-3.5 rounded-lg text-xs font-bold flex items-center cursor-pointer transition-all ${
                  goalsApproved
                    ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30 cursor-default'
                    : 'bg-primary hover:bg-primary-glow text-white glow-primary hover:scale-[1.02]'
                }`}
              >
                {goalsApproved ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" /> Approved
                  </>
                ) : (
                  'Approve Targets'
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
