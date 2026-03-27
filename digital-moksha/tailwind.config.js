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
        background: 'var(--background)',
        surface:    'var(--surface)',
        card:       'var(--glass-bg)',
        primary:    'var(--foreground)',
        secondary:  'var(--secondary)',
        muted:      'var(--muted)',
        border:     'var(--border)',
        silver:     'var(--silver-start)',
        iron:       'var(--silver-end)',
        mist:       'var(--glass-border)',
        accent: {
          phone:  '#7C7CFF',
          social: '#FF7CB0',
          notif:  '#FFBC7C',
          burnout:'#FF7C7C',
        },
        success:    '#6ABF8E', // Retain for indicators, but more muted
        warn:       '#F0A84A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neu':        '4px 4px 10px #0f0f0f, -4px -4px 10px #242424',
        'neu-inset':  'inset 4px 4px 10px #0f0f0f, inset -4px -4px 10px #242424',
        'glass':      '0 8px 32px rgba(0,0,0,0.4)',
        'hero-glow':  '0 0 30px rgba(255,255,255,0.04)',
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
