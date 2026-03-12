"use client";

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#363636',
          borderRadius: '8px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        },
        success: {
          duration: 3000,
          style: {
            background: '#f0fff4',
            border: '1px solid #c6f6d5',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#fff5f5',
            border: '1px solid #fed7d7',
          },
        },
      }}
    />
  );
}; 