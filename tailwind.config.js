/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f0f0f0',
        main: '#FF5F49',
        dark: '#ff3216',
        grey: '#bfbfbf',
        secondary: '#191a18',
        purple: '#BCBCFF',
        green: '#98EFFF',
        yellow: '#FFF485',
        red: '#FF80A1',
        black: '#000',
        white: '#fff'
      },
      fontFamily: {
        mukta: 'Mukta'
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(350px, 390px))'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('daisyui')
  ]
}
