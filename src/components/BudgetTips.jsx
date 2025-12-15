import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TIPS = [
  "💡 Track every expense, no matter how small!",
  "🎯 Set specific savings goals for motivation",
  "📊 Review your spending weekly to stay on track",
  "🛒 Make a shopping list before grocery trips",
  "☕ Brew coffee at home to save $100+ monthly",
  "🍽️ Meal prep on Sundays to reduce takeout costs",
  "💳 Use cash for discretionary spending",
  "📱 Cancel unused subscriptions immediately",
  "🚗 Carpool or use public transport when possible",
  "💰 Follow the 50/30/20 budgeting rule",
  "🎁 Set a gift budget for special occasions",
  "🏦 Automate savings transfers each payday",
  "📉 Compare prices before making purchases",
  "🌟 Reward yourself for meeting budget goals"
];

const BudgetTips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    setCurrentTip(Math.floor(Math.random() * TIPS.length));
  }, []);

  const getNewTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * TIPS.length);
    } while (newIndex === currentTip);
    setCurrentTip(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-dark rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-800">Budget Tip</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={getNewTip}
          className="hover:bg-white/50"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <motion.p
        key={currentTip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-700 leading-relaxed"
      >
        {TIPS[currentTip]}
      </motion.p>
    </motion.div>
  );
};

export default BudgetTips;