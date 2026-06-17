'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { reviewsMetrics } from '../../lib/mock/reviews';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { Star, MessageSquare, Plus, Share2, Megaphone, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function YotpoPage() {
  const { reviews, amplifyReview, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [filterSentiment, setFilterSentiment] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredReviews = reviews.filter((r) => {
    if (filterSentiment === 'all') return true;
    return r.sentiment === filterSentiment;
  });

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return 'bg-emerald-accent/15 text-emerald-accent border-emerald-accent/20';
    if (sentiment === 'neutral') return 'bg-amber-accent/15 text-amber-accent border-amber-accent/20';
    return 'bg-rose-accent/15 text-rose-accent border-rose-accent/20';
  };

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Yotpo & Reviews</h1>
          <p className="text-xs text-muted font-medium">Customer feedback loops, loyalty program tracking, and automated social proof amplification.</p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 space-y-2 relative overflow-hidden group">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Average Review Rating</span>
            <p className="text-2xl font-bold font-mono text-foreground flex items-center">
              {reviewsMetrics.averageRating} <Star className="w-5 h-5 ml-1.5 fill-amber-accent stroke-amber-accent animate-pulse" />
            </p>
            <p className="text-[10px] text-muted">Across {reviewsMetrics.totalReviews.toLocaleString()} total reviews</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 relative overflow-hidden group">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Review-Driven Revenue</span>
            <p className="text-2xl font-bold font-mono text-primary-glow">${reviewsMetrics.loyaltyRevenue.toLocaleString()}</p>
            <p className="text-[10px] text-muted">AOV driven by reviews content widgets</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 relative overflow-hidden group">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Referral Signups</span>
            <p className="text-2xl font-bold font-mono text-foreground">{reviewsMetrics.referralSignups} VIPs</p>
            <p className="text-[10px] text-muted">Customers converted by friend invites</p>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2 relative overflow-hidden group">
            <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Social Amplifications</span>
            <p className="text-2xl font-bold font-mono text-foreground">
              {reviews.filter((r) => r.status === 'amplified').length} Reviews
            </p>
            <p className="text-[10px] text-muted">Reviews synced to active ad managers</p>
          </div>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main review feed */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-border/30 gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-foreground tracking-tight">Live Feedback Feed</h3>
                <p className="text-xs text-muted">Real-time reviews matching Yotpo API syncs</p>
              </div>

              {/* Filtering tabs */}
              <div className="flex bg-card/45 rounded-lg p-0.5 border border-border text-[10px] font-bold">
                {['all', 'positive', 'neutral', 'negative'].map((sentiment) => (
                  <button
                    key={sentiment}
                    onClick={() => setFilterSentiment(sentiment)}
                    className={`px-2.5 py-1.5 rounded-md capitalize cursor-pointer transition-colors ${
                      filterSentiment === sentiment ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {sentiment}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="p-4 border border-border/10 rounded-xl space-y-3">
                    <div className="flex justify-between">
                      <Shimmer className="h-4 w-20" />
                      <Shimmer className="h-4 w-12" />
                    </div>
                    <Shimmer className="h-10 w-full" />
                  </div>
                ))
              ) : filteredReviews.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted">No reviews matching the active filters.</div>
              ) : (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-xl border border-border/10 bg-card/15 hover:border-border/30 transition-all space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-foreground">{review.author}</h4>
                        <div className="flex text-amber-accent">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating ? 'fill-amber-accent stroke-amber-accent' : 'text-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${getSentimentColor(review.sentiment)}`}>
                          {review.sentiment}
                        </span>
                        <span className="text-[9px] text-muted">{review.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed font-medium italic">
                      "{review.text}"
                    </p>

                    <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-border/10">
                      <span className="text-muted">Product: <span className="font-semibold text-foreground">{review.productName}</span></span>
                      
                      {review.status === 'amplified' ? (
                        <span className="text-emerald-accent font-bold flex items-center">
                          <Check className="w-3.5 h-3.5 mr-0.5" /> Amplified Yotpo Widget
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => amplifyReview(review.id, 'Klaviyo Segment')}
                            className="h-6 px-2.5 rounded-md border border-border hover:border-primary/50 text-muted hover:text-foreground font-semibold cursor-pointer transition-colors"
                          >
                            Klaviyo
                          </button>
                          <button
                            onClick={() => amplifyReview(review.id, 'Meta Ads')}
                            className="h-6 px-2.5 rounded-md bg-primary hover:bg-primary-glow text-white font-bold cursor-pointer transition-all hover:scale-[1.02]"
                          >
                            Amplify to Meta
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top converting reviews card */}
          <div className="glass-card rounded-2xl p-6 space-y-6">
            <div className="space-y-1 pb-2 border-b border-border/30">
              <h3 className="text-lg font-medium text-foreground tracking-tight">Top Social Proof</h3>
              <p className="text-xs text-muted font-medium">Reviews generating highest click-conversion rates</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-primary-glow font-bold uppercase tracking-wider flex items-center">
                    <Megaphone className="w-3.5 h-3.5 mr-1" /> Meta Ad Favorite
                  </span>
                  <span className="font-mono font-semibold text-foreground">4.82% Conv.</span>
                </div>
                <p className="text-[11px] text-muted italic">"I noticed a difference in my skin texture in just one cycle..."</p>
                <p className="text-[9px] text-muted font-semibold text-right">— Sarah M.</p>
              </div>

              <div className="p-4 rounded-xl border border-secondary/20 bg-secondary/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-secondary-glow font-bold uppercase tracking-wider flex items-center">
                    <Share2 className="w-3.5 h-3.5 mr-1" /> Landing Hero Placement
                  </span>
                  <span className="font-mono font-semibold text-foreground">3.95% Conv.</span>
                </div>
                <p className="text-[11px] text-muted italic">"Best tasting superfood greens. Bloating completely gone..."</p>
                <p className="text-[9px] text-muted font-semibold text-right">— Kaitlyn S.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
