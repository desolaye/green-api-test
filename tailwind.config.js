/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222e35',
        secondary: '#111b21',
        special: '#2a3942',
      },
    },
  },
  plugins: [],
}
