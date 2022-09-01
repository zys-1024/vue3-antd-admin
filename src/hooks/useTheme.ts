import { reactive } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

interface IThemeConfig {
    menuTheme: keyof IThemeType
    menuType: keyof IMenuType
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