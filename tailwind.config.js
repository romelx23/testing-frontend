module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      textColors:{
        skin:{
          base:'var(--color-text-base)',
          muted:'var(--color-text-muted)',
          inverted:'var(--color-text-inverted)',
        }
      },
      backgroundColor:{
        skin:{
          fill:'var(--color-fill)',
          'card-muted':'var(--color-text-muted)',
          'text-inverted':'var(--color-text-inverted)',
          'button-accent':'var(--color-button-accent)',
          'button-accent-hover':'var(--color-button-accent-hover)',
          'button-muted':'var(--color-button-muted)',
        }
      },
      gradientColor:{
        skin:{
          hue:'var(--color-fill)'
        }
      },
      colors:{
        'primary':'#06141d',
        'secondary':'#1b2730',
        'terciary':'#c084fc',
        'fourth':'#93c5fd',
        'fifth':'#1e40af',
        'sixth':'#2563eb',
      },
      fontSize:{
        'xs':'10px'
      },
      gridTemplateColumns: {
        // Simple auto column grid
        'simple': 'repeat(auto-fit, minmax(320px, 1fr))',
        'small': 'repeat(auto-fit, minmax(240px, 1fr))',
        'message': '250px 400px',
      },
      height:{
        'message':'80vh',
        'chat':'40vh'
      },
      width:{
        'notification':'550px',
        'networks':'650px',
      },
      // configure google fonts
      fontFamily:{
        'pacifico':['Pacifico','sans-serif','cursive'],
      }
    },
  },
  plugins: [],
}