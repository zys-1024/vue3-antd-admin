import { defineStore } from 'pinia'
import { Lang } from '@/locale'

interface IState { lang: Lang }

const i18nStore = defineStore('i18n', {
    state: (): IState => ({
        lang: Lang.ZH
    }),
    actions: {
        changeLang(lang: Lang) {
            this.lang = lang
            window.localStorage.setItem('lang', lang)
        }
    }
})

export default i18nStore