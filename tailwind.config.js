
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // plugins: [],
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'h1': { margin: '0' },
        'h3': { margin: '0' },
        'p': { margin: '0' },
        'ul': { marginBottom: '10px' },
      })
    },
  ],
}