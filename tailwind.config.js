/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#0f0f10',
          800: '#16171a',
          700: '#22232a',
          600: '#33343c',
          500: '#52535b',
          400: '#7c7d85',
          300: '#a8a9b1',
          200: '#cdced4',
          100: '#e8e9ec',
          50:  '#f5f5f7',
        },
        // светлая палитра (warm cream / paper)
        paper: {
          0:   '#f5f1ea',
          50:  '#efe9df',
          100: '#e6dfd3',
          200: '#d6cdbe',
          300: '#b8ad99',
          400: '#867d6c',
          500: '#5a5347',
          600: '#3a362e',
          700: '#26231e',
          800: '#1c1a18',
          900: '#1b1916',
        },
        sand: {
          700: '#8a7660',
          600: '#a89678',
          500: '#bda88a',
          400: '#cbb89c',
          300: '#d9c9b1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        ultratight: '-0.045em',
        tighter2: '-0.025em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
