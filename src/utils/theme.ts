
import { useDark, useToggle } from '@vueuse/core'
import light from 'ant-design-vue/dist/antd.less'
import dark from 'ant-design-vue/dist/antd.dark.less'

const config = useDark({
    storageKey: 'theme-mode',
    valueLight: 'light',
    valueDark: 'dark'
})

// 切换模式
export const toggle: () => boolean = useToggle(config)

export const isDark = window.localStorage.getItem('theme-mode') === 'dark'

// 开/关 暗黑模式
const darkMode = (enabled: boolean = isDark) => {
    document.getElementById('theme')?.remove()
    const style = document.createElement('style')
    style.id = 'theme'
    style.innerHTML = enabled ? dark : light
    document.head.appendChild(style)
}

export default darkMode