import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BudgetOverview = ({ monthlyBudget, totalSpent, remaining, onBudgetChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  const percentage = (totalSpent / monthlyBudget) * 100;
  const isOverBudget = remaining < 0;

  const handleSave = () => {
    if (tempBudget > 0) {
      onBudgetChange(parseFloat(tempBudget));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempBudget(monthlyBudget);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-8 shadow-2xl"
    >
      <div className="grid md:grid-cols-3 gap-6">
        {/* Monthly Budget */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Monthly Budget
            </span>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <Button size="sm" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${monthlyBudget.toFixed(2)}
            </p>
          )}
        </div>

        {/* Total Spent */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Total Spent
          </span>
          <p className="text-3xl font-bold text-orange-600">
            ${totalSpent.toFixed(2)}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                isOverBudget 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            />
          </div>
        </div>

        {/* Remaining */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
            {isOverBudget ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            {isOverBudget ? 'Over Budget' : 'Remaining'}
          </span>
          <p className={`text-3xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
            ${Math.abs(remaining).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {percentage.toFixed(1)}% of budget used
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetOverview;