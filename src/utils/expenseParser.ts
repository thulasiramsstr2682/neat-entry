import { ExpenseCategory, CATEGORIES } from '@/types/expense';

export function parseExpenseInput(input: string): { description: string; amount: number; category: ExpenseCategory } | null {
  // Clean the input
  const cleaned = input.trim().toLowerCase();
  
  // Pattern: "description amount" or "amount description"
  // Try to extract amount (number) from the string
  const amountMatch = cleaned.match(/(\d+(?:\.\d{1,2})?)/);
  
  if (!amountMatch) {
    return null; // No amount found
  }
  
  const amount = parseFloat(amountMatch[1]);
  
  // Extract description by removing the amount
  const description = cleaned
    .replace(amountMatch[1], '')
    .trim()
    .replace(/^\W+|\W+$/g, ''); // Remove leading/trailing non-word characters
  
  if (!description) {
    return null; // No description found
  }
  
  // Auto-categorize based on keywords
  const category = categorizeExpense(description);
  
  // Capitalize first letter of description
  const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  
  return {
    description: formattedDescription,
    amount,
    category
  };
}

export function categorizeExpense(description: string): ExpenseCategory {
  const lowerDescription = description.toLowerCase();
  
  // Check each category for keyword matches
  for (const [categoryKey, categoryInfo] of Object.entries(CATEGORIES)) {
    if (categoryKey === 'other') continue; // Skip 'other' category
    
    const hasMatch = categoryInfo.keywords.some(keyword => 
      lowerDescription.includes(keyword.toLowerCase())
    );
    
    if (hasMatch) {
      return categoryKey as ExpenseCategory;
    }
  }
  
  // Default to 'other' if no match found
  return 'other';
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-IN');
  }
}