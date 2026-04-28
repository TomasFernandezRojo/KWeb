/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        foreground: '#F5F5F3',
        gold: '#C9A84C',
        'gold-light': '#E4C06E',
        'gold-dark': '#A8893A',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee var(--duration, 35s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 35s) linear infinite',
        'tools-marquee': 'tools-marquee var(--duration, 25s) linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 2.5rem))' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(calc(-100% - 2.5rem))' },
          to: { transform: 'translateX(0)' },
        },
        'tools-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 2rem))' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
