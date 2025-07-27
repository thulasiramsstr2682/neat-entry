import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/contexts/ExpenseContext';
import { formatCurrency } from '@/utils/expenseParser';
import { CATEGORIES } from '@/types/expense';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

export function ExpenseSummary() {
  const { getTotalSpent, getCategoryBreakdown, expenses } = useExpenses();

  const todayTotal = getTotalSpent(undefined, 'today');
  const weekTotal = getTotalSpent(undefined, 'week');
  const monthTotal = getTotalSpent(undefined, 'month');
  const categoryBreakdown = getCategoryBreakdown();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Spending */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(todayTotal)}</div>
          <p className="text-xs text-muted-foreground">
            {getTotalSpent(undefined, 'today') > 0 ? '+0% from yesterday' : 'No expenses today'}
          </p>
        </CardContent>
      </Card>

      {/* This Week */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(weekTotal)}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(weekTotal / 7)} avg per day
          </p>
        </CardContent>
      </Card>

      {/* This Month */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(monthTotal)}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(monthTotal / 30)} avg per day
          </p>
        </CardContent>
      </Card>

      {/* Top Category */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {categoryBreakdown.length > 0 ? (
            <>
              <div className="text-2xl font-bold">
                {CATEGORIES[categoryBreakdown[0].category].name}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(categoryBreakdown[0].amount)} ({categoryBreakdown[0].count} expenses)
              </p>
            </>
          ) : (
            <div className="text-lg text-muted-foreground">No data</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}