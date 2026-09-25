import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Heart, Shield, Code2, Globe } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className={`w-full py-8 px-4 sm:px-8 mt-16 text-xs sm:text-sm transition-colors ${
      isHomePage
        ? 'border-t border-slate-200/80 bg-white/80 backdrop-blur-md text-slate-500'
        : 'border-t border-white/5 bg-slate-950/80 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className={`font-semibold ${isHomePage ? 'text-slate-800' : 'text-slate-200'}`}>INNOPILOT AI Platform</span>
          <span className={isHomePage ? 'text-slate-300' : 'text-slate-600'}>|</span>
          <span className={isHomePage ? 'text-slate-600' : 'text-slate-400'}>Next-Gen Capstone & Research Discovery</span>
        </div>

        <div className={`flex items-center gap-6 text-xs ${isHomePage ? 'text-slate-500' : 'text-slate-500'}`}>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            JWT & RBAC Secured
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            REST + MongoDB
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-purple-500" />
            AI Service Gateway
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
