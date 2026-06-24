import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'
import './styles/main.css'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myDiamond',
    themes: {
      myDiamond: {
        colors: {
          primary: '#0a9b5a',
          secondary: '#2f6fcd',
          surface: '#f6f8f3',
          background: '#d9d9d9',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
