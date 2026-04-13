/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'deep-forest': '#041F1A',
        'mineral-teal': '#00B4A6',
        'teal-dark': '#005952',
        'lime-energy': '#BCF60C',
        'sunrise-gold': '#FFB347',
        'charcoal': '#0A0D10',
        'charcoal-light': '#14181E',
        'mist': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-vertical': 'scan-vertical 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(3xl)' },
          '50%': { opacity: '0.8', filter: 'blur(2xl)' },
        },
        'scan-vertical': {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        }
      }
    },
  },
  plugins: [],
};