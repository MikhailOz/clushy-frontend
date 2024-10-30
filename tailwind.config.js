/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'lostar': ['Lostar', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'gray-stone': '#B3B3B3',
        'gray-charcoal': '#333333',
        'gray-silver': '#A7AAAF',
        'gray-bluish': '#BDC0C6',
        'gray-graphite': '#2F2F2F'
      },
    },
  },
  plugins: [],
}