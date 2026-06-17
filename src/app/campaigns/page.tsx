'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { campaignTimelineData, campaignMixData, campaignPlanSummary } from '../../lib/mock/campaigns';
import { ChartCard } from '../../components/ChartCard';
import { DonutChart } from '../../components/charts/DonutChart';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { ArrowRight, Calendar, Landmark, Percent, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function CampaignsPage() {
  const { dateRange, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Channels grouping for Gantt rows
  const channels = ['Paid Ads', 'Email', 'SMS', 'Social', 'Affiliate'];

  const getCampaignsForChannel = (channel: string) => {
    return campaignTimelineData.filter((c) => c.channel === channel);
  };

  const handleCreateCampaign = () => {
    toast.success('Campaign Draft Initiated', {
      description: 'A new canvas has been added to Campaign Planner. Set budgets to edit details.',
    });
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Campaign Planning</h1>
            <p className="text-xs text-muted font-medium">Multi-channel marketing calendar, budget allocations, Gantt timelines, and ROI forecasting.</p>
          </div>

          <button
            onClick={handleCreateCampaign}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-bold transition-all glow-primary hover:scale-[1.02] cursor-pointer"
          >
            Create New Campaign
          </button>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Active Campaigns</span>
            <p className="text-2xl font-bold font-mono text-foreground">{campaignPlanSummary.activeCount}</p>
            <p className="text-[10px] text-muted">Across 5 primary owned/paid channels</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Planned Budget</span>
            <p className="text-2xl font-bold font-mono text-foreground">${campaignPlanSummary.totalBudget.toLocaleString()}</p>
            <p className="text-[10px] text-muted">Estimated aggregate media spend</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Projected Revenue</span>
            <p className="text-2xl font-bold font-mono text-primary-glow">${campaignPlanSummary.projectedReturn.toLocaleString()}</p>
            <p className="text-[10px] text-muted">Aura forecast return (AOV baseline)</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Blended ROI Goal</span>
            <p className="text-2xl font-bold font-mono text-emerald-accent">{campaignPlanSummary.blendedRoiGoal.toFixed(1)}x</p>
            <p className="text-[10px] text-muted">Aggregated target efficiency multiple</p>
          </div>
        </div>

        {/* Gantt-style Timeline Chart */}
        <div className="glass-card rounded-2xl p-6 space-y-6 overflow-hidden">
          <div className="pb-2 border-b border-border/30 flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
                Marketing Gantt Timeline <Calendar className="w-4 h-4 ml-1.5 text-primary-glow" />
              </h3>
              <p className="text-xs text-muted">Campaign schedule, durations, and channels overlap for June 2026</p>
            </div>
            <span className="text-xs font-mono font-bold text-muted bg-card px-2.5 py-1 border border-border rounded-xl">
              Day 1 – 30
            </span>
          </div>

          {/* Gantt Grid Body */}
          <div className="overflow-x-auto min-w-[700px]">
            <div className="space-y-4">
              
              {/* Timeline Header (Days markers) */}
              <div className="grid grid-cols-31 gap-0.5 border-b border-border/20 pb-2 text-[8px] font-mono font-semibold text-muted text-center">
                <div className="col-span-3 text-left">Channel</div>
                {Array.from({ length: 30 }).map((_, idx) => {
                  const day = idx + 1;
                  const showLabel = day === 1 || day % 5 === 0 || day === 30;
                  return (
                    <div key={day} className="flex flex-col justify-between h-5">
                      <span className={showLabel ? 'opacity-100' : 'opacity-20'}>{day}</span>
                      <div className={`w-0.5 h-1.5 mx-auto bg-border ${showLabel ? 'opacity-60' : 'opacity-20'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Channel Rows */}
              <div className="space-y-3.5">
                {channels.map((channel) => {
                  const campaigns = getCampaignsForChannel(channel);
                  return (
                    <div key={channel} className="grid grid-cols-31 gap-0.5 items-center min-h-[38px] group">
                      {/* Row Header */}
                      <div className="col-span-3 text-[10px] font-bold text-muted uppercase group-hover:text-foreground transition-colors">
                        {channel}
                      </div>

                      {/* Bar Containers */}
                      <div className="col-span-28 relative h-7 bg-card/5 border border-border/5 rounded-lg">
                        {campaigns.map((camp) => {
                          const leftPct = ((camp.startDay - 1) / 30) * 100;
                          const widthPct = ((camp.endDay - 1 - (camp.startDay - 1) + 1) / 30) * 100;
                          return (
                            <div
                              key={camp.id}
                              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                              onClick={() => toast.info(camp.name, {
                                description: `Budget: $${camp.budget.toLocaleString()} | ROI Target: ${(camp.projectedRevenue / camp.budget).toFixed(1)}x`,
                              })}
                              className={`absolute top-0.5 bottom-0.5 rounded-md border p-1 text-[8px] font-bold select-none cursor-pointer overflow-hidden flex flex-col justify-center leading-tight transition-all hover:scale-[1.01] hover:brightness-110 shadow-sm ${camp.color}`}
                              title={`${camp.name} (Day ${camp.startDay}-${camp.endDay})`}
                            >
                              <span className="truncate">{camp.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* Donut split + Plan Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div>
            <ChartCard
              title="Budget Mix Share"
              subtitle="Marketing investment allocation across media classes"
            >
              {loading ? (
                <Shimmer className="w-full h-full rounded-xl" />
              ) : (
                <DonutChart
                  data={campaignMixData}
                  formatValue={(val) => `${val}%`}
                />
              )}
            </ChartCard>
          </div>

          <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-2 border-b border-border/30">
                <h3 className="text-lg font-medium text-foreground tracking-tight">Retention-First Strategy Overview</h3>
                <p className="text-xs text-muted font-medium">Aura core compliance rules and operational adjustments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-card/25 border border-border/10 rounded-xl space-y-1">
                  <span className="font-bold text-foreground flex items-center">
                    <Landmark className="w-4 h-4 mr-1 text-primary-glow" /> Target AOV Goal
                  </span>
                  <p className="text-[11px] text-muted">MTD average order target is set at $68, pacing ahead of benchmark values.</p>
                </div>
                <div className="p-4 bg-card/25 border border-border/10 rounded-xl space-y-1">
                  <span className="font-bold text-foreground flex items-center">
                    <Percent className="w-4 h-4 mr-1 text-secondary-glow" /> Owned ROI Weight
                  </span>
                  <p className="text-[11px] text-muted">Owned channels (SMS + Email) receive 42% of budget, pushing blended margins to 4.4x.</p>
                </div>
                <div className="p-4 bg-card/25 border border-border/10 rounded-xl space-y-1">
                  <span className="font-bold text-foreground flex items-center">
                    <RefreshCw className="w-4 h-4 mr-1 text-emerald-accent" /> Cycle Interventions
                  </span>
                  <p className="text-[11px] text-muted">Automatically triggers discounts to high-risk subscriber segments on month 3 skips.</p>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed font-semibold italic">
                "{campaignPlanSummary.retentionFocus}"
              </p>
            </div>

            <button
              onClick={() => toast.success('Strategy Synchronized', { description: 'Campaign plans published to active ads managers.' })}
              className="h-9 px-4 self-end rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-bold transition-all glow-primary cursor-pointer hover:scale-[1.01]"
            >
              Publish Active Strategy
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
