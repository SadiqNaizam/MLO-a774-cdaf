import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className={cn('min-h-screen bg-background flex flex-col', className)}>
      <Header onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1 pt-16"> {/* pt-16 for fixed header height */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main 
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            'lg:ml-64' // Margin for pinned sidebar on large screens
          )}
        >
          {/* Content wrapper for padding, can be adjusted or moved to page level */}
          <div className="p-4 sm:p-6 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
