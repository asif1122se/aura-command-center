'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDashboard, DateRange } from '../context/DashboardContext';
import { ThemeToggle } from './ThemeToggle';
import { Bell, Search, Menu, X, Check, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const pathname = usePathname();
  const { dateRange, setDateRange, alerts, resolveAlert } = useDashboard();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const unreadCount = activeAlerts.length;

  // Resolve breadcrumbs dynamically
  const getBreadcrumbs = () => {
    switch (pathname) {
      case '/':
        return { group: 'Overview', page: 'Daily Briefing' };
      case '/finance':
        return { group: 'Intelligence', page: 'Financial Intelligence' };
      case '/retention':
        return { group: 'Intelligence', page: 'Retention Intelligence' };
      case '/products':
        return { group: 'Intelligence', page: 'Product Intelligence' };
      case '/yotpo':
        return { group: 'Intelligence', page: 'Yotpo & Reviews' };
      case '/affiliate':
        return { group: 'Intelligence', page: 'Affiliate Program' };
      case '/content':
        return { group: 'Operations', page: 'Social & Content' };
      case '/campaigns':
        return { group: 'Operations', page: 'Campaign Planning' };
      case '/approvals':
        return { group: 'Overview', page: 'Approvals Queue' };
      case '/alerts':
        return { group: 'Overview', page: 'Alerts & Monitoring' };
      case '/brand-voice':
        return { group: 'Operations', page: 'Brand Voice' };
      case '/integrations':
        return { group: 'System', page: 'Integrations' };
      default:
        return { group: 'Dashboard', page: 'Aura Command' };
    }
  };

  const { group, page } = getBreadcrumbs();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ShieldAlert className="w-4 h-4 text-rose-accent flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-accent flex-shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-secondary-glow flex-shrink-0" />;
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-brand-navy/60 backdrop-blur-md sticky top-0 z-30 select-none">
      
      {/* Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg border border-border text-muted hover:text-foreground cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1.5 text-xs text-muted font-medium">
          <span className="hover:text-foreground transition-colors cursor-pointer">{group}</span>
          <span>/</span>
          <span className="text-foreground font-semibold">{page}</span>
        </div>
      </div>

      {/* Action panel */}
      <div className="flex items-center space-x-3.5">
        
        {/* Date Filter Pills */}
        <div className="flex bg-card/40 rounded-xl p-0.5 border border-border max-sm:hidden">
          {(['today', '7d', '30d'] as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={clsx(
                'px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer capitalize',
                dateRange === range
                  ? 'bg-primary text-white shadow-sm glow-primary'
                  : 'text-muted hover:text-foreground'
              )}
            >
              {range === 'today' ? 'Today' : range}
            </button>
          ))}
        </div>

        {/* Search Field (Visual Only) */}
        <div className="relative max-lg:hidden">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search commands..."
            className="h-9 w-44 rounded-xl border border-border bg-card/25 pl-9 pr-4 text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 focus:w-56 transition-all duration-300"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={clsx(
              'w-9 h-9 rounded-xl border border-border bg-card/30 flex items-center justify-center text-muted hover:text-foreground cursor-pointer hover:border-primary/40 hover:bg-card/75 transition-all duration-200',
              notificationsOpen && 'border-primary text-foreground'
            )}
            aria-label="Toggle notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full bg-rose-accent text-white text-[9px] font-bold flex items-center justify-center px-1 border border-brand-navy animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Interactive Notifications Droplist */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2.5 w-80 rounded-2xl glass-card border border-border p-4 shadow-xl z-50 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Active Alerts
                </span>
                <span className="text-[10px] text-muted font-semibold">
                  {unreadCount} unresolved
                </span>
              </div>

              {activeAlerts.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted flex flex-col items-center space-y-1.5">
                  <Check className="w-6 h-6 text-emerald-accent" />
                  <span>All metrics operating within bounds.</span>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                  {activeAlerts.slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-2 rounded-xl bg-card/30 border border-border/10 flex items-start space-x-2.5 group/alert"
                    >
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1 space-y-1">
                        <p className="text-[11px] font-medium text-foreground leading-tight">
                          {alert.message}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-muted">{alert.timestamp}</span>
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="text-[9px] text-emerald-accent hover:underline flex items-center cursor-pointer"
                          >
                            <Check className="w-2.5 h-2.5 mr-0.5" /> Resolve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {unreadCount > 3 && (
                    <div className="text-center">
                      <Link
                        href="/alerts"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-[10px] text-primary-glow hover:underline font-semibold"
                      >
                        View all {unreadCount} alerts
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-border/30 pt-2 flex justify-between items-center text-[10px]">
                <Link
                  href="/alerts"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-muted hover:text-foreground font-semibold"
                >
                  Notification settings
                </Link>
                {unreadCount > 0 && (
                  <Link
                    href="/alerts"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-primary-glow hover:underline font-semibold"
                  >
                    Go to Alerts Page
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center space-x-2 border-l border-border pl-3.5 max-sm:hidden">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center text-white text-xs font-bold border border-border relative">
            KB
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-accent rounded-full border border-brand-navy" />
          </div>
          <div className="text-left leading-tight">
            <p className="text-xs font-semibold text-foreground">Kelli B.</p>
            <p className="text-[9px] text-muted uppercase font-bold tracking-wider">Product Lead</p>
          </div>
        </div>

      </div>
    </header>
  );
};
export default TopBar;
