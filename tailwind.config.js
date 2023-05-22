/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        success: '#44C4A1',
        error: '#dc3545',
        blue: '#4f46e5',
        primary:{
          900: '#111827',
          500: '#1d2432',
          300: '#29303d',
          100: '#374252',
        },
        white: '#FFFFFF',
        gray:{
          600: '#757575',
          400: '#a2a2a2',
          100: '#FFFFFFB3',
          50: '#f1f5f9',
        }
      }
    },
  },
  plugins: [],
}