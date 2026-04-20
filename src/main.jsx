import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Preloader from './Shared/Preloader/Preloader';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const helmetContext = {}; // Define helmetContext here

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <Preloader />
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);
