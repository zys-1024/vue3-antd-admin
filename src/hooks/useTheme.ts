import { reactive } from 'vue'

interface IMenuTheme { light: string, dark: string }
export interface IMenuMode { inline: string, vertical: string, horizontal: string }
interface IMenuMode2 extends IMenuMode { mix: string }
interface IThemeConfig {
    menuTheme: keyof IMenuTheme
    menuMode: keyof IMenuMode2
}

const config = reactive<IThemeConfig>({
    menuTheme: 'light',
    menuMode: 'inline'
})

export default function() {

    const getMenuTheme = (): keyof IMenuTheme => config.menuTheme

    const setMenuTheme = (theme: keyof IMenuTheme) => {
        config.menuTheme = theme
    }

    const getMenuMode = (): keyof IMenuMode2 => {
        return config.menuMode
    }

    const setMenuMode = (mode: keyof IMenuMode2) => {
        config.menuMode = mode
    }

    return {
        getMenuTheme,
        setMenuTheme,
        getMenuMode,
        setMenuMode
    }
}