/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f2f4f7',
        },
      },
      zIndex: {
        1: 1
      }
    },
  },
  plugins: [],
}

