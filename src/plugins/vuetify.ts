// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const getSavedTheme = () => {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return 'light'
  } catch (e) {
    return 'light'
  }
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: getSavedTheme(),
    variations: {
      colors: [],
      lighten: 0,
      darken: 0,
    },
    themes: {
      light: {
        dark: false,  
        colors: {}
      },
      dark: {
        dark: true,  
        colors: {}
      }
    }
  },
})