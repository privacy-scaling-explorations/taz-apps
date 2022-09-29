/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono'],
        year: ['Poppins']
      },
      fontSize: {
        'brand-sm': '.9rem',
        'brand-4xl': ['2.75rem', '2.6rem'],
        'brand-2xs': ['.75rem', '.75rem'],
        'brand-3xs': '.625rem',
        'brand-h1': '32px',
        'brand-h2': '20px',
        'brand-h3': '16px',
        'brand-button': '14px',
        'brand-body': '14px',
        'brand-info': '12px'
      },
      colors: {
        brand: {
          beige: '#EAE1DA',
          beige2: '#F0EBE8',
          blue: '#435C6C',
          blue2: '#5F99EF',
          gray: '#475F6F',
          gray2: '#000000',
          gray50: '#1E1E1E80',
          gray60: '#333333',
          red: '#BD5141',
          black: '#1E1E1E',
          yellow: '#EFAD5F',
          yellow2: '#EFD85F',
          orange: '#BD5141',
          orange2: '#EE8C45',
          brown: '#402917',
          brown2: '#513E2E',
          green: '#90B188',
          purple: '#8679AB'
        }
      },
      boxShadow: {
        question: '4px 4px 25px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
