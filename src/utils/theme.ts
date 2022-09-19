import { useDark, useToggle } from '@vueuse/core'
import dark from 'ant-design-vue/dist/antd.dark.less'
import { getStorage, setStorage } from './storage'

const config = useDark({
    storageKey: 'theme-mode',
    valueLight: 'light',
    valueDark: 'dark'
})

// 切换模式
export const toggle: () => boolean = useToggle(config)

export const isDark = (): boolean => {
    return getStorage('theme-mode') === 'dark'
}

// 开/关 暗黑模式
const darkMode = (enabled: boolean = isDark()) => {
    let style = document.querySelector('style#theme')
    const mode = enabled ? 'dark' : 'light'
    if (!style) {
        style = document.createElement('style')
        style.id = 'theme'
    }
    style.innerHTML = enabled ? dark : ''
    document.head.appendChild(style)
    setStorage('theme-mode', mode)
    document.querySelector('html')!.className = mode
}

export default darkMode