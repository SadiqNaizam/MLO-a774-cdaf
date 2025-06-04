import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  className?: string;
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onSidebarToggle }) => {
  // TopHeader component is already styled as fixed, h-16, etc.
  // We pass onSidebarToggle to it.
  return (
    <TopHeader 
      className={cn(className)}
      onSidebarToggle={onSidebarToggle} 
    />
  );
};

export default Header;
