export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'transport' 
  | 'utilities'
  | 'shopping'
  | 'entertainment'
  | 'health'
  | 'other';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface CategoryInfo {
  name: string;
  color: string;
  keywords: string[];
}

export const CATEGORIES: Record<ExpenseCategory, CategoryInfo> = {
  food: {
    name: 'Food & Dining',
    color: 'category-food',
    keywords: ['lunch', 'dinner', 'coffee', 'restaurant', 'food', 'meal', 'breakfast', 'snack', 'drink', 'tea', 'pizza', 'burger']
  },
  transport: {
    name: 'Transportation',
    color: 'category-transport', 
    keywords: ['uber', 'taxi', 'bus', 'fuel', 'petrol', 'metro', 'train', 'auto', 'rickshaw', 'travel', 'transport']
  },
  utilities: {
    name: 'Utilities',
    color: 'category-utilities',
    keywords: ['water', 'electricity', 'internet', 'phone', 'bill', 'wifi', 'mobile', 'recharge', 'utility']
  },
  shopping: {
    name: 'Shopping',
    color: 'category-shopping',
    keywords: ['clothes', 'electronics', 'groceries', 'shopping', 'amazon', 'flipkart', 'book', 'gadget', 'shoes']
  },
  entertainment: {
    name: 'Entertainment',
    color: 'category-entertainment',
    keywords: ['movie', 'game', 'music', 'netflix', 'entertainment', 'concert', 'show', 'spotify', 'youtube']
  },
  health: {
    name: 'Health',
    color: 'category-health',
    keywords: ['medicine', 'doctor', 'hospital', 'pharmacy', 'health', 'medical', 'clinic', 'checkup']
  },
  other: {
    name: 'Other',
    color: 'category-other',
    keywords: []
  }
};