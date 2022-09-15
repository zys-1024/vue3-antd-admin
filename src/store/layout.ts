import { defineStore } from 'pinia'
import useTheme from '@/hooks/useTheme'

interface ILayoutState {
    collapse: boolean
    isDrawer: Boolean
    menuType: keyof MenuType
    menuTheme: keyof ThemeType
    themeMode: keyof ThemeType
    pageStyle: keyof PageStyle
    primaryColor: string
}

const theme = useTheme()

const initConfig: ILayoutState = {
    collapse: false,
    isDrawer: false,
    menuType: 'inline',
    menuTheme: 'light',
    themeMode: 'light',
    pageStyle: 'light',
    primaryColor: '#1890ff'
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
        setMenuType(type: keyof MenuType) {
            this.menuType = type
        },
        setMenuTheme(theme: keyof ThemeType) {
            this.menuTheme = theme
        },
        setThemeMode(mode: keyof ThemeType) {
            this.themeMode = mode
        },
        setPageStyle(style: keyof PageStyle) {
            this.pageStyle = style
        },
        setThemePrimaryColor(color: string) {
            this.primaryColor = color
            theme.setPrimaryColor(color)
        }
    }
})

export default layoutStore