import { createApp } from 'vue'
// Vuetify
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
// Components
import App from './App.vue'
import router from './router'

// ← Leer tema ANTES de crear Vuetify
const savedTheme = localStorage.getItem('theme')
const defaultTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light'
console.log('Tema inicial:', defaultTheme)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: defaultTheme,
    themes: {
      light: { dark: false, colors: {} },
      dark: { dark: true, colors: {} },
    }
  },
})

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')