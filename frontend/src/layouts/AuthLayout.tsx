import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-indigo-50/30 flex flex-col items-center justify-center p-4">
      {children || <Outlet />}
      <div className="mt-6 text-xs text-slate-500 text-center font-medium">
        TRACE-X Blockchain Intelligence Platform • Smart India Hackathon 2026
      </div>
    </div>
  );
};
