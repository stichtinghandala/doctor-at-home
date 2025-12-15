
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Activity } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">{t('services.sectionLabel')}</span>
            <h2 className="mb-6">{t('services.headline')}</h2>
            <p className="mb-8">
               {t('services.description')}
            </p>
            
            <div className="space-y-6">
              
              <div className="flex gap-4 items-start">
                <div className="mt-1 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
                   <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-800 mb-1">{t('services.items.telephonic.title')}</h4>
                  <p className="text-sm text-slate-500">
                    {t('services.items.telephonic.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
                   <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-800 mb-1">{t('services.items.houseCalls.title')}</h4>
                  <p className="text-sm text-slate-500">
                    {t('services.items.houseCalls.description')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
                   <Activity size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-slate-800 mb-1">{t('services.items.assessment.title')}</h4>
                  <p className="text-sm text-slate-500">
                    {t('services.items.assessment.description')}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full min-h-[400px] relative rounded-2xl overflow-hidden shadow-lg"
          >
             <img alt="Doctor's stethoscope on a clean white desk next to a notebook" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1666886573301-b5d526cfd518" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
