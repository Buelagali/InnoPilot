import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-[#fff0f5] text-[#6b5560] border-[#f3c5d3]',
    primary: 'bg-[#fce4ec] text-[#e91e63] border-[#f3c5d3]',
    pink: 'bg-[#fce4ec] text-[#e91e63] border-[#f3c5d3]',
    rose: 'bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]',
    blush: 'bg-[#fff0f5] text-[#ec407a] border-[#f3c5d3]',
    success: 'bg-[#fff1f2] text-[#e11d48] border-[#fecdd3]',
    warning: 'bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]',
    danger: 'bg-[#ffe4e6] text-[#be123c] border-[#fecdd3]',
    purple: 'bg-[#fdf2f8] text-[#db2777] border-[#fbcfe8]',
    cyan: 'bg-[#fff0f5] text-[#ec407a] border-[#f3c5d3]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
