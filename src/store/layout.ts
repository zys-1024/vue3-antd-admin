import { defineStore } from 'pinia'
import useTheme from '@/hooks/useTheme'

interface ILayoutState {
    collapse: boolean
    isDrawer: boolean
    menuType: keyof IMenuType
    menuTheme: keyof IThemeType
    themeMode: keyof IThemeType
    primaryColor: string
}

const theme = useTheme()

const initConfig: ILayoutState = {
    collapse: false,
    isDrawer: false,
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
        setCollapse(collapse: boolean) {
            this.collapse = collapse
        },
        setDrawer(isDrawer: boolean) {
            this.isDrawer = isDrawer
        },
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

layoutStore().$subscribe(() => {
    window.localStorage.setItem('layoutConfig', JSON.stringify((layoutStore().$state)))
})

export default layoutStore