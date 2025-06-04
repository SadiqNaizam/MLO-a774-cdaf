import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Home,
  ChevronRight,
  CalendarDays,
  Printer,
  Info
} from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface PageHeaderProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

const defaultBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Dashboards', href: '#' },
  { label: 'Minimal Dashboard Example', isCurrent: true },
];

const PageHeader: React.FC<PageHeaderProps> = ({
  title = 'Minimal Dashboard',
  breadcrumbs = defaultBreadcrumbs,
  className,
}) => {
  return (
    <div className={cn('py-6 px-4 sm:px-6 space-y-4', className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <nav aria-label="Breadcrumb" className="mt-1">
            <ol className="flex items-center space-x-1.5 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary">
                  <Home className="h-4 w-4" />
                  <span className="sr-only">Home</span>
                </a>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="h-4 w-4" />
                  <a
                    href={item.href || '#'}
                    className={cn(
                      'ml-1.5 hover:text-primary',
                      item.isCurrent && 'font-semibold text-foreground'
                    )}
                    aria-current={item.isCurrent ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="outline" className="h-9">
            <CalendarDays className="h-4 w-4 mr-2" />
            Select period
            <ChevronRight className="h-4 w-4 ml-2 opacity-50" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      </div>
      <Alert className="bg-primary/10 border-primary/30 text-primary">
        <Info className="h-4 w-4 !text-primary" /> {/* Using ! to ensure color override if needed */}
        <AlertTitle className="font-semibold">Heads up!</AlertTitle>
        <AlertDescription className="text-primary/80">
          This dashboard example was created using only the available elements and components, no additional SCSS was written!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PageHeader;
