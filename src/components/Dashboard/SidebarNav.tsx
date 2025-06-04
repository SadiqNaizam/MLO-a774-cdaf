import React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Users,
  FileText,
  AppWindow,
  Settings,
  ChevronDown,
  Layers,
  ComponentIcon, // Renamed from 'Component' to avoid conflict with React.Component
  Table,
  PieChart,
  BarChartHorizontalSquare, // For Apex Charts, Chart Sparklines
  UserSquare,
  ClipboardList,
  Package
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  type: 'link' | 'accordion';
  badge?: string;
  children?: NavItem[];
  variant?: 'default' | 'active';
}

const sidebarNavItems: NavItem[] = [
  { id: 'menu', label: 'MENU', type: 'accordion', icon: Settings, children: [] }, // Category header, not interactive
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    type: 'accordion',
    children: [
      { id: 'analytics', label: 'Analytics', href: '#', icon: BarChart2, type: 'link' },
      { id: 'commerce', label: 'Commerce', href: '#', icon: ShoppingCart, type: 'link' },
      { id: 'sales', label: 'Sales', href: '#', icon: Users, type: 'link' }, // Assuming Sales uses Users icon as per generic CRM example
      {
        id: 'minimal',
        label: 'Minimal',
        href: '#',
        icon: LayoutDashboard, // Placeholder, use more specific if available
        type: 'accordion',
        children: [
          { id: 'variation1', label: 'Variation 1', href: '#', icon: LayoutDashboard, type: 'link', variant: 'active' as const },
          { id: 'variation2', label: 'Variation 2', href: '#', icon: LayoutDashboard, type: 'link' },
        ]
      },
    ],
  },
  { id: 'crm', label: 'CRM', href: '#', icon: Users, type: 'link' },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    type: 'accordion',
    children: [{ id: 'samplePage', label: 'Sample Page', href: '#', icon: FileText, type: 'link' }],
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: AppWindow,
    type: 'accordion',
    children: [{ id: 'sampleApp', label: 'Sample App', href: '#', icon: AppWindow, type: 'link' }],
  },
  { id: 'uiComponentsHeader', label: 'UI COMPONENTS', type: 'accordion', icon: Settings, children: [] }, // Category header
  {
    id: 'uiComponents',
    label: 'Elements',
    icon: Layers,
    type: 'accordion',
    children: [{ id: 'element1', label: 'Element 1', href: '#', icon: Layers, type: 'link' }],
  },
  {
    id: 'components',
    label: 'Components',
    icon: ComponentIcon,
    type: 'accordion',
    children: [{ id: 'component1', label: 'Component 1', href: '#', icon: ComponentIcon, type: 'link' }],
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: Table,
    type: 'accordion',
    children: [{ id: 'table1', label: 'Table 1', href: '#', icon: Table, type: 'link' }],
  },
  { id: 'dashboardWidgetsHeader', label: 'DASHBOARD WIDGETS', type: 'accordion', icon: Settings, children: [] }, // Category header
  {
    id: 'chartBoxes1',
    label: 'Chart Boxes 1',
    href: '#',
    icon: PieChart, // Example icon
    type: 'link',
  },
  { id: 'profileBoxes', label: 'Profile Boxes', href: '#', icon: UserSquare, type: 'link' }, 
  { id: 'formsHeader', label: 'FORMS', type: 'accordion', icon: Settings, children: [] }, // Category header
  {
    id: 'formElements',
    label: 'Elements',
    icon: ClipboardList,
    type: 'accordion',
    children: [{ id: 'formElement1', label: 'Form Element 1', href: '#', icon: ClipboardList, type: 'link' }],
  },
  {
    id: 'formWidgets',
    label: 'Widgets',
    icon: Package,
    type: 'accordion',
    children: [{ id: 'formWidget1', label: 'Form Widget 1', href: '#', icon: Package, type: 'link' }],
  },
  { id: 'chartsHeader', label: 'CHARTS', type: 'accordion', icon: Settings, children: [] }, // Category header
  { id: 'chartJs', label: 'ChartJS', href: '#', icon: PieChart, type: 'link' },
  { id: 'apexCharts', label: 'Apex Charts', href: '#', icon: BarChartHorizontalSquare, type: 'link' },
  { id: 'chartSparklines', label: 'Chart Sparklines', href: '#', icon: BarChart2, type: 'link' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('variation1'); // Default active item
  const [openAccordions, setOpenAccordions] = React.useState<string[]>(['dashboards', 'minimal']);

  const handleLinkClick = (id: string) => {
    setActiveItem(id);
  };

  const renderNavItem = (item: NavItem, isSubItem: boolean = false) => {
    const IconComponent = item.icon;
    const isActive = activeItem === item.id || item.variant === 'active';

    if (item.label === 'MENU' || item.label === 'UI COMPONENTS' || item.label === 'DASHBOARD WIDGETS' || item.label === 'FORMS' || item.label === 'CHARTS') {
      return (
        <div key={item.id} className="px-4 py-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
          {item.label}
        </div>
      );
    }

    if (item.type === 'accordion' && item.children && item.children.length > 0) {
      return (
        <AccordionItem value={item.id} key={item.id} className="border-none">
          <AccordionTrigger
            className={cn(
              'flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary rounded-md text-sidebar-foreground',
              isSubItem && 'pl-8',
              isActive && 'bg-primary/10 text-primary font-semibold'
            )}
          >
            <div className="flex items-center">
              <IconComponent className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="pl-4 border-l border-border ml-6">
              {item.children.map((child) => renderNavItem(child, true))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        onClick={() => handleLinkClick(item.id)}
        className={cn(
          'w-full justify-start px-4 py-2.5 text-sm h-auto text-sidebar-foreground hover:bg-primary/10 hover:text-primary',
          isSubItem && 'pl-8',
          isActive && 'bg-primary/10 text-primary font-semibold'
        )}
        asChild={!isSubItem && item.href === '#'} // asChild only if top level and placeholder href
      >
        <a href={item.href || '#'}>
          <IconComponent className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="truncate">{item.label}</span>
          {item.badge && <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>}
        </a>
      </Button>
    );
  };

  return (
    <div className={cn('h-full bg-sidebar-DEFAULT text-sidebar-foreground flex flex-col', className)}>
      <div className="p-4 flex items-center border-b border-border">
        <a href="#" className="text-2xl font-bold text-primary">Architect</a>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full">
          {sidebarNavItems.map((item) => renderNavItem(item))}
        </Accordion>
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          Sidebar Footer Action
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
