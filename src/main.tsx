import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker with automatic updates
registerSW({
  immediate: true,
  onRegistered(r?: ServiceWorkerRegistration) {
    console.log('[PWA] Service Worker registered successfully:', r);
  },
  onRegisterError(error: unknown) {
    console.warn('[PWA] Service Worker registration failed:', error);
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
