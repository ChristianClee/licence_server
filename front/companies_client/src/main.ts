import './assets/styles/native/main.css'
import './assets/styles/vuetify/vuetify-settings.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // 2. 必须！这是 Vuetify 的全局样式

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify()


app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
