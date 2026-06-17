'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboard } from '../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  DollarSign,
  Users,
  Package,
  MessageSquare,
  Award,
  Calendar,
  Milestone,
  CheckSquare,
  Bell,
  Brain,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { clsx } from 'clsx';

// Sidebar items definition
const navigationGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Daily Briefing', path: '/', icon: Sparkles },
      { name: 'Approvals', path: '/approvals', icon: CheckSquare, badgeType: 'approvals' },
      { name: 'Alerts & Monitoring', path: '/alerts', icon: Bell, badgeType: 'alerts' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { name: 'Financial Intel', path: '/finance', icon: DollarSign },
      { name: 'Retention Intel', path: '/retention', icon: Users },
      { name: 'Product Intel', path: '/products', icon: Package },
      { name: 'Yotpo & Reviews', path: '/yotpo', icon: MessageSquare },
      { name: 'Affiliate Program', path: '/affiliate', icon: Award },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Social & Content', path: '/content', icon: Calendar },
      { name: 'Campaign Planning', path: '/campaigns', icon: Milestone },
      { name: 'Brand Voice', path: '/brand-voice', icon: Brain },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'Integrations', path: '/integrations', icon: Cpu },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export const AppSidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const pathname = usePathname();
  const { approvals, alerts } = useDashboard();

  // Active counts for badges
  const pendingApprovalsCount = approvals.length;
  const activeAlertsCount = alerts.filter((a) => !a.resolved).length;

  const getBadgeValue = (type?: string) => {
    if (type === 'approvals') return pendingApprovalsCount;
    if (type === 'alerts') return activeAlertsCount;
    return 0;
  };

  const getBadgeColor = (type?: string) => {
    if (type === 'approvals') return 'bg-primary/20 text-primary-glow border border-primary/30';
    if (type === 'alerts') {
      return activeAlertsCount > 0
        ? 'bg-rose-accent/20 text-rose-accent border border-rose-accent/30 animate-pulse'
        : 'bg-muted/10 text-muted';
    }
    return '';
  };

  const sidebarVariants = {
    expanded: { width: 'var(--sidebar-width)', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
    collapsed: { width: '72px', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const textVariants = {
    expanded: { opacity: 1, display: 'block', transition: { delay: 0.05, duration: 0.2 } },
    collapsed: { opacity: 0, display: 'none', transition: { duration: 0.1 } },
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-navy border-r border-border text-foreground select-none relative z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center relative glow-primary">
            <span className="text-white font-bold text-base tracking-tighter">A</span>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary-glow rounded-full border border-brand-navy animate-pulse" />
          </div>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-semibold text-lg tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent"
              >
                Aura
                <span className="text-xs font-normal text-muted ml-1.5 uppercase tracking-wide">
                  Intel
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-1.5">
            {isOpen ? (
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold px-3">
                {group.title}
              </p>
            ) : (
              <div className="h-2 border-b border-border/30 mx-2 my-2" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                const badge = getBadgeValue(item.badgeType);

                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={clsx(
                        'flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors relative group',
                        isActive
                          ? 'text-primary-glow bg-primary/5 border-l-2 border-primary'
                          : 'text-muted hover:text-foreground hover:bg-muted/5'
                      )}
                    >
                      {/* Active Indicator Slide (Vercel Style) */}
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center">
                        <item.icon
                          className={clsx(
                            'w-4 h-4 mr-3 flex-shrink-0 transition-transform group-hover:scale-110 duration-200',
                            isActive ? 'text-primary-glow' : 'text-muted'
                          )}
                        />
                        <motion.span
                          animate={isOpen ? 'expanded' : 'collapsed'}
                          variants={textVariants}
                          className="truncate"
                        >
                          {item.name}
                        </motion.span>
                      </div>

                      {isOpen && badge > 0 && (
                        <span className={clsx('text-[10px] px-1.5 py-0.5 rounded-full font-bold', getBadgeColor(item.badgeType))}>
                          {badge}
                        </span>
                      )}

                      {/* Tooltip on collapsed state */}
                      {!isOpen && (
                        <div className="absolute left-16 px-2.5 py-1.5 bg-brand-navy border border-border text-foreground text-xs rounded-lg shadow-xl opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50 duration-200 whitespace-nowrap">
                          {item.name}
                          {badge > 0 && <span className="ml-1.5 px-1 py-0.2 bg-primary/20 text-primary-glow rounded text-[10px]">{badge}</span>}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Collapse Trigger Button (Desktop) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex absolute bottom-6 -right-3 w-6 h-6 rounded-full border border-border bg-brand-navy items-center justify-center text-muted hover:text-foreground cursor-pointer hover:border-primary/50 transition-colors z-30"
      >
        {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar wrapper */}
      <motion.aside
        animate={isOpen ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        className="hidden md:block h-screen sticky top-0 flex-shrink-0"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Drawer (backdrop) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black"
            />
            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-[260px] h-full"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
