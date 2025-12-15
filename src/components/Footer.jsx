
import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-slate-100 py-12 text-slate-500 text-sm font-light">
      <div className="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div>
           <span className="font-serif text-slate-800 text-lg block mb-1">{t('brandName')}</span>
           <p className="text-xs max-w-xs">{t('footer.brandTag')}</p>
        </div>

        <div className="flex gap-6 text-xs uppercase tracking-wider">
           <a href="#" className="hover:text-slate-800 transition-colors">{t('footer.privacy')}</a>
           <a href="#" className="hover:text-slate-800 transition-colors">{t('footer.terms')}</a>
           <a href="#" className="hover:text-slate-800 transition-colors">{t('footer.bigRegister')}</a>
        </div>

        <div className="text-xs text-right">
           <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
