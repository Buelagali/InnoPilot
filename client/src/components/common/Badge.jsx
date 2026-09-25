import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-white/80 text-[#5E5364] border-[#F1E4EC]',
    primary: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]',
    pink: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]',
    rose: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]',
    blush: 'bg-[#FFF0F5] text-[#EC407A] border-[#FBCFE8]',
    peach: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]',
    orange: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]',
    gold: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    yellow: 'bg-[#FEFCE8] text-[#A16207] border-[#FEF08A]',
    mint: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    green: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    success: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    sky: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
    blue: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]',
    info: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]',
    warning: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    danger: 'bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]',
    purple: 'bg-[#FDF4FF] text-[#A21CAF] border-[#F5D0FE]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-sm transition-all duration-200 ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
