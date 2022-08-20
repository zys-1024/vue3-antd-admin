import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/routes'
import './style.css'
import './assets/style/index.less'
import App from './App.vue'
import i18n from '@/locale'
import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/antd.variable.min.css'

createApp(App).use(i18n).use(createPinia()).use(router).mount('#app')
