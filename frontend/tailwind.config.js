/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0f172a',
          850: '#1a202c',
          800: '#1f2937',
          700: '#374151',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
      },
    },
  },
  plugins: [],
};
