/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Add TypeScript files
  ],
  theme: {
    extend: {
      colors:{
        customPurple : '#C3B1E1', 
        lightPurple : '#F8E5F9 '
      }
    },
  },
  plugins: [],
}
