'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { affiliatesLeaderboard, activeChallenge, affiliatesSegments } from '../../lib/mock/affiliates';
import { ChartCard } from '../../components/ChartCard';
import { AreaChart } from '../../components/charts/AreaChart';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { Award, Timer, Target, Zap, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AffiliatePage() {
  const { dateRange, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Visual trend mock mapping for affiliate segment returns
  const affiliateTrendData = [
    { date: 'Week 1', creatorsRevenue: 32000, referrals: 210 },
    { date: 'Week 2', creatorsRevenue: 48000, referrals: 310 },
    { date: 'Week 3', creatorsRevenue: 59000, referrals: 380 },
    { date: 'Week 4', creatorsRevenue: 68900, referrals: 450 },
  ];

  const handleAction = (segmentName: string) => {
    toast.success('Affiliate Action Complete', {
      description: `Dispatched campaign task to all creators in "${segmentName}".`,
    });
  };

  const getTierStyle = (tier: string) => {
    switch (tier) {
      case 'Diamond':
        return 'text-cyan-400 bg-cyan-950/45 border-cyan-800/30';
      case 'Platinum':
        return 'text-indigo-400 bg-indigo-950/45 border-indigo-800/30';
      case 'Gold':
        return 'text-amber-400 bg-amber-950/45 border-amber-800/30';
      default:
        return 'text-slate-400 bg-slate-950/45 border-slate-800/30';
    }
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Affiliate & Creator Program</h1>
          <p className="text-xs text-muted font-medium">Influencer standings, double-commission rallies, and segment intelligence for content marketing.</p>
        </div>

        {/* Challenge & Leaderboard row split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Active challenge tracking card */}
          <div className="glass-card rounded-2xl p-6 space-y-5 flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all pointer-events-none" />

            <div className="space-y-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary/15 text-primary border border-primary/20">
                Active Creator Rally
              </span>
              <h3 className="text-lg font-bold text-foreground flex items-center">
                {activeChallenge.title} <Zap className="w-4 h-4 ml-1.5 text-primary-glow animate-pulse" />
              </h3>
              <p className="text-xs text-muted leading-relaxed">{activeChallenge.description}</p>
            </div>

            {/* Progress calculations */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted">Conversions reached</span>
                <span className="font-mono text-foreground">{activeChallenge.progress} / {activeChallenge.goal}</span>
              </div>
              <div className="w-full bg-border/20 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeChallenge.progress / activeChallenge.goal) * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="bg-primary h-full rounded-full glow-primary"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-muted font-semibold pt-1">
                <span className="flex items-center"><Timer className="w-3.5 h-3.5 mr-1 text-rose-accent" /> {activeChallenge.daysLeft} days left</span>
                <span className="flex items-center"><Target className="w-3.5 h-3.5 mr-1 text-primary-glow" /> Reward: {activeChallenge.reward}</span>
              </div>
            </div>

            <button
              onClick={() => toast.success('Outreach Dispatched', { description: 'Sent promotional reminders to participants behind pace.' })}
              className="h-8 w-full mt-4 rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-bold transition-all glow-primary hover:scale-[1.01] cursor-pointer"
            >
              Dispatch Reminder Campaign
            </button>
          </div>

          {/* Leaders board table */}
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden border border-border">
            <div className="p-6 border-b border-border/30">
              <h3 className="text-lg font-medium text-foreground tracking-tight">Affiliate Leaderboard</h3>
              <p className="text-xs text-muted font-medium">Top performing brand advocates by monthly generated revenue YTD</p>
            </div>

            <div className="overflow-x-auto max-h-[300px] overflow-y-auto pr-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/30 bg-card/25 text-muted font-semibold uppercase tracking-wider text-[9px]">
                    <th className="p-3.5">Rank</th>
                    <th className="p-3.5">Creator Name</th>
                    <th className="p-3.5 text-right">Revenue</th>
                    <th className="p-3.5 text-right">Conversions</th>
                    <th className="p-3.5">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx} className="border-b border-border/10">
                        <td className="p-3.5"><Shimmer className="h-4 w-6" /></td>
                        <td className="p-3.5"><Shimmer className="h-4 w-28" /></td>
                        <td className="p-3.5"><Shimmer className="h-4 w-14 ml-auto" /></td>
                        <td className="p-3.5"><Shimmer className="h-4 w-10 ml-auto" /></td>
                        <td className="p-3.5"><Shimmer className="h-4 w-12" /></td>
                      </tr>
                    ))
                  ) : (
                    affiliatesLeaderboard.map((creator) => (
                      <tr key={creator.rank} className="border-b border-border/10 hover:bg-card/10 transition-colors">
                        <td className="p-3.5 font-bold font-mono text-muted text-tabular">#{creator.rank}</td>
                        <td className="p-3.5 font-semibold text-foreground">{creator.name}</td>
                        <td className="p-3.5 font-mono text-right text-foreground font-semibold">${creator.revenue.toLocaleString()}</td>
                        <td className="p-3.5 font-mono text-right text-muted font-semibold text-tabular">{creator.conversions}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getTierStyle(creator.tier)}`}>
                            {creator.tier}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Charts: Affiliate margins + Segments outreach */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          <div className="lg:col-span-2">
            <ChartCard
              title="Creator Referral Returns Trend"
              subtitle="Affiliate program aggregate margins over last month weeks"
            >
              {loading ? (
                <Shimmer className="w-full h-full rounded-xl" />
              ) : (
                <AreaChart
                  data={affiliateTrendData}
                  xKey="date"
                  dataKeys={['creatorsRevenue', 'referrals']}
                  colors={['#14B8A6', '#6366F1']}
                  formatYAxis={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
              )}
            </ChartCard>
          </div>

          {/* Segment management */}
          <div className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-1 pb-2 border-b border-border/30">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Creator Segments</h3>
              <p className="text-[11px] text-muted">Intelligent grouping and target corrective operations</p>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {affiliatesSegments.map((segment) => (
                <div
                  key={segment.name}
                  className="p-3 border border-border/10 rounded-xl bg-card/20 hover:border-primary/20 hover:bg-card/30 transition-all flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-[11px] font-bold text-foreground leading-tight">{segment.name}</h4>
                    <span className="text-[10px] font-semibold text-primary-glow bg-primary/10 border border-primary/20 px-1.5 py-0.2 rounded font-mono">
                      {segment.count} active
                    </span>
                  </div>
                  <p className="text-[10px] text-muted leading-relaxed">{segment.action}</p>
                  
                  <button
                    onClick={() => handleAction(segment.name)}
                    className="self-end h-6 px-2.5 rounded-md bg-card border border-border text-muted hover:text-foreground text-[10px] font-semibold cursor-pointer transition-colors"
                  >
                    Outreach
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
