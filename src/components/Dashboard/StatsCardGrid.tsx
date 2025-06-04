import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard';

interface StatsCardGridProps {
  className?: string;
}

const statsData: StatCardProps[] = [
  {
    title: 'NEW ACCOUNTS',
    value: '234 %',
    isPercentageValue: true,
    trend: 'up' as const,
    trendValue: '', // Not explicitly shown, value itself is percentage
    progress: 58,
    progressColor: 'bg-primary',
    iconColor: 'text-primary',
  },
  {
    title: 'TOTAL EXPENSES',
    value: '71 %',
    isPercentageValue: true,
    trend: 'down' as const,
    trendValue: '',
    progress: 62,
    progressColor: 'bg-destructive',
    iconColor: 'text-destructive',
  },
  {
    title: 'COMPANY VALUE',
    value: '$ 1,45M',
    isPercentageValue: false,
    trend: 'up' as const, // Assuming it's up, image doesn't show icon
    trendValue: '', // Image doesn't show percentage change for this one
    progress: 72,
    progressColor: 'bg-yellow-500', // Custom color for 'Company Value'
    iconColor: 'text-yellow-600',
  },
  {
    title: 'NEW EMPLOYEES',
    value: '+ 34 hires',
    isPercentageValue: false,
    trend: 'up' as const,
    trendValue: '', // The main value shows the change itself
    progress: 81,
    progressColor: 'bg-success',
    iconColor: 'text-success',
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-4 sm:px-6', className)}>
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCardGrid;
