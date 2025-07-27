import React from 'react';
import { Header } from './Header';
import { ExpenseInput } from './ExpenseInput';
import { ExpenseSummary } from './ExpenseSummary';
import { ExpenseList } from './ExpenseList';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Track Your Expenses
          </h2>
          <p className="text-muted-foreground">
            Simply type what you spent and we'll do the rest
          </p>
        </div>

        {/* Quick Add Expense */}
        <ExpenseInput />

        {/* Summary Cards */}
        <ExpenseSummary />

        {/* Expense List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Expenses
          </h3>
          <ExpenseList />
        </div>
      </main>
    </div>
  );
}