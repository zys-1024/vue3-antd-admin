import { createI18n } from 'vue-i18n'
import zh from './zh-cn'
import en from './en'

export enum Lang { 
    ZH = 'zh',
    EN = 'en'
}

const i18n = createI18n({
    legacy: false,
    locale: window.localStorage.getItem('lang') || window.navigator.language.toLocaleLowerCase().split('-')[0] || 'en',
    globalInjection: true,
    fallbackLocale: 'zh',
    messages: { zh, en }
})

export default i18n