import { reactive, watch } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

interface IMenuTheme { light: string, dark: string }
export interface IMenuMode { inline: string, vertical: string, horizontal: string }
interface IMenuMode2 extends IMenuMode { mix: string }
interface IThemeConfig {
    'menu-theme': keyof IMenuTheme
    'menu-mode': keyof IMenuMode2
    primaryColor: string
    [key: string]: string
}

const config_ = window.localStorage.getItem('useTheme')
const config = reactive<IThemeConfig>({
    'menu-theme': 'light',
    'menu-mode': 'inline',
    primaryColor: '#1890ff'
})

watch(config, val => {
    window.localStorage.setItem('useTheme', JSON.stringify(val))
})

function useStyle() {
    if (config_) {
        const parse = JSON.parse(config_) as IThemeConfig
        Object.assign(config, parse)
        Object.keys(parse).filter(item => item !== 'primaryColor').forEach(key => {
            setAppAttr(key, parse[key])
        })
        setPrimaryColor(parse.primaryColor)
    }
}

function setAppAttr (attr: string, value: string) {
    const app = document.getElementById('app') as HTMLDivElement
    app.setAttribute(attr, value)
}

function setPrimaryColor (color: string) {
    config.primaryColor = color
    ConfigProvider.config({
        theme: { primaryColor: color }
    })
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

    const getPrimaryColor = () => {
        return config.primaryColor
    }

    return {
        getMenuTheme,
        setMenuTheme,
        getMenuMode,
        setMenuMode,
        setPrimaryColor,
        setAppAttr,
        getPrimaryColor,
        useStyle
    }
}