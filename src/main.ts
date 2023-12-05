import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { axiosSymbol } from './symbols'
import router from './router'
import axios from 'axios'
import { createI18n } from 'vue-i18n'
import strings from './strings'

const app = createApp(App)

app.use(router)

const axiosInstance = axios.create({
    baseURL: 'https://api.thusfa.club/',
    timeout: 10000,
    withCredentials: true,
    })
app.provide(axiosSymbol, axiosInstance)

const i18n = createI18n({
    legacy: false,
    messages: strings,
    locale: 'zh',
})

app.use(i18n)

app.mount('#app')
