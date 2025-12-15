import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ExpenseCharts = ({ expenses }) => {
  const [activeTab, setActiveTab] = useState('category');

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
    return acc;
  }, {});

  const categoryData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0)) * 100
  })).sort((a, b) => b.amount - a.amount);

  // Calculate weekly data
  const getWeekNumber = (date) => {
    const d = new Date(date);
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    return Math.ceil((d.getDate() + firstDay.getDay()) / 7);
  };

  const weeklyData = expenses.reduce((acc, exp) => {
    const week = `Week ${getWeekNumber(exp.date)}`;
    acc[week] = (acc[week] || 0) + parseFloat(exp.amount);
    return acc;
  }, {});

  const CATEGORY_COLORS = {
    Food: 'bg-gradient-to-r from-orange-400 to-red-400',
    Transportation: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    Utilities: 'bg-gradient-to-r from-yellow-400 to-orange-400',
    Entertainment: 'bg-gradient-to-r from-purple-400 to-pink-400',
    Shopping: 'bg-gradient-to-r from-pink-400 to-rose-400',
    Health: 'bg-gradient-to-r from-green-400 to-emerald-400',
    Other: 'bg-gradient-to-r from-gray-400 to-slate-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Expense Analytics
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="space-y-4">
          {categoryData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{item.category}</span>
                <span className="font-bold text-purple-600">${item.amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full ${CATEGORY_COLORS[item.category]} shadow-lg`}
                />
              </div>
              <p className="text-xs text-gray-500">{item.percentage.toFixed(1)}% of total</p>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {Object.entries(weeklyData).map(([week, amount], index) => {
            const maxAmount = Math.max(...Object.values(weeklyData));
            const percentage = (amount / maxAmount) * 100;
            
            return (
              <motion.div
                key={week}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{week}</span>
                  <span className="font-bold text-purple-600">${amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                  />
                </div>
              </motion.div>
            );
          })}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ExpenseCharts;