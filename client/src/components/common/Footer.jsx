import React from 'react';
import { Sparkles, Shield, Code2, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 sm:px-8 mt-16 text-xs sm:text-sm border-t border-[#f3c5d3]/70 bg-white/90 backdrop-blur-md text-[#6b5560]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#e91e63] to-[#ec407a] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-[#3a2630]">INNOPILOT AI Platform</span>
          <span className="text-[#f3c5d3]">|</span>
          <span className="text-[#6b5560]">Next-Gen Capstone & Research Discovery</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#6b5560]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#e91e63]" />
            JWT & RBAC Secured
          </span>
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#ec407a]" />
            REST + MongoDB
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#f43f5e]" />
            AI Service Gateway
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
