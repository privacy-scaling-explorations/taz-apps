/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono'],
        year: ['Poppins'],
      },
      fontSize: {
        'brand-sm': '.9rem',
        'brand-4xl': ['2.75rem', '2.6rem'],
        'brand-2xs': ['.75rem', '.75rem'],
      },
      colors: {
        brand: {
          beige: '#EAE1DA',
          beige2: '#F0EBE8',
          gray: '#475F6F',
          gray2: '#000000',
          gray60: '#333333',
          red: '#BD5141',
          black: '#1E1E1E',
          yellow: '#EFAD5F',
          orange: '#BD5141',
          brown: '#402917',
          brown2: '#513E2E',
        },
      },
      boxShadow: {
        question: '4px 4px 25px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
