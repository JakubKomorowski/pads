/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        main: '#FF5F49',
        dark: '#ff3216',
        grey: '#bfbfbf'
      },
      fontFamily: {
        mukta: 'Mukta'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ]
}
