import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@fontsource/source-serif-4';
import '@fontsource/source-sans-3';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster />
  </>
);