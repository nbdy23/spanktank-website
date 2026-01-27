
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sk-green': '#435240',
        'sk-grey': '#4d4d4d',
        'sk-light-grey': '#6e6e6e',
        'sk-border-grey': '#444742',
        'sk-font-grey': '#2c2e2c',
        'sk-background': '#f5f5f5',
        'sk-white': '#fffaf0',
        'sk-dark': '#0d0d0d',
        'sk-black': '#1a1a1a',
        'sk-accent': '#5a6b56',
        'sk-accent-light': '#6b7d66',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'accent': ['Orbitron', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'text-reveal': 'textReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.2)' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}