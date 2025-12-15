
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: ShieldCheck,
      title: t('about.values.excellence.title'),
      text: t('about.values.excellence.text')
    },
    {
      icon: Clock,
      title: t('about.values.time.title'),
      text: t('about.values.time.text')
    },
    {
      icon: HeartHandshake,
      title: t('about.values.privacy.title'),
      text: t('about.values.privacy.text')
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <span className="section-label">{t('about.sectionLabel')}</span>
          <h2 className="text-3xl md:text-4xl text-slate-800 mb-6">
            {t('about.headline')}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 font-light">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm mb-4 border border-slate-100">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
