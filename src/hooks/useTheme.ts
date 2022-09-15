import { reactive } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

interface IThemeConfig {
    menuTheme: keyof ThemeType
    menuType: keyof MenuType
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
        setBodyAttr('menu-theme', parse['menuTheme'])
        setBodyAttr('menu-type', parse['menuType'])
        setPrimaryColor(parse.primaryColor)
    }
}

function setBodyAttr (attr: string, value: string) {
    const html = document.body as HTMLBodyElement
    html.setAttribute(attr, value)
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
        setBodyAttr,
        useStyle
    }
}