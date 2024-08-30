/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '/layouts/**/*.{vue}',
    '/pages/**/*.{vue}',
    '/components/**/*.{vue}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['serif'],
    },
    extend: {},
  },
  plugins: [],
}

