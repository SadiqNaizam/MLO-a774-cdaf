import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav';

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile/tablet */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 flex-col transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:flex',
          isOpen ? 'translate-x-0 flex' : '-translate-x-full',
          // SidebarNav applies its own background and text colors (bg-sidebar text-sidebar-foreground)
          className
        )}
        aria-label="Sidebar"
      >
        {/* SidebarNav is expected to fill the aside and handle its own scrolling and structure */}
        <SidebarNav className="h-full" />
      </aside>
    </>
  );
};

export default Sidebar;
