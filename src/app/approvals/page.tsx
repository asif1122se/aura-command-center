'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { PageTransition } from '../../components/PageTransition';
import { Check, X, Shield, Sparkles, TrendingUp, Cpu, UserCheck, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApprovalsPage() {
  const { approvals, approveAction, declineAction } = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Colors mapping based on confidence score
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-emerald-accent border-emerald-accent/30 bg-emerald-accent/5';
    if (score >= 80) return 'text-amber-accent border-amber-accent/30 bg-amber-accent/5';
    return 'text-rose-accent border-rose-accent/30 bg-rose-accent/5';
  };

  const getConfidenceTrackColor = (score: number) => {
    if (score >= 90) return 'var(--emerald-accent)';
    if (score >= 80) return 'var(--amber-accent)';
    return 'var(--rose-accent)';
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Governance & Approvals</h1>
            <p className="text-xs text-muted font-medium">Review and authorize autonomous marketing adjustments, email triggers, and ad reallocations.</p>
          </div>
          
          {/* Legend indicator bar */}
          <div className="flex flex-wrap gap-3 p-3 bg-card/20 border border-border/10 rounded-xl text-[10px] text-muted font-semibold items-center select-none max-w-lg">
            <span className="flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1 text-primary-glow" /> AI Recommends
            </span>
            <span>·</span>
            <span className="flex items-center">
              <UserCheck className="w-3.5 h-3.5 mr-1 text-amber-accent" /> Human Approval Required
            </span>
            <span>·</span>
            <span className="flex items-center">
              <Settings className="w-3.5 h-3.5 mr-1 text-emerald-accent animate-spin-slow" /> Fully Automated
            </span>
          </div>
        </div>

        {/* Governance banner info */}
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary flex items-start space-x-4">
          <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 glow-primary" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Human-in-the-Loop Safeguards Active</h3>
            <p className="text-xs text-muted leading-relaxed">
              All campaigns with proposed budgets exceeding $500, or copy shifts targeting segments above 10,000 users, are automatically held in this queue. Aura Wellness Co. maintains manual signing keys for full compliance.
            </p>
          </div>
        </div>

        {/* Approvals Cards Grid */}
        <div className="flex-1 flex flex-col">
          {approvals.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-accent/10 border border-emerald-accent/25 flex items-center justify-center text-emerald-accent">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Approvals Queue Clear</h3>
              <p className="text-xs text-muted max-w-sm leading-relaxed">
                All AI-prepared campaign targets and budget allocations have been reviewed. Rest easy — the command center is executing active protocols.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <AnimatePresence mode="popLayout">
                {approvals.map((approval) => {
                  const circleRadius = 20;
                  const circleCircumference = 2 * Math.PI * circleRadius;
                  const dashOffset = circleCircumference - (approval.confidenceScore / 100) * circleCircumference;

                  return (
                    <motion.div
                      key={approval.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      className="glass-card rounded-2xl p-6 border border-border/10 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-primary/20"
                    >
                      {/* Top banner details */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-primary-glow bg-primary/15 border border-primary/25 px-2 py-0.5 rounded">
                            {approval.type}
                          </span>
                          <h3 className="text-sm font-semibold text-foreground leading-snug pt-2">
                            {approval.action}
                          </h3>
                        </div>

                        {/* Confidence circle */}
                        <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                          <svg width="48" height="48" className="transform -rotate-90">
                            <circle cx="24" cy="24" r={circleRadius} fill="transparent" stroke="var(--border)" strokeWidth="3" />
                            <circle
                              cx="24"
                              cy="24"
                              r={circleRadius}
                              fill="transparent"
                              stroke={getConfidenceTrackColor(approval.confidenceScore)}
                              strokeWidth="3"
                              strokeDasharray={circleCircumference}
                              strokeDashoffset={dashOffset}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-[10px] font-mono font-bold text-foreground">
                            {approval.confidenceScore}%
                          </span>
                        </div>
                      </div>

                      {/* Content descriptions */}
                      <div className="space-y-3 text-xs leading-relaxed">
                        <div className="p-3.5 rounded-xl bg-card/20 border border-border/10 space-y-1.5">
                          <span className="block text-[9px] uppercase tracking-wider font-bold text-muted">
                            Data Rationale
                          </span>
                          <p className="text-muted">{approval.reasoning}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/10 space-y-1.5">
                          <span className="block text-[9px] uppercase tracking-wider font-bold text-primary-glow flex items-center">
                            Projected Impact <TrendingUp className="w-3 h-3 ml-1" />
                          </span>
                          <p className="text-muted font-medium">{approval.projectedImpact}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-border/20 flex justify-between items-center text-xs">
                        <span className="text-muted text-[10px] font-semibold flex items-center">
                          <Sparkles className="w-3.5 h-3.5 mr-1 text-primary-glow" /> AI recommendation
                        </span>
                        
                        <div className="flex items-center space-x-2.5">
                          <button
                            onClick={() => declineAction(approval.id)}
                            className="h-8 px-3.5 rounded-lg border border-border text-muted hover:text-rose-accent hover:border-rose-accent/40 font-semibold cursor-pointer transition-colors inline-flex items-center"
                          >
                            <X className="w-4 h-4 mr-1" /> Decline
                          </button>
                          <button
                            onClick={() => approveAction(approval.id)}
                            className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-glow text-white font-bold cursor-pointer transition-all hover:scale-[1.02] glow-primary inline-flex items-center"
                          >
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
}
