import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Eye, Settings, CheckCircle } from 'lucide-react';

interface TargetItem {
  id: string;
  title?: string; // Title like 'Income', 'Expenses'
  mainValue: string; // Main value like '$ 5,456' or '71%'
  isPercentageValue?: boolean; // True if mainValue is the target percentage itself
  targetLabel: string; // e.g., 'Income Target'
  percentage?: number; // Progress bar percentage (if mainValue is not already percentage)
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., '+14%'
  progressColorClass: string; // e.g. '[&>*:first-child]:bg-destructive'
}

const targetData: TargetItem[] = [
  {
    id: 'income',
    title: 'Income',
    mainValue: '$ 5,456',
    targetLabel: 'Income Target',
    percentage: 71,
    trend: 'up' as const,
    trendValue: '+14%',
    progressColorClass: '[&>*:first-child]:bg-destructive' // Red as per image for 71%
  },
  {
    id: 'expenses',
    title: 'Expenses',
    mainValue: '$ 4,764',
    targetLabel: 'Expenses Target',
    percentage: 54,
    trend: 'up' as const, // Image shows red up arrow, which is unusual for expense reduction. Assuming it's 'target met' progress.
    trendValue: '8%', // Image shows red up arrow, but typically less expense is good (down arrow or green up arrow for savings)
    progressColorClass: '[&>*:first-child]:bg-success' // Green as per image for 54%
  },
  {
    id: 'spendings',
    title: 'Spendings',
    mainValue: '$ 1.5M',
    targetLabel: 'Spendings Target',
    percentage: 32,
    trend: 'down' as const, // Green down arrow (good)
    trendValue: '15%',
    progressColorClass: '[&>*:first-child]:bg-yellow-500' // Yellow as per image for 32%
  },
  {
    id: 'totals',
    title: 'Totals',
    mainValue: '$ 31,564',
    targetLabel: 'Totals Target',
    percentage: 89,
    trend: 'up' as const,
    trendValue: '+76%',
    progressColorClass: '[&>*:first-child]:bg-primary' // Blue as per image for 89%
  },
];

const TargetSection: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow col-span-1 xl:col-span-2', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
            <CardTitle className="text-lg font-semibold">Target Section</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Progress towards financial goals</CardDescription>
        </div>
        <div className="flex items-center space-x-1">
            <Button variant="link" size="sm" className="text-xs h-8 text-primary hover:text-primary/80">
                <Eye className="h-3.5 w-3.5 mr-1" /> View Details
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          {targetData.map((item) => {
            const TrendIcon = item.trend === 'up' ? ArrowUp : item.trend === 'down' ? ArrowDown : null;
            let trendColor = 'text-muted-foreground';
            if (item.title === 'Income' && item.trend === 'up') trendColor = 'text-success'; // Green for income up
            if (item.title === 'Expenses' && item.trend === 'up') trendColor = 'text-destructive'; // Red for expenses up (as per image icon color)
            if (item.title === 'Spendings' && item.trend === 'down') trendColor = 'text-success'; // Green for spendings down
            if (item.title === 'Totals' && item.trend === 'up') trendColor = 'text-success'; // Green for totals up

            return (
              <div key={item.id}>
                <div className="flex justify-between items-baseline mb-1">
                  {item.title ? (
                    <h4 className="text-sm font-medium text-muted-foreground">{item.title}</h4>
                  ) : (
                    <h4 className="text-sm font-medium text-muted-foreground">{item.targetLabel.replace(' Target', '')}</h4>
                  )}
                  {item.trendValue && TrendIcon && (
                    <span className={cn("text-xs font-medium flex items-center", trendColor)}>
                      {item.title === 'Spendings' && item.trend === 'down' && <CheckCircle className="h-3 w-3 mr-0.5" />}
                      {!(item.title === 'Spendings' && item.trend === 'down') && <TrendIcon className="h-3 w-3 mr-0.5" />}
                      {item.trendValue}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-xl font-bold text-foreground">{item.mainValue}</span>
                    {item.isPercentageValue ? null : <span className="text-sm font-semibold text-foreground">{item.percentage}%</span>}
                </div>
                <Progress 
                    value={item.percentage}
                    className={cn("h-1.5 bg-muted", item.progressColorClass)} 
                />
                <p className="text-xs text-muted-foreground mt-1">{item.targetLabel}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetSection;
