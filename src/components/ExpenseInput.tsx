import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useExpenses } from '@/contexts/ExpenseContext';
import { parseExpenseInput } from '@/utils/expenseParser';
import { useToast } from '@/hooks/use-toast';
import { Plus, Sparkles } from 'lucide-react';

export function ExpenseInput() {
  const [input, setInput] = useState('');
  const { addExpense } = useExpenses();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const parsed = parseExpenseInput(input);
    
    if (!parsed) {
      toast({
        title: "Invalid Input",
        description: "Please enter in format: 'item amount' (e.g., 'coffee 150')",
        variant: "destructive"
      });
      return;
    }

    addExpense(parsed.description, parsed.amount, parsed.category);
    setInput('');
    
    toast({
      title: "Expense Added!",
      description: `${parsed.description} - ₹${parsed.amount} (${parsed.category})`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quick Add Expense</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., coffee 150, lunch 300, uber 200"
          className="expense-input flex-1"
          autoFocus
        />
        <Button 
          type="submit"
          size="lg"
          className="px-6"
          disabled={!input.trim()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </form>
      
      <p className="text-sm text-muted-foreground mt-3">
        Just type what you spent and how much. We'll categorize it automatically!
      </p>
    </div>
  );
}