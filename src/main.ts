import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/routes'
import './style.css'
import './assets/style/index.less'
import 'ant-design-vue/dist/antd.variable.less'
import App from './App.vue'
import i18n from '@/locale'
import 'virtual:svg-icons-register'

createApp(App).use(i18n).use(createPinia()).use(router).mount('#app')
