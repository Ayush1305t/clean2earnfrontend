/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#87CEEB',
        'sky-blue-dark': '#4A9FB5',
        'light-green': '#90EE90',
        'light-green-dark': '#5AA85A',
        'forest-green': '#228B22',
        'white': '#FFFFFF',
        'soft-white': '#F8FFFE',
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