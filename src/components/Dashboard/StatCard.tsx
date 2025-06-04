import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  isPercentageValue?: boolean; // True if the main value is a percentage itself
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., '+12%' or '-5%'
  progress: number; // 0-100 for the small circle
  progressColor: string; // Tailwind background color class, e.g., 'bg-primary'
  iconColor?: string; // Tailwind text color class for trend icon, e.g., 'text-green-500'
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  isPercentageValue = false,
  trend,
  trendValue,
  progress,
  progressColor,
  iconColor = 'text-muted-foreground',
  className,
}) => {
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : null;

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <div className={cn(
            "text-3xl font-bold",
            trend === 'up' && !isPercentageValue && 'text-success',
            trend === 'down' && !isPercentageValue && 'text-destructive',
            isPercentageValue && trend === 'up' && 'text-success', // Green for +234%
            isPercentageValue && trend === 'down' && 'text-destructive', // Red for -71%
            !isPercentageValue && !trend && 'text-foreground' // Default color if no trend or not percentage for company value
          )}>
            {TrendIcon && isPercentageValue && <TrendIcon className={cn("inline-block h-6 w-6 mr-1 mb-1", iconColor)} />}
            {value}
          </div>
          {trendValue && TrendIcon && !isPercentageValue && (
            <p className={cn("text-xs text-muted-foreground mt-1 flex items-center", iconColor)}>
              <TrendIcon className="h-3 w-3 mr-0.5" />
              {trendValue}
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold border-4",
          progressColor,
          progressColor.includes('bg-primary') || progressColor.includes('bg-destructive') || progressColor.includes('bg-success') ? 'text-white' : 'text-gray-700', // Heuristic for text color
          progressColor === 'bg-yellow-500' ? 'border-yellow-300 text-yellow-800' : 
          progressColor === 'bg-primary' ? 'border-blue-300 text-primary-foreground' :
          progressColor === 'bg-destructive' ? 'border-red-300 text-destructive-foreground' :
          progressColor === 'bg-success' ? 'border-green-300 text-success-foreground' :
          'border-gray-300'
        )}>
          {progress}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
