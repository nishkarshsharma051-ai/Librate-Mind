/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#FFFFFF',
        fog:   '#F5F5F5',
        mist:  '#EAEAEA',
        silver:'#C0C0C0',
        slate: '#8A8A8A',
        iron:  '#5A5A5A',
        smoke: '#3A3A3A',
        accent: {
          phone:  '#7C7CFF',
          social: '#FF7CB0',
          notif:  '#FFBC7C',
          burnout:'#FF7C7C',
        },
        success: '#6ABF8E',
        warn:    '#F0A84A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neu':        '6px 6px 14px #D1D1D1, -6px -6px 14px #FFFFFF',
        'neu-sm':     '3px 3px 8px #D1D1D1, -3px -3px 8px #FFFFFF',
        'neu-inset':  'inset 4px 4px 10px #D1D1D1, inset -4px -4px 10px #FFFFFF',
        'neu-inset-sm': 'inset 2px 2px 6px #D1D1D1, inset -2px -2px 6px #FFFFFF',
        'card':       '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.1)',
        'glass':      '0 4px 24px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.4,0,0.2,1) forwards',
        'slide-in':   'slideIn 0.3s ease forwards',
        'ring-fill':  'ringFill 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn:   { from: { opacity: 0, transform: 'translateX(-12px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
