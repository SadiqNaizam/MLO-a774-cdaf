import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Settings, List } from 'lucide-react';

interface IncomeDonutChartProps {
  className?: string;
}

const chartData = [
  { name: 'Achieved', value: 75, color: 'hsl(var(--success))' }, // Greenish
  { name: 'Remaining', value: 25, color: 'hsl(var(--primary))' }, // Blueish
];

const summaryStats = [
  { label: 'Income Target', value: '32%', color: 'bg-yellow-400' }, // Using a yellow variant
  { label: 'Expenses Target', value: '55%', color: 'bg-green-400' },
  { label: 'Savings Goal', value: '80%', color: 'bg-blue-400' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border border-border rounded-md shadow-lg">
        <p className="text-sm font-semibold">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const IncomeDonutChart: React.FC<IncomeDonutChartProps> = ({ className }) => {
  const percentageValue = chartData[0].value;

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
            <CardTitle className="text-lg font-semibold">Income</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Current income status</CardDescription>
        </div>
        <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
            </Button>
        </div> 
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center pt-4 pb-6">
        <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Percent</span>
            <span className="text-4xl font-bold text-foreground">{percentageValue}</span>
          </div>
        </div>
        <div className="mt-6 w-full space-y-3 px-4">
          {summaryStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <span className={cn("w-2.5 h-2.5 rounded-full mr-2", stat.color)}></span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
              <span className="font-semibold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeDonutChart;
