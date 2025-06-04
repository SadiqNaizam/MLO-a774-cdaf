import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Circle } from 'lucide-react';

interface RevenueChartProps {
  className?: string;
}

const monthlyData = [
  { name: 'Jan 00', websiteBlog: 400, socialMedia: 240 },
  { name: '02 Jan', websiteBlog: 500, socialMedia: 139 },
  { name: '03 Jan', websiteBlog: 380, socialMedia: 680 },
  { name: '04 Jan', websiteBlog: 220, socialMedia: 390 },
  { name: '05 Jan', websiteBlog: 650, socialMedia: 480 },
  { name: '06 Jan', websiteBlog: 330, socialMedia: 200 },
  { name: '07 Jan', websiteBlog: 180, socialMedia: 540 },
  { name: '08 Jan', websiteBlog: 390, socialMedia: 290 },
  { name: '09 Jan', websiteBlog: 780, socialMedia: 600 },
  { name: '10 Jan', websiteBlog: 450, socialMedia: 310 },
  { name: '11 Jan', websiteBlog: 250, socialMedia: 180 },
  { name: '12 Jan', websiteBlog: 150, socialMedia: 420 },
];

const annualData = [
  { name: '2019', websiteBlog: 4000, socialMedia: 2400 },
  { name: '2020', websiteBlog: 3000, socialMedia: 1398 },
  { name: '2021', websiteBlog: 2000, socialMedia: 9800 },
  { name: '2022', websiteBlog: 2780, socialMedia: 3908 },
  { name: '2023', websiteBlog: 1890, socialMedia: 4800 },
  { name: '2024', websiteBlog: 2390, socialMedia: 3800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border border-border rounded-md shadow-lg">
        <p className="label text-sm font-semibold">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ className }) => {
  const [currentData, setCurrentData] = React.useState(monthlyData);
  const [timeRange, setTimeRange] = React.useState<'monthly' | 'annual'>('monthly');

  const handleTabChange = (value: string) => {
    if (value === 'monthly') {
      setCurrentData(monthlyData);
      setTimeRange('monthly');
    } else if (value === 'annual') {
      setCurrentData(annualData);
      setTimeRange('annual');
    }
  };

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
            <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Monthly and annual statistics</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
            <Tabs defaultValue="monthly" onValueChange={handleTabChange} className="text-xs">
                <TabsList className="h-8">
                    <TabsTrigger value="monthly" className="h-6 px-2 text-xs">Monthly</TabsTrigger>
                    <TabsTrigger value="annual" className="h-6 px-2 text-xs">Annual</TabsTrigger>
                </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-900">
                Actions
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconSize={8}
                iconType="circle"
                formatter={(value, entry) => (
                    <span className="text-xs text-muted-foreground ml-1">{value}</span>
                )}
              />
              <Bar dataKey="websiteBlog" name="Website Blog" fill="hsl(var(--primary))" barSize={timeRange === 'monthly' ? 20 : 40} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="socialMedia" name="Social Media" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--success))' }} activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--success))' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
