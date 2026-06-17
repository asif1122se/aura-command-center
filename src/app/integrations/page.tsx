'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { Cpu, Check, AlertTriangle } from 'lucide-react';
import { Switch } from '@radix-ui/react-switch'; // Or simple custom toggles
import { motion } from 'framer-motion';

export default function IntegrationsPage() {
  const { integrations, toggleIntegration, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">System Integrations</h1>
          <p className="text-xs text-muted font-medium">Link storefront APIs, media tracking pixels, support systems, and content distributors.</p>
        </div>

        {/* Ecosystem header info */}
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary flex items-start space-x-4">
          <Cpu className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 glow-primary" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">API Sync Status</h3>
            <p className="text-xs text-muted leading-relaxed">
              Aura synchronizes and scrapes storefront performance databases twice hourly. Disconnecting an active channel immediately halts AI ingestion workflows and active optimization triggers.
            </p>
          </div>
        </div>

        {/* Grid of integrations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <Shimmer className="h-6 w-24" />
                  <Shimmer className="h-6 w-10 rounded-full" />
                </div>
                <Shimmer className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            integrations.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-5 border border-border/10 hover:border-primary/20 transition-all relative overflow-hidden group"
              >
                {/* Logo top bar */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                    <p className="text-[10px] text-muted font-mono">ID: {item.id}_api</p>
                  </div>
                  
                  {/* Status Indicator circle */}
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${
                    item.connected ? 'bg-emerald-accent animate-pulse' : 'bg-muted/30'
                  }`} />
                </div>

                {/* Switch row */}
                <div className="pt-2 border-t border-border/10 flex justify-between items-center text-xs">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Sync State</span>
                    <span className="text-[10px] text-muted leading-none">Last sync: {item.lastSync}</span>
                  </div>

                  {/* High quality custom switch wrapper */}
                  <button
                    onClick={() => toggleIntegration(item.id)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full cursor-pointer transition-colors duration-300 ${
                      item.connected ? 'bg-primary' : 'bg-muted/20'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-300 ${
                        item.connected ? 'translate-x-5.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </PageTransition>
  );
}
