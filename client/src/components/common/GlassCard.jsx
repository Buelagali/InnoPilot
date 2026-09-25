import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  interactive = false,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: '',
    pink: 'pastel-glass-pink hover:border-[#F472B6]',
    peach: 'pastel-glass-peach hover:border-[#FB923C]',
    gold: 'pastel-glass-gold hover:border-[#F59E0B]',
    mint: 'pastel-glass-mint hover:border-[#10B981]',
    sky: 'pastel-glass-sky hover:border-[#0EA5E9]',
  };

  const selectedVariant = variantStyles[variant] || '';

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${
        interactive ? 'glass-panel-interactive' : 'glass-panel'
      } ${selectedVariant} p-5 sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-white/80 text-[#5E5364] border-[#F1E4EC]',
    primary: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]',
    pink: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]',
    peach: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]',
    gold: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    mint: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    sky: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
    success: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    warning: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    danger: 'bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-sm ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
};
