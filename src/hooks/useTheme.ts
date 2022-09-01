import { reactive } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

interface IMenuTheme { light: string, dark: string }
export interface IMenuMode { inline: string, vertical: string, horizontal: string }
interface IMenuMode2 extends IMenuMode { mix: string }
interface IThemeConfig {
    menuTheme: keyof IMenuTheme
    menuType: keyof IMenuMode2
    primaryColor: string
    [key: string]: string
}

const config_ = window.localStorage.getItem('layoutConfig')
const config = reactive<IThemeConfig>({
    menuTheme: 'light',
    menuType: 'inline',
    primaryColor: '#1890ff'
})

function useStyle() {
    if (config_) {
        const parse = JSON.parse(config_) as IThemeConfig
        setAppAttr('menu-theme', parse['menuTheme'])
        setAppAttr('menu-type', parse['menuType'])
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
    return {
        setPrimaryColor,
        setAppAttr,
        useStyle
    }
}