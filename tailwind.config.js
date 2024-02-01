/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#5768df',
          500: '#3C50E0',
          950: '#16175F',
        },
        gray: {
          100: '#f2f4f7',
          300: '#C3CCDA',
          500: '#696989',
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

