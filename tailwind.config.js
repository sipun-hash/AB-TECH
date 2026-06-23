/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#f2f2f2',
        surfaceDark: 'rgba(255, 255, 255, 0.45)',
        brandRed: '#1E6B7B', // Primary brand teal (mapped for compatibility)
        brandTeal: '#1E6B7B', // Primary brand teal
        brandAmber: '#1A3D63', // Secondary brand blue (#1A3D63)
        textPrimary: '#112F35', // Deep teal-black
        textMuted: '#527076', // Muted slate-teal
        glow: 'rgba(30, 107, 123, 0.12)',
        glowAmber: 'rgba(26, 61, 99, 0.12)',
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 10s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      boxShadow: {
        'neon-red': '0 0 15px rgba(30, 107, 123, 0.2)',
        'neon-red-lg': '0 0 25px rgba(30, 107, 123, 0.35)',
        'neon-teal': '0 0 15px rgba(30, 107, 123, 0.2)',
        'neon-teal-lg': '0 0 25px rgba(30, 107, 123, 0.35)',
        'neon-amber': '0 0 15px rgba(26, 61, 99, 0.2)',
      }
    },
  },
  plugins: [],
}
