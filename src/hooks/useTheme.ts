import { reactive, watch } from 'vue'

interface IMenuTheme { light: string, dark: string }
export interface IMenuMode { inline: string, vertical: string, horizontal: string }
interface IMenuMode2 extends IMenuMode { mix: string }
interface IThemeConfig {
    'menu-theme': keyof IMenuTheme
    'menu-mode': keyof IMenuMode2
}

const config_ = window.localStorage.getItem('useTheme')
const config = reactive<IThemeConfig>({
    'menu-theme': 'light',
    'menu-mode': 'inline'
})

if (config_) {
    const parse = JSON.parse(config_)
    Object.assign(config, parse)
    Object.keys(parse).forEach(key => {
        setAppAttr(key, parse[key])
    })
}

watch(config, val => {
    window.localStorage.setItem('useTheme', JSON.stringify(val))
})

function setAppAttr (attr: string, value: string) {
    const app = document.getElementById('app') as HTMLDivElement
    app.setAttribute(attr, value)
}

export default function() {

    const getMenuTheme = (): keyof IMenuTheme => {
        return config['menu-theme']
    }

    const setMenuTheme = (theme: keyof IMenuTheme) => {
        config['menu-theme'] = theme
    }

    const getMenuMode = (): keyof IMenuMode2 => {
        return config['menu-mode']
    }

    const setMenuMode = (mode: keyof IMenuMode2) => {
        config['menu-mode'] = mode
    }

    return {
        getMenuTheme,
        setMenuTheme,
        getMenuMode,
        setMenuMode,
        setAppAttr
    }
}