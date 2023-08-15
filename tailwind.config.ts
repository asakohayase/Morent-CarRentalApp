import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.25rem', // Extend default value
        sm: '0.125rem', // Extend small value
        lg: '0.5rem', // Extend large value
        xl: '1rem', // Extend extra large value
        '2xl': '1.5rem', // Extend 2 extra large value
        '3xl': '2rem', // Extend 3 extra large value
        '10': '10px', // Add the new 10px value
      },
      screens: {
        lg: '1010px',
      },
      colors: {
        'blue-500': '#3563E9',
        'blue-300': '#5CAFFC',
        'blue-100': '#94A7CB',
        'blue-50': '#C3D4E9',

        'gray-900': '#1A202C',
        'gray-850': '#293346',
        'gray-800': '#424B5C',
        'gray-700': '#3D5278',
        'gray-400': '#90A3BF',

        'white-0': '#FFFFFF',
        'white-100': '#F7F9FC',
        'white-200': '#F6F7F9',
        'red-400': '#ED3F3F',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
export default config;
