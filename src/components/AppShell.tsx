'use client';

import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { Toaster } from 'sonner';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Dynamic Background Mesh */}
      <div className="gradient-mesh" />

      {/* Collapsible Left Sidebar */}
      <AppSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        setIsMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Header bar */}
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col focus:outline-none">
          {children}
        </main>
      </div>

      {/* Toasts notifier */}
      <Toaster position="top-right" theme="dark" closeButton richColors />
    </div>
  );
};
export default AppShell;
