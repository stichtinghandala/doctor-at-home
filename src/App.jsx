
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Intro from '@/components/Intro';
import About from '@/components/About';
import Services from '@/components/Services';
import Method from '@/components/Method';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider, useTranslation } from '@/i18n/LanguageContext';
import { encryptFormData } from "@/components/Contact/encrypt";


const AppContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Helmet>
        <title>{t('brandName')} | {t('brandSubtitle')}</title>
        <meta name="description" content={t('intro.description')} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Helmet>
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-slate-200">
        <Navbar onOpenModal={openModal} />
        <main className="overflow-x-hidden">
          <Intro onOpenModal={openModal} />
          <About />
          <Services />
          <Method />
          <Contact isOpen={isModalOpen} onOpen={openModal} onClose={closeModal} />
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
console.log("🔐 Encryption test output:", encryptFormData({ test: "hello" }));

export default App;
