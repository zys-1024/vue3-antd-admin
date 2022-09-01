import { defineStore } from 'pinia'
import useTheme from '@/hooks/useTheme'
import { DebuggerEvent } from 'vue'

interface IThemeType { light: 'light', dark: 'dark' }
interface IMenuType { inline: 'inline', horizontal: 'horizontal', mix: 'mix' }
interface ILayoutState {
    collapse: boolean
    menuType: keyof IMenuType
    menuTheme: keyof IThemeType
    themeMode: keyof IThemeType
    primaryColor: string
}

const theme = useTheme()

const initConfig: ILayoutState = {
    collapse: false,
    menuType: 'inline',
    menuTheme: 'light',
    themeMode: 'light',
    primaryColor: '#1890FF'
}

const init = (): ILayoutState => {
    const storage = window.localStorage.getItem('layoutConfig')
    if (storage) {
        return JSON.parse(storage) as ILayoutState
    }
    return initConfig
}

const layoutStore = defineStore('layout', {
    state: (): ILayoutState => ({ ...init() }),
    actions: {
        setMenuType(type: keyof IMenuType) {
            this.menuType = type
        },
        setMenuTheme(theme: keyof IThemeType) {
            this.menuTheme = theme
        },
        setThemeMode(mode: keyof IThemeType) {
            this.themeMode = mode
        },
        setThemePrimaryColor(color: string) {
            this.primaryColor = color
            theme.setPrimaryColor(color)
        }
    }
})

layoutStore().$subscribe((state) => {
    window.localStorage.setItem('layoutConfig', JSON.stringify((state.events as DebuggerEvent).target))
})

export default layoutStore