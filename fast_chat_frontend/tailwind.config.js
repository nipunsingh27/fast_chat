/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',  // Include if using the Pages Router too
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': 'var(--font-geist-sans)',
        'geist-mono': 'var(--font-geist-mono)',
      },
      colors:{
        'gray':'#BEBEBE',
        'purple':'#937CDC'
      }
    },
  },
  plugins: [],
};
