import React from 'react';
import { Sparkles, Heart, Shield, Code2, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/80 py-8 px-4 sm:px-8 mt-16 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-200">InnoPilot AI Platform</span>
          <span className="text-slate-600">|</span>
          <span>Next-Gen Capstone & Research Discovery</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            JWT & RBAC Secured
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            REST + MongoDB
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            AI Service Gateway
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
