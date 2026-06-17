'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { calendarPosts, contentTrends } from '../../lib/mock/content';
import { PageTransition } from '../../components/PageTransition';
import { Shimmer } from '../../components/Shimmer';
import { Calendar, Instagram, MessageCircle, Pin, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContentPage() {
  const { dateRange, loading } = useDashboard();
  const [mounted, setMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(2); // Default to day 2 (first post)
  const [copiedHook, setCopiedHook] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Render a 30-day calendar for June 2026
  // June 1, 2026 starts on a Monday
  const totalDays = 30;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Get posts on a specific day
  const getPostsForDay = (day: number) => {
    return calendarPosts.filter((p) => p.day === day);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-3 h-3 text-rose-accent flex-shrink-0" />;
      case 'TikTok':
        return <MessageCircle className="w-3 h-3 text-primary-glow flex-shrink-0" />;
      default:
        return <Pin className="w-3 h-3 text-secondary-glow flex-shrink-0" />;
    }
  };

  const getPlatformClass = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'bg-rose-accent/10 text-rose-accent border-rose-accent/20';
      case 'TikTok':
        return 'bg-primary/10 text-primary-glow border-primary/20';
      default:
        return 'bg-secondary/10 text-secondary-glow border-secondary/20';
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(text);
    toast.success(`${label} Copied`, { description: 'Content copied to clipboard.' });
    setTimeout(() => setCopiedHook(null), 2000);
  };

  const selectedDayPosts = selectedDay ? getPostsForDay(selectedDay) : [];

  return (
    <PageTransition>
      <div className="space-y-8 flex-1 flex flex-col">
        {/* Header section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Social & Content Intelligence</h1>
          <p className="text-xs text-muted font-medium">Monthly multi-channel content calendar, hook suggestions, compliance checks, and trend indicators.</p>
        </div>

        {/* Grid Split: Calendar + Selection Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* 30 Day Calendar Grid Container */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/30">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
                  Content Planner <Calendar className="w-4 h-4 ml-1.5 text-primary-glow" />
                </h3>
                <p className="text-xs text-muted">June 2026 campaign timeline scheduling</p>
              </div>
              <span className="text-xs font-bold text-foreground bg-card/40 border border-border px-3 py-1 rounded-xl">
                June 2026
              </span>
            </div>

            {/* Calendar Layout */}
            <div className="space-y-1">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted font-bold uppercase tracking-wider py-1">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>

              {/* Grid cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {daysArray.map((day) => {
                  const posts = getPostsForDay(day);
                  const isSelected = selectedDay === day;
                  const hasPosts = posts.length > 0;

                  return (
                    <div
                      key={day}
                      onClick={() => hasPosts && setSelectedDay(day)}
                      className={`min-h-[76px] rounded-xl border p-2 flex flex-col justify-between transition-all select-none ${
                        hasPosts
                          ? 'cursor-pointer hover:border-primary/50'
                          : 'cursor-default opacity-40'
                      } ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-md glow-primary'
                          : 'border-border/10 bg-card/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold font-mono text-muted">{day}</span>
                      
                      {/* Platform dots indicators */}
                      <div className="space-y-1">
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className={`flex items-center text-[8px] px-1 py-0.5 rounded border leading-tight ${getPlatformClass(
                              post.platform
                            )}`}
                          >
                            <span className="mr-1">{getPlatformIcon(post.platform)}</span>
                            <span className="truncate max-w-[40px] font-semibold">{post.platform.slice(0, 3)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selection Detail Panel */}
          <div className="glass-card rounded-2xl p-6 space-y-6 min-h-[460px] flex flex-col justify-between">
            <div className="space-y-4 flex-1">
              <div className="pb-2 border-b border-border/30 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Post Specifications
                </h3>
                <span className="text-xs font-mono font-bold text-primary-glow bg-primary/10 border border-primary/20 px-2 py-0.2 rounded">
                  {selectedDay ? `Jun ${selectedDay}` : 'Select Date'}
                </span>
              </div>

              {selectedDayPosts.length === 0 ? (
                <div className="py-20 text-center text-xs text-muted flex flex-col items-center justify-center space-y-1.5">
                  <AlertCircle className="w-8 h-8 text-muted/30" />
                  <span>No content scheduled for this date.</span>
                </div>
              ) : (
                <div className="space-y-5">
                  {selectedDayPosts.map((post) => (
                    <div key={post.id} className="space-y-4">
                      {/* Platform header */}
                      <div className="flex justify-between items-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${getPlatformClass(post.platform)}`}>
                          <span className="mr-1">{getPlatformIcon(post.platform)}</span>
                          {post.platform}
                        </span>
                        <span className="text-[10px] font-medium text-foreground">{post.title}</span>
                      </div>

                      {/* Hook options */}
                      <div className="space-y-2">
                        <span className="block text-[9px] uppercase tracking-wider font-bold text-muted">Hook Variants</span>
                        <div className="space-y-1.5">
                          {post.hooks.map((hook, hidx) => (
                            <div
                              key={hidx}
                              onClick={() => handleCopyText(hook, `Hook #${hidx + 1}`)}
                              className="p-2 rounded-lg border border-border/10 bg-card/25 hover:border-primary/20 hover:bg-card/45 transition-colors cursor-pointer flex justify-between items-center text-[10px] text-muted font-medium"
                            >
                              <span className="truncate mr-4 leading-normal">"{hook}"</span>
                              {copiedHook === hook ? (
                                <Check className="w-3 h-3 text-emerald-accent flex-shrink-0" />
                              ) : (
                                <Copy className="w-3 h-3 text-muted/40 group-hover:text-foreground flex-shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Caption copy */}
                      <div className="space-y-2">
                        <span className="block text-[9px] uppercase tracking-wider font-bold text-muted">Caption Draft</span>
                        <div className="p-3 border border-border/10 bg-card/25 rounded-xl text-[10px] text-muted relative group">
                          <p className="leading-relaxed">{post.captionDraft}</p>
                          <p className="text-primary-glow font-mono font-semibold pt-2">{post.hashtags.join(' ')}</p>
                          <button
                            onClick={() => handleCopyText(`${post.captionDraft} ${post.hashtags.join(' ')}`, 'Caption')}
                            className="absolute top-2 right-2 p-1 bg-brand-navy rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-muted hover:text-foreground"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Compliance notes */}
                      <div className="p-3 rounded-xl border border-rose-accent/20 bg-rose-accent/5 flex items-start space-x-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-accent flex-shrink-0 mt-0.5" />
                        <div className="space-y-0.5 text-[9px] leading-relaxed">
                          <span className="block font-bold text-rose-accent uppercase">FDA Compliance Safeguard</span>
                          <p className="text-muted">{post.complianceNote}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedDayPosts.length > 0 && (
              <button
                onClick={() => toast.success('Social Post Scheduled!', { description: 'Synced with Buffer / Sprout Social.' })}
                className="h-8 w-full rounded-lg bg-primary hover:bg-primary-glow text-white text-xs font-bold transition-all glow-primary hover:scale-[1.01] cursor-pointer"
              >
                Schedule & Queue Draft
              </button>
            )}
          </div>

        </div>

        {/* Trend Monitor Feed */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <div className="pb-2 border-b border-border/30 space-y-1">
            <h3 className="text-lg font-medium text-foreground tracking-tight flex items-center">
              AI Trend Monitor <Sparkles className="w-4 h-4 ml-1.5 text-primary-glow" />
            </h3>
            <p className="text-xs text-muted font-medium">Scraped social conversations, active hooks, and operational marketing prompts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contentTrends.map((trend) => (
              <div
                key={trend.id}
                className="p-4 rounded-xl border border-border/10 bg-card/15 hover:border-primary/25 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-primary-glow font-bold uppercase tracking-wider">{trend.topic}</span>
                    <span className="text-muted font-semibold bg-card px-2 py-0.5 rounded border border-border">{trend.platform}</span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed font-semibold">{trend.reach}</p>
                  <p className="text-xs text-muted leading-relaxed">{trend.description}</p>
                </div>

                <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl space-y-1 text-[10px]">
                  <span className="font-bold text-primary-glow uppercase block">AI recommendation</span>
                  <p className="text-muted leading-normal">{trend.recommendation}</p>
                </div>

                <button
                  onClick={() => toast.success('Trend Draft Created', { description: 'Added template structure matching cortisol resets.' })}
                  className="h-7 w-full rounded-lg bg-card border border-border text-muted hover:text-foreground text-xs font-semibold cursor-pointer transition-colors"
                >
                  Ride this Trend
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
