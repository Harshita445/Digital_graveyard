import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Patrick Hand', 'Architects Daughter', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#111111',
          light: '#333333',
          muted: '#666666',
          border: '#141414',
        },
        paper: {
          DEFAULT: '#fdfbf7',
          dark: '#f4efe6',
          bg: '#ede9df',
        }
      }
    },
  },
  plugins: [],
};
export default config;
