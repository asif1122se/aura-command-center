'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { systemHealthStatus } from '../../lib/mock/alerts';
import { StatusBadge } from '../../components/StatusBadge';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { AlertCircle, ShieldAlert, AlertTriangle, Info, Check, CheckSquare, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertsPage() {
  const { alerts, resolveAlert, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredAlerts = alerts.filter((a) => showResolved ? true : !a.resolved);

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ShieldAlert className="w-5 h-5 text-rose-accent flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-accent flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-secondary-glow flex-shrink-0" />;
    }
  };

  const getBorderColor = (severity: string, resolved: boolean) => {
    if (resolved) return 'border-border/10 bg-card/10';
    if (severity === 'critical') return 'border-rose-accent/20 bg-rose-accent/5 hover:border-rose-accent/30';
    if (severity === 'warning') return 'border-amber-accent/20 bg-amber-accent/5 hover:border-amber-accent/30';
    return 'border-secondary/20 bg-secondary/5 hover:border-secondary/30';
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Alerts & Monitoring</h1>
          <p className="text-xs text-muted font-medium">Real-time system diagnostics, platform integrations health checks, and anomaly event streams.</p>
        </div>

        {/* System Health Status Row */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="pb-2 border-b border-border/30 flex justify-between items-center">
            <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
              Integration Ecosystem Status <HeartPulse className="w-5 h-5 ml-1.5 text-primary-glow animate-pulse" />
            </h3>
            <span className="text-[10px] uppercase font-bold text-emerald-accent bg-emerald-accent/15 px-2 py-0.5 rounded border border-emerald-accent/20">
              9/10 Connected
            </span>
          </div>

          {/* Connected grids */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {systemHealthStatus.map((sys) => (
              <div
                key={sys.id}
                className="p-3 border border-border/10 bg-card/20 rounded-xl flex items-center justify-between"
              >
                <span className="text-[11px] font-semibold text-foreground truncate mr-2">{sys.name}</span>
                <span className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-1.5 ${
                      sys.status === 'operational'
                        ? 'bg-emerald-accent animate-pulse'
                        : 'bg-amber-accent animate-ping'
                    }`}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted">
                    {sys.status === 'operational' ? 'OK' : 'ERR'}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed list */}
        <div className="glass-card rounded-2xl p-6 space-y-6 flex-1 flex flex-col">
          <div className="pb-2 border-b border-border/30 flex justify-between items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-foreground tracking-tight">Real-Time Anomaly Stream</h3>
              <p className="text-xs text-muted">Active event triggers captured from customer channels (auto-updates every 45s)</p>
            </div>

            {/* Toggle state */}
            <div className="flex bg-card/45 rounded-lg p-0.5 border border-border text-[10px] font-bold shrink-0">
              <button
                onClick={() => setShowResolved(false)}
                className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                  !showResolved ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setShowResolved(true)}
                className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                  showResolved ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                All Events
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="p-4 border border-border/10 rounded-xl space-y-3">
                  <div className="flex justify-between">
                    <Shimmer className="h-4 w-28" />
                    <Shimmer className="h-4 w-12" />
                  </div>
                  <Shimmer className="h-10 w-full" />
                </div>
              ))
            ) : filteredAlerts.length === 0 ? (
              <div className="py-20 text-center text-xs text-muted flex flex-col items-center justify-center space-y-2">
                <CheckSquare className="w-8 h-8 text-emerald-accent" />
                <span>All event buffers empty. No pending anomalies flagged.</span>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start gap-4 transition-all ${getBorderColor(
                      alert.severity,
                      alert.resolved
                    )}`}
                  >
                    <div className="flex items-start space-x-3.5 flex-1">
                      <div className="mt-0.5">{getAlertIcon(alert.severity)}</div>
                      <div className="space-y-1.5 leading-relaxed">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold text-muted tracking-wide">
                            {alert.source}
                          </span>
                          <span className="text-[9px] text-muted">{alert.timestamp}</span>
                          {alert.resolved && (
                            <span className="text-[9px] font-bold text-emerald-accent uppercase tracking-wider bg-emerald-accent/10 border border-emerald-accent/20 px-1.5 py-0.2 rounded">
                              Resolved
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-foreground leading-snug">
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          <span className="font-semibold text-foreground">Action recommendation:</span> {alert.recommendation}
                        </p>
                      </div>
                    </div>

                    {!alert.resolved && (
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="h-8 px-4 rounded-lg bg-emerald-accent hover:bg-emerald-accent/80 text-brand-navy text-xs font-bold cursor-pointer transition-all self-end sm:self-center shrink-0 flex items-center"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" /> Resolve Alert
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
