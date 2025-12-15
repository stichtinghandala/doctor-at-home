
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './locales/en';
import { nl } from './locales/nl';
import { ar } from './locales/ar';

const LanguageContext = createContext();

const translations = { en, nl, ar };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
    
    // Handle Direction for Arabic
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to English if translation missing
        let fallback = translations['en'];
        for (const fbKey of keys) {
             if (fallback[fbKey]) fallback = fallback[fbKey];
        }
        return fallback || path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
