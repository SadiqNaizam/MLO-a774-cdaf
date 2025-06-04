import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import RevenueChart from '@/components/Dashboard/RevenueChart';
import IncomeDonutChart from '@/components/Dashboard/IncomeDonutChart';
import TargetSection from '@/components/Dashboard/TargetSection';

/**
 * DashboardOverviewPage: The main page for the dashboard overview.
 * It assembles various dashboard components within the MainAppLayout.
 * Layout structure:
 * - PageHeader at the top.
 * - A main content grid below PageHeader, structured as follows:
 *   - StatsCardGrid spanning full width.
 *   - RevenueChart and IncomeDonutChart side-by-side in the next row.
 *   - TargetSection in the subsequent row, also spanning a significant width.
 * This layout adapts responsive across screen sizes based on Tailwind CSS classes.
 */
const DashboardOverviewPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* MainAppLayout provides base padding (p-4 sm:p-6). This div adds vertical spacing between major sections. */}
      <div className="space-y-6">
        <PageHeader />

        {/* Main content grid for dashboard elements, following layout requirements (md:grid-cols-2, xl:grid-cols-4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* StatsCardGrid is a self-contained component with 4 cards. It spans the full width of this grid. */}
          <div className="md:col-span-2 xl:col-span-4">
            <StatsCardGrid />
          </div>

          {/* RevenueChart: Spans full width on medium screens, 3/4 width on extra-large screens. */}
          <RevenueChart className="md:col-span-2 xl:col-span-3" />

          {/* IncomeDonutChart: Spans full width on medium screens (stacking below RevenueChart),
              1/4 width on extra-large screens (appearing next to RevenueChart). */}
          <IncomeDonutChart className="md:col-span-2 xl:col-span-1" />

          {/* TargetSection: Spans full width on medium screens,
              3/4 width on extra-large screens, appearing below the charts.
              This matches the visual prominence of RevenueChart. 
              An empty 1/4 column will be to its right on XL screens, which is acceptable.
          */}
          <TargetSection className="md:col-span-2 xl:col-span-3" />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
