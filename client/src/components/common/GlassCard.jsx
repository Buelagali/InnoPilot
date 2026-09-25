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
    violet: 'pastel-glass-violet hover:border-aiViolet-400',
    cyan: 'pastel-glass-cyan hover:border-aiCyan-400',
    sky: 'pastel-glass-sky hover:border-aiSky-400',
    mint: 'pastel-glass-mint hover:border-aiMint-400',
    peach: 'pastel-glass-peach hover:border-aiPeach-400',
    gold: 'pastel-glass-gold hover:border-aiGold-400',
    pink: 'pastel-glass-pink hover:border-aiPink-400',
  };

  const selectedVariant = variantStyles[variant] || '';

  return (
    <div
      className={`rounded-3xl transition-all duration-300 ${
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
    default: 'bg-white/80 text-textBody border-slate-200',
    primary: 'bg-aiViolet-50 text-aiViolet-700 border-aiViolet-200',
    violet: 'bg-aiViolet-50 text-aiViolet-700 border-aiViolet-200',
    cyan: 'bg-aiCyan-50 text-aiCyan-700 border-aiCyan-200',
    sky: 'bg-aiSky-50 text-aiSky-700 border-aiSky-200',
    mint: 'bg-aiMint-50 text-emerald-700 border-aiMint-200',
    peach: 'bg-aiPeach-50 text-amber-800 border-aiPeach-200',
    gold: 'bg-aiGold-50 text-amber-900 border-aiGold-200',
    pink: 'bg-aiPink-50 text-aiPink-700 border-aiPink-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    success: 'bg-aiMint-50 text-emerald-700 border-aiMint-200',
    warning: 'bg-aiGold-50 text-amber-900 border-aiGold-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-aiSky-50 text-aiSky-700 border-aiSky-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
};
