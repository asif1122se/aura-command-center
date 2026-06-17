'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  churnTrendData,
  cancelReasonsData,
  winbackFlowsData,
  cohortRetentionData,
  atRiskSubscribersData,
} from '../../lib/mock/retention';
import { ChartCard } from '../../components/ChartCard';
import { LineChart } from '../../components/charts/LineChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function RetentionPage() {
  const { dateRange, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [atRiskList, setAtRiskList] = useState(atRiskSubscribersData);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleIntervention = (subId: string, name: string) => {
    setAtRiskList((prev) => prev.filter((sub) => sub.id !== subId));
    toast.success(`Intervention Sent to ${name}`, {
      description: 'Triggered automated Klaviyo email coupon sequence and Gorgias support alert.',
    });
  };

  // Color mapping function for cohort retention heatmap cells (Teal intensity)
  const getCellBg = (val: number) => {
    if (val === 0) return 'bg-card/10 text-muted';
    const opacity = (val - 50) / 50; // Map 50-100% to 0-1 opacity
    const roundedOpacity = Math.max(0.1, Math.min(1, opacity));
    return {
      backgroundColor: `rgba(20, 184, 166, ${roundedOpacity})`,
      color: val > 75 ? '#ffffff' : '#0A0F1C',
    };
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Retention Intelligence</h1>
          <p className="text-xs text-muted font-medium">Cohort analytics, subscription churn indicators, winback flows, and at-risk accounts monitoring.</p>
        </div>

        {/* Charts: Churn Trend + Cancel Causes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard
              title="Subscription Churn Rate"
              subtitle="Monthly churn rate (%) compared to benchmark target (4.80%)"
            >
              {loading ? (
                <Shimmer className="w-full h-full rounded-xl" />
              ) : (
                <LineChart
                  data={churnTrendData}
                  xKey="month"
                  dataKeys={['churnRate', 'benchmark']}
                  colors={['#14B8A6', '#FB7185']}
                  dashTypes={[false, true]}
                  formatYAxis={(val) => `${val.toFixed(2)}%`}
                />
              )}
            </ChartCard>
          </div>

          <div>
            <ChartCard
              title="Cancellation Reasons"
              subtitle="Primary causes for customer subscription cancellations YTD"
            >
              {loading ? (
                <Shimmer className="w-full h-full rounded-xl" />
              ) : (
                <DonutChart
                  data={cancelReasonsData}
                  formatValue={(val) => `${val}%`}
                />
              )}
            </ChartCard>
          </div>
        </div>

        {/* Heatmap & Klaviyo flows Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cohort retention heatmap */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4">
            <div className="space-y-1 pb-2 border-b border-border/30">
              <h3 className="text-lg font-medium text-foreground tracking-tight">Cohort Retention Heatmap</h3>
              <p className="text-xs text-muted">Weekly/Monthly retention percentages based on subscriber sign-up cohorts</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs select-none">
                <thead>
                  <tr className="border-b border-border/30 bg-card/25 text-muted font-semibold uppercase tracking-wider text-[9px]">
                    <th className="p-3 text-left">Cohort</th>
                    <th className="p-3">Month 0</th>
                    <th className="p-3">Month 1</th>
                    <th className="p-3">Month 2</th>
                    <th className="p-3">Month 3</th>
                    <th className="p-3">Month 4</th>
                    <th className="p-3">Month 5</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <tr key={idx} className="border-b border-border/10">
                        <td className="p-3 text-left"><Shimmer className="h-4 w-20" /></td>
                        {Array.from({ length: 6 }).map((__, i) => (
                          <td key={i} className="p-3"><Shimmer className="h-4 w-10 mx-auto" /></td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    cohortRetentionData.map((cohort) => (
                      <tr key={cohort.cohortName} className="border-b border-border/10 hover:bg-card/10 transition-colors">
                        <td className="p-3 font-semibold text-foreground text-left">{cohort.cohortName}</td>
                        {cohort.retention.map((val, idx) => {
                          const cellBg = getCellBg(val);
                          return (
                            <td key={idx} className="p-3">
                              {val === 0 ? (
                                <span className="text-muted/40 font-semibold">-</span>
                              ) : (
                                <span
                                  className="inline-block w-full py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight text-center"
                                  style={typeof cellBg === 'object' ? cellBg : undefined}
                                >
                                  {val.toFixed(1)}%
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Klaviyo win-back flow performance */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="space-y-1 pb-2 border-b border-border/30">
              <h3 className="text-lg font-medium text-foreground tracking-tight">Klaviyo Winback Flows</h3>
              <p className="text-xs text-muted">Performance indices of automated customer recovery sequences</p>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="p-3 border border-border/10 rounded-xl space-y-2">
                    <Shimmer className="h-4 w-2/3" />
                    <div className="grid grid-cols-2 gap-2">
                      <Shimmer className="h-3 w-1/2" />
                      <Shimmer className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
              ) : (
                winbackFlowsData.map((flow) => (
                  <div
                    key={flow.name}
                    className="p-3 border border-border/10 rounded-xl bg-card/15 hover:border-primary/20 transition-all space-y-2"
                  >
                    <h4 className="text-xs font-bold text-foreground truncate">{flow.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-muted">
                      <div>
                        Open Rate: <span className="font-semibold text-foreground font-mono">{flow.openRate}%</span>
                      </div>
                      <div>
                        Click Rate: <span className="font-semibold text-foreground font-mono">{flow.clickRate}%</span>
                      </div>
                      <div>
                        Conversion: <span className="font-semibold text-foreground font-mono">{flow.conversionRate}%</span>
                      </div>
                      <div>
                        Rev/Send: <span className="font-semibold text-primary-glow font-mono">${flow.revenuePerSend.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* At-risk subscribers table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-border">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-lg font-medium text-foreground tracking-tight">At-Risk Subscribers Monitor</h3>
            <p className="text-xs text-muted">Identified accounts with elevated churn probabilities based on behavior signals and reviews.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/30 bg-card/25 text-muted font-semibold uppercase tracking-wider text-[9px]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Plan / Product</th>
                  <th className="p-4">Cycle Stage</th>
                  <th className="p-4 text-center">Risk Score</th>
                  <th className="p-4">AI Recommended Intervention</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-border/10">
                      <td className="p-4"><Shimmer className="h-4 w-20" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-28" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-12" /></td>
                      <td className="p-4 text-center"><Shimmer className="h-4 w-10 mx-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-52" /></td>
                      <td className="p-4"><Shimmer className="h-8 w-20 ml-auto" /></td>
                    </tr>
                  ))
                ) : atRiskList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted">
                      All accounts operating safely. No high-risk subscriber cohorts found.
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {atRiskList.map((sub) => (
                      <motion.tr
                        key={sub.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-border/10 hover:bg-card/15 transition-all align-middle"
                      >
                        <td className="p-4 font-semibold text-foreground">{sub.name}</td>
                        <td className="p-4 text-muted">{sub.plan}</td>
                        <td className="p-4 font-mono font-medium text-foreground">{sub.lifecycleStage}</td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
                              sub.riskScore >= 80
                                ? 'bg-rose-accent/15 text-rose-accent'
                                : sub.riskScore >= 70
                                ? 'bg-amber-accent/15 text-amber-accent'
                                : 'bg-secondary/15 text-secondary-glow'
                            }`}
                          >
                            {sub.riskScore}
                          </span>
                        </td>
                        <td className="p-4 text-muted leading-relaxed max-w-sm truncate" title={sub.intervention}>
                          {sub.intervention}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleIntervention(sub.id, sub.name)}
                            className="h-8 px-3 rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-semibold cursor-pointer transition-all hover:scale-[1.02] inline-flex items-center"
                          >
                            Take Action
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
