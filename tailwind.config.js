/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':    '#00BCEB',   // cyan accent — stays bright
        'ocean':      '#1A6FA8',   // mid-blue
        'deep-teal':  '#0A2540',   // dark navy
        'ice-cyan':   '#B5E8FA',   // soft cyan text
        'cloud':      '#E8F4FF',   // near-white on dark
        'navy':       '#071527',   // deepest bg
        'navy-mid':   '#0D2340',   // panel bg
        'navy-light': '#122D52',   // card bg
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '8px',
        DEFAULT: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      boxShadow: {
        'glass':  '0 8px 32px rgba(0,15,40,0.40)',
        'panel':  '0 32px 80px rgba(0,10,30,0.70)',
        'card':   '0 4px 24px rgba(0,15,40,0.30)',
        'glow':   '0 0 48px rgba(0,188,235,0.25)',
      },
      backgroundImage: {
        'gradient-page':  'linear-gradient(135deg, #071527 0%, #0B1F3A 50%, #0E2D52 100%)',
        'gradient-hero':  'linear-gradient(135deg, #0D2444 0%, #0A1F3D 55%, #071527 100%)',
        'gradient-dark':  'linear-gradient(135deg, #0A1F3D 0%, #071527 100%)',
        'gradient-light': 'linear-gradient(135deg, #122D52 0%, #0D2444 100%)',
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'sparkle':  'sparkle 3s ease-in-out infinite',
        'fade-up':  'fadeUp 0.6s ease-out forwards',
        'scroll':   'scrollPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.3)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'translateY(0)' },
          '50%':      { opacity: '1',   transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}

