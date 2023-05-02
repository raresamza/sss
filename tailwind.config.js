/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 8 row grid
        'test': ' minmax(100px, 620px) 900px',
        'top': ' minmax(500px, 700px) 1000px'
              
      }
    },
  },
  plugins: [
  //   function ({ addVariant }) {
  //     addVariant('child', '& > *');
  //     addVariant('child-hover', '& > *:hover');
  // }
  ],
}