import React, { createContext, useContext, useState } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from './AuthContext';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (description: string, amount: number, category: ExpenseCategory) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  getFilteredExpenses: (category?: ExpenseCategory, dateRange?: 'today' | 'week' | 'month') => Expense[];
  getTotalSpent: (category?: ExpenseCategory, dateRange?: 'today' | 'week' | 'month') => number;
  getCategoryBreakdown: () => { category: ExpenseCategory; amount: number; count: number }[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [allExpenses, setAllExpenses] = useLocalStorage<Record<string, Expense[]>>('expense-tracker-expenses', {});
  
  // Get expenses for current user
  const expenses = user ? (allExpenses[user.id] || []) : [];

  const addExpense = (description: string, amount: number, category: ExpenseCategory) => {
    if (!user) return;
    
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount,
      category,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      createdAt: new Date().toISOString()
    };

    setAllExpenses(prev => ({
      ...prev,
      [user.id]: [newExpense, ...(prev[user.id] || [])]
    }));
  };

  const deleteExpense = (id: string) => {
    if (!user) return;
    
    setAllExpenses(prev => ({
      ...prev,
      [user.id]: (prev[user.id] || []).filter(expense => expense.id !== id)
    }));
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    if (!user) return;
    
    setAllExpenses(prev => ({
      ...prev,
      [user.id]: (prev[user.id] || []).map(expense =>
        expense.id === id ? { ...expense, ...updates } : expense
      )
    }));
  };

  const getFilteredExpenses = (category?: ExpenseCategory, dateRange?: 'today' | 'week' | 'month') => {
    let filtered = expenses;

    // Filter by category
    if (category) {
      filtered = filtered.filter(expense => expense.category === category);
    }

    // Filter by date range
    if (dateRange) {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      let cutoffDate: Date;
      
      switch (dateRange) {
        case 'today':
          cutoffDate = startOfDay;
          break;
        case 'week':
          cutoffDate = new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(startOfDay.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }
      
      filtered = filtered.filter(expense => new Date(expense.createdAt) >= cutoffDate);
    }

    return filtered;
  };

  const getTotalSpent = (category?: ExpenseCategory, dateRange?: 'today' | 'week' | 'month') => {
    const filtered = getFilteredExpenses(category, dateRange);
    return filtered.reduce((total, expense) => total + expense.amount, 0);
  };

  const getCategoryBreakdown = () => {
    const breakdown = expenses.reduce((acc, expense) => {
      const existing = acc.find(item => item.category === expense.category);
      if (existing) {
        existing.amount += expense.amount;
        existing.count += 1;
      } else {
        acc.push({
          category: expense.category,
          amount: expense.amount,
          count: 1
        });
      }
      return acc;
    }, [] as { category: ExpenseCategory; amount: number; count: number }[]);

    return breakdown.sort((a, b) => b.amount - a.amount);
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
      getFilteredExpenses,
      getTotalSpent,
      getCategoryBreakdown
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}