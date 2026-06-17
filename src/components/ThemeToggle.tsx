'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering only after mounting on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-border bg-card/30 flex items-center justify-center text-muted">
        <Sun className="w-4.5 h-4.5" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 rounded-xl border border-border bg-card/30 flex items-center justify-center text-muted hover:text-foreground cursor-pointer hover:border-primary/40 hover:bg-card/75 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 text-amber-accent" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-secondary" />
      )}
    </button>
  );
};
export default ThemeToggle;
