
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Clock, Info } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const Intro = ({ onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center bg-[#F8FAFC] pt-24 pb-12 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-slate-400"></span>
              <span className="text-slate-500 text-xs font-semibold tracking-widest uppercase">
                {t('brandSubtitle')}
              </span>
            </div>

            <h1 className="mb-6 text-slate-800 leading-tight">
              {t('intro.headline')} <br/>
              <span className="text-slate-500 font-serif italic">{t('intro.headlineItalic')}</span>
            </h1>
            
            <p className="mb-8 text-lg font-light text-slate-600 leading-relaxed">
              {t('intro.description')}
            </p>
            
            {/* Minimal Info Box */}
            <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 mb-8 flex items-start gap-3">
               <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
               <div className="text-sm text-slate-600">
                 <p className="font-medium text-slate-800 mb-1">{t('intro.nonEmergencyTitle')}</p>
                 <p className="leading-snug">
                   {t('intro.nonEmergencyText')}
                 </p>
               </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onOpenModal}
                className="btn-primary w-full sm:w-auto"
              >
                {t('intro.requestBtn')}
              </button>
              
              <Link to="services" smooth={true} duration={800} offset={-50}>
                <button className="btn-outline w-full sm:w-auto">
                  {t('intro.viewServicesBtn')}
                </button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} />
                <span>{t('intro.responseTime')}</span>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-slate-100">
                <img alt="Calm minimal interior of a modern medical office or doctor interacting with patient" className="w-full h-full object-cover opacity-90" src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" />
             </div>
             
             {/* Floating badge */}
             <div className="absolute bottom-8 left-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg border border-slate-50 hidden md:block">
                 <p className="font-serif text-slate-800 text-lg italic">{t('intro.imageQuote')}</p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Intro;
