import React from 'react';
import { Sparkles, Shield, Code2, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 sm:px-8 mt-16 text-xs sm:text-sm border-t border-[#F1E4EC] bg-white/95 backdrop-blur-md text-[#5E5364]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#E91E63] via-[#FB923C] to-[#F59E0B] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-[#2D2530]">INNOPILOT AI Platform</span>
          <span className="text-[#F1E4EC]">|</span>
          <span className="text-[#5E5364]">Next-Gen Capstone & Research Discovery</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#5E5364]">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#10B981]" />
            JWT & RBAC Secured
          </span>
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#0EA5E9]" />
            REST + MongoDB
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#FB923C]" />
            AI Service Gateway
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
