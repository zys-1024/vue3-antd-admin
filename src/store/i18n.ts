import { defineStore } from 'pinia'
import { Lang } from '@/locale'

interface IState { lang: Lang }

const i18nStore = defineStore('i18n', {
    state: (): IState => ({
        lang: (window.localStorage.getItem('lang') || window.navigator.language.toLocaleLowerCase().split('-')[0] || 'zh') as Lang
    }),
    actions: {
        changeLang(lang: Lang) {
            this.lang = lang
            window.localStorage.setItem('lang', lang)
        }
    }
})

export default i18nStore