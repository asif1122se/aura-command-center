'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { productsData } from '../../lib/mock/products';
import { Sparkline } from '../../components/Sparkline';
import { StatusBadge } from '../../components/StatusBadge';
import { PageTransition } from '../../components/PageTransition';
import { AreaChart } from '../../components/charts/AreaChart';
import { Shimmer } from '../../components/Shimmer';
import { X, Sparkles, AlertCircle, ShoppingBag, Eye, Heart, MessageSquare, Ticket } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const { dateRange, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeProducts = productsData[dateRange];

  // Recommendations panel
  const recommendedActions = [
    {
      type: 'amplify',
      title: 'Double-Down on Daily Greens',
      description: 'Daily Greens is pacing +12% MoM with a 78% subscription attach rate. Reallocate $500/day from stagnant products to fund meta retargeting ad campaigns.',
      actionText: 'Execute Budget Shift',
    },
    {
      type: 'intervene',
      title: 'Address Sleep Restore SKU Skips',
      description: 'Sleep Restore Gummies skip rate increased by 24% after reviews mentioned flavor shifts. Delay automated renewal notifications and email an explanation to affected cohorts.',
      actionText: 'Queue Explanation Campaign',
    }
  ];

  const handleActionClick = (actionName: string) => {
    toast.success('Strategy Initiated', {
      description: `Successfully executed: "${actionName}"`,
    });
  };

  // Generate trend points for the detail chart modal
  const getProductDetailChartData = (trendArray: number[]) => {
    return trendArray.map((val, idx) => ({
      day: `Day ${idx + 1}`,
      sales: val,
    }));
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col relative">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Product Intelligence</h1>
          <p className="text-xs text-muted font-medium">SKU-level margins, attachment trends, support feedback metrics, and automated listing suggestions.</p>
        </div>

        {/* Product SKU Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-border">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-lg font-medium text-foreground tracking-tight">SKU Health & Performance Matrix</h3>
            <p className="text-xs text-muted">Complete overview of sales volume, conversion rates, subscription capture, and customer sentiment score.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs align-middle">
              <thead>
                <tr className="border-b border-border/30 bg-card/25 text-muted font-semibold uppercase tracking-wider text-[9px]">
                  <th className="p-4">SKU Name</th>
                  <th className="p-4 text-right">Units Sold</th>
                  <th className="p-4 text-right">Revenue</th>
                  <th className="p-4 text-right">Conv. Rate</th>
                  <th className="p-4 text-right">Sub. Attach %</th>
                  <th className="p-4">Sentiment</th>
                  <th className="p-4 text-center">Trend (7d)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="border-b border-border/10">
                      <td className="p-4"><Shimmer className="h-4 w-32" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-12 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-16 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-10 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-10 ml-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-16" /></td>
                      <td className="p-4 text-center"><Shimmer className="h-6 w-16 mx-auto" /></td>
                      <td className="p-4"><Shimmer className="h-4 w-14" /></td>
                      <td className="p-4"><Shimmer className="h-8 w-14 ml-auto" /></td>
                    </tr>
                  ))
                ) : (
                  activeProducts.map((product) => (
                    <tr key={product.id} className="border-b border-border/10 hover:bg-card/10 transition-colors">
                      <td className="p-4 font-semibold text-foreground">{product.name}</td>
                      <td className="p-4 font-mono text-right text-foreground font-semibold">{product.unitsSold.toLocaleString()}</td>
                      <td className="p-4 font-mono text-right text-foreground font-semibold">${product.revenue.toLocaleString()}</td>
                      <td className="p-4 font-mono text-right text-foreground font-semibold">{product.conversionRate.toFixed(2)}%</td>
                      <td className="p-4 font-mono text-right text-foreground font-semibold">{product.subAttachRate.toFixed(1)}%</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-foreground text-tabular">{product.reviewsSentiment}%</span>
                          <div className="w-12 bg-border/20 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                product.reviewsSentiment >= 90
                                  ? 'bg-emerald-accent'
                                  : product.reviewsSentiment >= 80
                                  ? 'bg-amber-accent'
                                  : 'bg-rose-accent'
                              }`}
                              style={{ width: `${product.reviewsSentiment}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-block">
                          <Sparkline data={product.sparkline} color={product.status === 'declining' ? '#FB7185' : '#14B8A6'} width={64} height={20} />
                        </div>
                      </td>
                      <td className="p-4"><StatusBadge status={product.status} /></td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="h-8 px-3 rounded-lg border border-border hover:border-primary/50 text-muted hover:text-foreground text-xs font-semibold cursor-pointer transition-colors inline-flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Actions Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedActions.map((rec, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                  rec.type === 'amplify'
                    ? 'bg-emerald-accent/15 text-emerald-accent border-emerald-accent/20'
                    : 'bg-rose-accent/15 text-rose-accent border-rose-accent/20'
                }`}>
                  {rec.type === 'amplify' ? 'Amplify' : 'Intervene'} Strategy
                </span>
                <h3 className="text-base font-semibold text-foreground flex items-center">
                  {rec.title}
                  <Sparkles className="w-4 h-4 ml-1.5 text-primary-glow" />
                </h3>
                <p className="text-xs text-muted leading-relaxed">{rec.description}</p>
              </div>
              <button
                onClick={() => handleActionClick(rec.title)}
                className={`self-start h-8 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  rec.type === 'amplify'
                    ? 'bg-primary hover:bg-primary-glow text-white glow-primary'
                    : 'bg-rose-accent hover:bg-rose-accent/80 text-white'
                }`}
              >
                {rec.actionText}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Inspect Modal Dialog */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative bg-brand-navy border border-border w-full max-w-2xl rounded-2xl shadow-2xl p-6 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
              >
                {/* Close trigger */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg border border-border text-muted hover:text-foreground cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header details */}
                <div className="space-y-4 pb-4 border-b border-border/30">
                  <div className="flex items-center space-x-2.5">
                    <ShoppingBag className="w-5 h-5 text-primary-glow" />
                    <h2 className="text-xl font-bold text-foreground">{selectedProduct.name}</h2>
                    <StatusBadge status={selectedProduct.status} />
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center bg-card/20 border border-border/10 p-3 rounded-xl font-mono text-xs text-muted">
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-bold tracking-wider">Units</span>
                      <span className="font-semibold text-foreground text-tabular">{selectedProduct.unitsSold}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-bold tracking-wider">Revenue</span>
                      <span className="font-semibold text-primary-glow text-tabular">${selectedProduct.revenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-bold tracking-wider">Attach %</span>
                      <span className="font-semibold text-foreground text-tabular">{selectedProduct.subAttachRate}%</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-muted uppercase font-bold tracking-wider">Sentiment</span>
                      <span className="font-semibold text-foreground text-tabular">{selectedProduct.reviewsSentiment}%</span>
                    </div>
                  </div>
                </div>

                {/* Body Details: Sales Trend + Support volume */}
                <div className="py-6 space-y-6">
                  {/* Sales trend chart */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-foreground">Sales Trend (Last 7 Days)</h3>
                    <div className="h-44 w-full bg-card/10 border border-border/10 rounded-xl p-3">
                      <AreaChart
                        data={getProductDetailChartData(selectedProduct.details.trend)}
                        xKey="day"
                        dataKeys={['sales']}
                        colors={['#14B8A6']}
                        formatYAxis={(val) => Math.round(val).toString()}
                      />
                    </div>
                  </div>

                  {/* Customer health indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/15 bg-card/25 space-y-2 flex items-start space-x-3.5">
                      <Ticket className="w-5 h-5 text-amber-accent flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Gorgias Tickets</span>
                        <p className="text-xl font-bold font-mono text-foreground text-tabular">
                          {selectedProduct.details.contactVolume} tickets
                        </p>
                        <p className="text-[10px] text-muted leading-relaxed">Active customer complaints and support queues in Gorgias helpdesk.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border/15 bg-card/25 space-y-2 flex items-start space-x-3.5">
                      <Heart className="w-5 h-5 text-rose-accent flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Review Volume</span>
                        <p className="text-xl font-bold font-mono text-foreground text-tabular">Yotpo High</p>
                        <p className="text-[10px] text-muted leading-relaxed">High volume of customer comments matching product ingredients.</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestion box */}
                  <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-start space-x-3.5">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="space-y-1 leading-relaxed">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center">
                        AI Operational Recommendation <Sparkles className="w-3.5 h-3.5 ml-1 text-primary-glow" />
                      </h4>
                      <p className="text-xs text-muted">{selectedProduct.details.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Footer trigger */}
                <div className="pt-4 border-t border-border/30 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="h-9 px-4 rounded-lg border border-border text-muted hover:text-foreground text-xs font-semibold cursor-pointer hover:bg-card/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleActionClick(`Deploy optimization for ${selectedProduct.name}`);
                      setSelectedProduct(null);
                    }}
                    className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-bold cursor-pointer transition-all hover:scale-[1.02] glow-primary"
                  >
                    Apply AI Strategy
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
