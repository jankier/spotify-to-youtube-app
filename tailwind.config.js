/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-red': '#ff0000',
        'custom-green': '#1db954',
      }
    },
  },
  plugins: [],
}

