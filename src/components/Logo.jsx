
import React from 'react';

// Using the second image provided which appears to be the icon-only version (House + Cross)
// The first image likely includes the text "Doctor at Home" stacked below it.
const ICON_URL = "https://horizons-cdn.hostinger.com/6c1a6197-86ec-489c-9089-7baf5312cbb4/ba8a59d64c61dc61c6aeb6b1353ca11b.png";

export const LogoHorizontal = ({ className = "", lightMode = false, title = "Doctor at Home" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="h-10 w-auto flex items-center justify-center shrink-0">
        <img 
            src={ICON_URL} 
            alt="Doctor at Home Icon" 
            className="h-full w-auto object-contain"
        />
    </div>
    <span 
        className={`font-serif font-bold text-xl tracking-tight text-slate-900 ${lightMode ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </span>
  </div>
);

export default LogoHorizontal;
