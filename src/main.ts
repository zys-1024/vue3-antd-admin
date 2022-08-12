import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import './assets/style/index.scss'
import App from './App.vue'
import i18n from '@/locale'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(i18n).use(createPinia()).use(router).mount('#app')
