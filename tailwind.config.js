/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        one: '#CEDEF2',
        two: '#B4C4D9',
        three: '#99AABF',
        four: '#8090A6',
        five: '#68788C'
      }
    },
  },
  plugins: [],
}