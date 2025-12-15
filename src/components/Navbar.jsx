
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { LogoHorizontal } from "@/components/Logo";
import { useTranslation } from "@/i18n/LanguageContext";

const Navbar = ({ onOpenModal }) => {
  const { t, language, setLanguage } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.care'), to: "about" },
    { name: t('nav.services'), to: "services" },
    { name: t('nav.process'), to: "method" }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'ar', label: 'العربية' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <Link to="intro" smooth duration={500} className="cursor-pointer group z-50 flex items-center">
             {/* Using the icon-only image here, passed to LogoHorizontal which renders image + text */}
             <LogoHorizontal 
                title={t('brandName')} 
                // Using the SECOND image link which appears to be the icon-only version (house + cross)
                // The first image (33445b2b...) likely has text below it based on aspect ratio of similar files.
                // The second image (ba8a59d6...) is likely the square icon.
             />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth
                duration={500}
                offset={-100}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {item.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                <Globe size={16} />
                <span className="uppercase">{language}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-slate-100 rounded-lg shadow-lg py-1 w-32 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === lang.code ? 'text-slate-900 font-bold bg-slate-50' : 'text-slate-600'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={onOpenModal}
              className="btn-primary py-2 px-4 text-xs uppercase tracking-wider"
            >
                {t('nav.intake')}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Language Toggle (Simple) */}
             <button 
                onClick={() => setLanguage(language === 'en' ? 'nl' : (language === 'nl' ? 'ar' : 'en'))}
                className="text-slate-600 text-sm font-bold uppercase"
              >
                {language}
              </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-slate-800 p-2 hover:bg-slate-100 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col items-center space-y-8 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="font-serif text-2xl text-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="w-full h-px bg-slate-100 my-4" />

              <div className="flex gap-4">
                 {languages.map(lang => (
                   <button 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${language === lang.code ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                   >
                     {lang.label}
                   </button>
                 ))}
              </div>

              <button 
                className="btn-primary w-full mt-8 py-4"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
              >
                {t('nav.bookConsultation')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
