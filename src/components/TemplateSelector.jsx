import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TEMPLATES = [
  {
    name: 'Student Budget',
    budget: 1000,
    description: 'Perfect for college students',
    icon: '🎓'
  },
  {
    name: 'Young Professional',
    budget: 2500,
    description: 'Starting your career',
    icon: '💼'
  },
  {
    name: 'Family Budget',
    budget: 4000,
    description: 'Managing household expenses',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    name: 'Minimalist',
    budget: 1500,
    description: 'Living simply',
    icon: '🌱'
  }
];

const TemplateSelector = ({ onApplyTemplate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-dark rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">Budget Templates</h3>
      </div>

      <div className="space-y-3">
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-all cursor-pointer group"
            onClick={() => onApplyTemplate(template)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">${template.budget}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TemplateSelector;