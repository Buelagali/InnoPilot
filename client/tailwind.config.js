/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        textDark: '#1E1B4B',    // Deep Indigo / Navy Charcoal
        textBody: '#4B5563',    // Slate Neutral
        textMuted: '#9CA3AF',   // Soft Muted Slate
        pageBg: '#F8FAFC',      // Crisp Ethereal Light Background
        // Futuristic AI / Research Pastel Palette
        aiCyan: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        aiViolet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        aiLavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
        },
        aiSky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        aiMint: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
        },
        aiPeach: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
        },
        aiGold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        aiPink: {
          50: '#FFF1F6',
          100: '#FCE4EC',
          200: '#FBCFE8',
          300: '#F9A8C8',
          400: '#F472B6',
          500: '#EC4899',
        },
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        heavy: '24px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-medium': 'floatMedium 5.5s ease-in-out infinite',
        'float-reverse': 'floatReverse 6.5s ease-in-out infinite',
        'orbit-spin-slow': 'orbitSpin 35s linear infinite',
        'orbit-spin-reverse': 'orbitSpinReverse 28s linear infinite',
        'platform-glow': 'platformGlow 4s ease-in-out infinite alternate',
        'robot-hover': 'robotHover 4s ease-in-out infinite',
        'card-float-1': 'cardFloat1 6s ease-in-out infinite',
        'card-float-2': 'cardFloat2 5s ease-in-out infinite',
        'card-float-3': 'cardFloat3 6.5s ease-in-out infinite',
        'card-float-4': 'cardFloat4 5.5s ease-in-out infinite',
        'card-float-5': 'cardFloat5 7s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(-2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(-10px) rotate(-1deg)' },
          '50%': { transform: 'translateY(4px) rotate(1.5deg)' },
        },
        orbitSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitSpinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        platformGlow: {
          '0%': { opacity: '0.6', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1.02)' },
        },
        robotHover: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cardFloat1: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-1deg)' },
        },
        cardFloat2: {
          '0%, 100%': { transform: 'translateY(0px) rotate(3deg)' },
          '50%': { transform: 'translateY(-12px) rotate(5deg)' },
        },
        cardFloat3: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-16px) rotate(-4deg)' },
        },
        cardFloat4: {
          '0%, 100%': { transform: 'translateY(0px) rotate(4deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        cardFloat5: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
}
