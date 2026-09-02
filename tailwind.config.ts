import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#FF3B30', deep: '#CC2200', soft: '#FF6B62' },
        carbon: '#0F0F0F',
        surface: { DEFAULT: '#141414', 2: '#1A1A1A' },
      },
      keyframes: {
        'live-pulse': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        'slide-in-right': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'live-pulse': 'live-pulse 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'slide-in-right': 'slide-in-right 200ms ease-out',
        'fade-in': 'fade-in 200ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;