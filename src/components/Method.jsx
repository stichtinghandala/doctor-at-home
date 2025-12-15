
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/LanguageContext';

const Method = () => {
  const { t } = useTranslation();

  const steps = [
    {
      num: "1",
      title: t('method.steps.1.title'),
      desc: t('method.steps.1.desc')
    },
    {
      num: "2",
      title: t('method.steps.2.title'),
      desc: t('method.steps.2.desc')
    },
    {
      num: "3",
      title: t('method.steps.3.title'),
      desc: t('method.steps.3.desc')
    }
  ];

  return (
    <section id="method" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <span className="section-label">{t('method.sectionLabel')}</span>
          <h2 className="text-slate-800">{t('method.headline')}</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-slate-100 -z-10"></div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center bg-white px-4 md:px-0 mb-12 md:mb-0 md:w-1/3"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-serif font-medium text-lg flex items-center justify-center mb-6">
                {step.num}
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Method;
