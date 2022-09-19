import { defineStore } from 'pinia'
import { Lang } from '@/locale'
import { getStorage, setStorage } from '@/utils/storage'

interface IState { lang: Lang }

const i18nStore = defineStore('i18n', {
    state: (): IState => ({
        lang: (getStorage('lang') || window.navigator.language.toLocaleLowerCase().split('-')[0] || 'zh') as Lang
    }),
    actions: {
        changeLang(lang: Lang) {
            this.lang = lang
            setStorage('lang', lang)
        }
    }
})

export default i18nStore