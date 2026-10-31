/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Savoria luxury dark palette
        surface: {
          DEFAULT: '#131313',
          dim: '#0e0e0e',
          low: '#1c1b1b',
          container: '#201f1f',
          high: '#2a2a2a',
          highest: '#353534',
        },
        primary: {
          DEFAULT: '#f2be8c',
          container: '#d4a373',
        },
        secondary: {
          DEFAULT: '#ffb59c',
          container: '#c85a32',
        },
        tertiary: {
          DEFAULT: '#c1cbb6',
          container: '#7a8471',
        },
        cream: '#faf7f2',
        muted: '#8c867a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'Arial', 'sans-serif'],
      },
      borderColor: {
        gold: 'rgba(212, 163, 115, 0.15)',
        'gold-accent': 'rgba(212, 163, 115, 0.28)',
      },
    },
  },
  plugins: [],
}
