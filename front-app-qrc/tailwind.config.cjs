const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    screens: {
      xs: '384px',
      // => @media (min-width: 384px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#FFD791',
        secondary: '#413620',
        tertiary: '#CDD1DE',
        disabled: '#B7CCD2',
        success: '#67B500',
        warning: '#F19100',
        error: '#F3705A',
      },
      textColor: (theme) => theme('accent'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
