/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#b9e3b9',
          300: '#8fd08f',
          400: '#5db85d',
          500: '#2E7D32', // primary green
          600: '#267026',
          700: '#1f5c1f',
          800: '#194919',
          900: '#143b14',
        },
        secondary: {
          50: '#f8f4f3',
          100: '#f0e9e7',
          200: '#e2d3cf',
          300: '#cdb6af',
          400: '#b2968c',
          500: '#795548', // secondary brown
          600: '#6d4c41',
          700: '#5d3f36',
          800: '#4b332c',
          900: '#3e2a23',
        },
        accent: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1976D2', // accent blue
          600: '#1565c0',
          700: '#0d47a1',
          800: '#0a3880',
          900: '#082c6c',
        },
        success: {
          500: '#66bb6a',
        },
        warning: {
          500: '#ffa726',
        },
        error: {
          500: '#ef5350',
        },
      },
      backgroundImage: {
        'leaf-pattern': "url('https://images.pexels.com/photos/1048033/pexels-photo-1048033.jpeg')",
        'farm-pattern': "url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg')",
      },
    },
  },
  plugins: [],
};