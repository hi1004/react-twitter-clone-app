/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        pointerhover: {
          raw: '(hover: hover) and (pointer: fine)',
        },
      },
      colors: {
        primary: '#1DA1F2',
      },
    },
  },

  plugins: [],
};
