import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORY_COLORS = {
  Food: 'from-orange-400 to-red-400',
  Transportation: 'from-blue-400 to-cyan-400',
  Utilities: 'from-yellow-400 to-orange-400',
  Entertainment: 'from-purple-400 to-pink-400',
  Shopping: 'from-pink-400 to-rose-400',
  Health: 'from-green-400 to-emerald-400',
  Other: 'from-gray-400 to-slate-400'
};

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Recent Expenses
      </h2>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        <AnimatePresence>
          {expenses.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-8"
            >
              No expenses yet. Add your first expense to get started! 🎯
            </motion.p>
          ) : (
            expenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="glass-dark rounded-xl p-4 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[expense.category]}`} />
                      <h3 className="font-semibold text-gray-800">{expense.description}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {expense.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(expense.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-purple-600">
                      ${parseFloat(expense.amount).toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(expense.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExpenseList;