/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      white:'#F9FAFC',
      darkGray:'#D5D5D5',
      lightGgray:'#F5F6FA',
      gray:'#606060',
      blue:'#007EA7',
      darkBlue:'#003249',
      },
      fontSize:{
        'headline':'42px',
        'md':'16px',
        'sm':'14px',
      },
      borderRadius:{
        'input':'4px',
        'button':'6px'
      }
    }
  },
  plugins: [],
}

