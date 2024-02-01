/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#E1F1FF',
          400: '#5768df',
          500: '#3C50E0',
          950: '#16175F',
        },
        gray: {
          100: '#f2f4f7',
          300: '#C3CCDA',
          500: '#696989',
          900: '#1C1B1F',
        },
        green: {
          50: '#E6F5F5',
          400: '#54BDB8',
        },
        yellow: {
          400: '#FDB400',
        }
      },
      zIndex: {
        1: 1
      }
    },
  },
  plugins: [],
}

