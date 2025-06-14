/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1f2937',
        'secondary-bg': '#374151',
        'accent': '#14b8a6', // or '#3b82f6'
        'text-primary': '#f3f4f6',
        'text-secondary': '#9ca3af',
      },
    },
  },
  plugins: [],
}