import React from 'react';
import { LogoVerticalSingle, LogoVerticalDouble, CrescentPatternShape, LogoIcon, CrescentShape } from '@/components/Logo';
import { motion } from 'framer-motion';

const BrandIdentity = () => {
  return (
    <section id="identity" className="py-24 bg-[#F7FAFA] relative overflow-hidden">
      {/* Background Pattern Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full flex flex-wrap gap-12 p-12 rotate-12 scale-110">
            {[...Array(40)].map((_, i) => (
                <div key={i} className="w-24 h-24">
                    <CrescentPatternShape color="#0F172A" className="w-full h-full" />
                </div>
            ))}
         </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F172A] mb-6">Visuele Identiteit</h2>
          <p className="text-[#0F172A]/60 max-w-2xl mx-auto text-lg font-light">
            Een minimalistische vertaling van rust en evenwicht. De crescent-vorm symboliseert vernieuwing, bescherming en balans.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Logo Variations */}
            <div className="space-y-12">
                <div className="bg-white p-12 shadow-sm border border-gray-100 flex items-center justify-center min-h-[300px]">
                    <LogoVerticalSingle />
                </div>
                <div className="bg-white p-12 shadow-sm border border-gray-100 flex items-center justify-center min-h-[300px]">
                    <LogoVerticalDouble />
                </div>
            </div>

            {/* Right Column: Mockups */}
            <div className="space-y-12">
                
                {/* Business Card Mockup */}
                <div className="group perspective-1000 relative h-[320px]">
                     {/* Card 1 (Back/Dark) */}
                    <motion.div 
                        className="absolute top-0 right-4 md:right-12 w-[340px] h-[200px] bg-[#0F172A] shadow-2xl rounded-xl p-8 flex flex-col justify-between z-10 rotate-3 group-hover:rotate-6 transition-transform duration-500"
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <LogoIcon className="w-10 h-10 bg-transparent border border-[#C7A35A]/30" />
                        <div className="text-right">
                             <CrescentPatternShape className="w-32 h-32 absolute -bottom-8 -right-8 text-[#C7A35A]/5" color="currentColor" />
                        </div>
                        <div className="text-xs text-[#C7A35A] tracking-[0.3em] uppercase font-bold">
                            Ataraxis<br/>Clinical Calm
                        </div>
                    </motion.div>

                    {/* Card 2 (Front/Light) */}
                    <motion.div 
                        className="absolute top-24 left-4 md:left-12 w-[340px] h-[200px] bg-[#FDFDFD] shadow-xl border border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center z-20 -rotate-3 group-hover:-rotate-6 transition-transform duration-500"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                         <LogoVerticalSingle className="scale-75" />
                         <div className="absolute bottom-6 text-[10px] text-gray-400 tracking-widest uppercase">
                            Dr. J. van der Berg
                         </div>
                    </motion.div>
                </div>

                {/* App Icon Mockup */}
                <div className="flex items-center gap-8 pt-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-[#0F172A] rounded-[22px] shadow-xl flex items-center justify-center overflow-hidden">
                             {/* Gloss effect */}
                             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                             <CrescentShape className="w-14 h-14 drop-shadow-lg" color="#C7A35A" />
                        </div>
                        <span className="block text-center text-xs mt-3 font-bold text-[#0F172A]/50 tracking-widest">APP ICON</span>
                    </div>
                    
                    {/* Pattern Swatch */}
                    <div className="flex-1 h-32 bg-[#0F172A] rounded-xl overflow-hidden relative shadow-inner">
                         <div className="absolute inset-0 flex flex-wrap gap-6 p-4 opacity-20 scale-75">
                            {[...Array(12)].map((_, i) => (
                                <CrescentPatternShape key={i} color="#C7A35A" className="w-12 h-12" />
                            ))}
                         </div>
                         <div className="absolute bottom-3 right-4 text-xs text-[#C7A35A] tracking-widest font-bold">
                            PATTERN
                         </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default BrandIdentity;