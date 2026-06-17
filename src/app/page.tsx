'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { metricsData } from '../lib/mock/metrics';
import { revenueData } from '../lib/mock/revenue';
import { StatCard } from '../components/StatCard';
import { ChartCard } from '../components/ChartCard';
import { AreaChart } from '../components/charts/AreaChart';
import { GaugeRadial } from '../components/GaugeRadial';
import { PageTransition } from '../components/PageTransition';
import { Shimmer, CardSkeleton } from '../components/Shimmer';
import { StatusBadge } from '../components/StatusBadge';
import {
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Check,
  X,
  PlusCircle,
  Target,
  BellRing,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyBriefingPage() {
  const { dateRange, approvals, approveAction, declineAction, alerts, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Selected dataset
  const activeMetrics = metricsData[dateRange];
  const activeRevenue = revenueData[dateRange];

  // AI Briefing copy based on date filter
  const getAiSummary = () => {
    switch (dateRange) {
      case 'today':
        return 'Yesterday\'s net revenue was $46.2k, pacing 4.1% ahead of goal. Churn remains suppressed at 4.68%, but a 24% spike in Sleep Restore skips warrants attention.';
      case '7d':
        return 'Weekly performance aggregates to $318.4k, on track to meet our month-end targets. Acquisition costs are slightly elevated due to TikTok ad fatigue.';
      default:
        return 'MTD aggregate revenue stands at $1.38M, pacing +8.5% MoM. While Shopify store orders are growing at 12.4%, Recharge subscription skips increased by 4% following recent Sleep Restore reviews.';
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Action items (taken from pending approvals for interactive demo)
  const briefingActions = approvals.slice(0, 3);
  const activeAlerts = alerts.filter((a) => !a.resolved).slice(0, 2);

  // Container variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Welcome Header & AI Summarizer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center">
              Good morning, Kelli <Sparkles className="w-5 h-5 ml-2 text-primary-glow animate-pulse" />
            </h1>
            <p className="text-xs text-muted font-medium">{formattedDate} · Head of E-commerce</p>
          </div>

          {/* Inline AI Summary bubble */}
          <div className="glass-card rounded-2xl px-4 py-3 border-l-4 border-l-primary flex items-start space-x-3 max-w-xl">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted leading-relaxed">
              <span className="font-semibold text-foreground">Aura Briefing:</span> {getAiSummary()}
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* KPI Stat Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-32 glass-card rounded-2xl p-6 space-y-4">
                  <Shimmer className="h-4 w-2/3" />
                  <Shimmer className="h-8 w-1/2" />
                  <Shimmer className="h-3 w-1/3" />
                </div>
              ))
            ) : (
              <>
                <StatCard {...activeMetrics.revenue} loading={loading} />
                <StatCard {...activeMetrics.mrr} loading={loading} />
                <StatCard {...activeMetrics.subscribers} loading={loading} />
                <StatCard {...activeMetrics.churn} loading={loading} />
                <StatCard {...activeMetrics.roas} loading={loading} />
              </>
            )}
          </div>

          {/* Main Chart & Radial Goal Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Area trend chart */}
            <div className="lg:col-span-2">
              <ChartCard
                title="Revenue Performance Trend"
                subtitle="DTC aggregate gross sales over selected date range"
              >
                {loading ? (
                  <div className="w-full h-[260px] flex items-center justify-center">
                    <Shimmer className="w-full h-full rounded-xl" />
                  </div>
                ) : (
                  <AreaChart
                    data={activeRevenue}
                    xKey="date"
                    dataKeys={['revenue', 'subscriptionRevenue']}
                    colors={['#14B8A6', '#6366F1']}
                    formatYAxis={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                )}
              </ChartCard>
            </div>

            {/* Radial gauge pacing */}
            <div>
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-center items-center h-full">
                {loading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-8">
                    <Shimmer className="w-32 h-32 rounded-full" />
                    <Shimmer className="h-4 w-1/2" />
                  </div>
                ) : (
                  <GaugeRadial
                    value={dateRange === 'today' ? 102 : dateRange === '7d' ? 98 : 68}
                    title="Revenue vs Monthly Goal"
                    subtitle={
                      dateRange === 'today'
                        ? 'Pacing +2.5% ahead of target'
                        : dateRange === '7d'
                        ? 'On target'
                        : 'On track to hit stretch target'
                    }
                    goalValue="$1,450,000 MTD"
                  />
                )}
              </div>
            </div>

          </div>

          {/* Tasks & Alerts Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Prioritized AI To-Dos */}
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
                    AI Prioritized Actions
                    <span className="ml-2.5 px-2 py-0.5 text-[10px] bg-primary/20 text-primary-glow font-bold rounded-full">
                      {approvals.length} Queue
                    </span>
                  </h3>
                  <p className="text-xs text-muted">Review, adjust, and approve autonomous campaign triggers</p>
                </div>
                <Link
                  href="/approvals"
                  className="text-xs text-primary-glow hover:underline flex items-center font-semibold"
                >
                  View Queue <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              {briefingActions.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-accent/10 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 text-emerald-accent" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">Action Queue Clear</h4>
                  <p className="text-xs text-muted">All AI-prepared adjustments have been resolved.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {briefingActions.map((action) => (
                      <motion.div
                        key={action.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="p-4 rounded-xl border border-border/10 bg-card/20 hover:bg-card/40 hover:border-primary/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group/action"
                      >
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] uppercase font-bold text-primary-glow bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                              {action.type}
                            </span>
                            <span className="text-[10px] font-semibold text-muted">
                              Confidence {action.confidenceScore}%
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-foreground">
                            {action.action}
                          </p>
                          <p className="text-[11px] text-muted leading-relaxed">
                            {action.reasoning}
                          </p>
                        </div>

                        {/* Direct actions */}
                        <div className="flex items-center space-x-2 self-end md:self-center">
                          <button
                            onClick={() => declineAction(action.id)}
                            className="p-1.5 rounded-lg border border-border text-muted hover:text-rose-accent hover:border-rose-accent/40 cursor-pointer transition-colors"
                            title="Decline"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => approveAction(action.id)}
                            className="h-8 px-3 rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-semibold flex items-center cursor-pointer transition-all glow-primary hover:scale-[1.02]"
                          >
                            Approve
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Anomalies & Live Feed */}
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
                    Alerts & Monitor Feed
                    <span className="ml-2.5 w-2 h-2 bg-rose-accent rounded-full animate-ping" />
                  </h3>
                  <p className="text-xs text-muted">Real-time system health and critical funnel deviation alerts</p>
                </div>
                <Link
                  href="/alerts"
                  className="text-xs text-primary-glow hover:underline flex items-center font-semibold"
                >
                  See dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

              {activeAlerts.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted flex flex-col items-center space-y-1">
                  <Check className="w-8 h-8 text-emerald-accent mb-2" />
                  <span>No system anomalies or degrading integrations found.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-xl border border-border/10 bg-card/25 flex items-start space-x-3.5 hover:border-border/30 transition-all"
                    >
                      <div className="mt-0.5">
                        <StatusBadge status={alert.severity} />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-bold text-muted tracking-wide">
                            {alert.source}
                          </span>
                          <span className="text-[9px] text-muted">{alert.timestamp}</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground leading-normal">
                          {alert.message}
                        </p>
                        <p className="text-[11px] text-muted leading-relaxed">
                          <span className="font-medium text-foreground">Fix:</span> {alert.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Visual warning dot legend */}
                  <div className="pt-2 flex items-center justify-between text-[10px] text-muted border-t border-border/20">
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-rose-accent mr-1.5" /> Critical Action Required
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-accent mr-1.5" /> Warning / Degradation
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-secondary mr-1.5" /> Info System Updates
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </PageTransition>
  );
}
