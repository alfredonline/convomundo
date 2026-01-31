/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': {
          50: '#fff1f0',
          100: '#ffe0dd',
          200: '#ffc5bf',
          300: '#ff9d93',
          400: '#ff6b5c',
          500: '#ff1e00',
          600: '#e61a00',
          700: '#cc1600',
          800: '#b31200',
          900: '#990e00',
        },
        'brand-blue': {
          50: '#e8f9fd',
          100: '#d1f3fb',
          200: '#a3e7f7',
          300: '#75dbf3',
          400: '#47cfef',
          500: '#19c3eb',
          600: '#149cbc',
          700: '#0f758d',
          800: '#0a4e5e',
          900: '#05272f',
        },
        'brand-green': {
          50: '#f0fdf6',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#59ce8f',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#166534',
        },
      },
    },
  },
  plugins: [],
}

