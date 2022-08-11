import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const resolve = (dir: string) => {
    return path.resolve(__dirname, dir)
}

const alias: Record<string, string> = {
    '@': resolve('./src'),
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox...
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({ prefix: 'Icon' })
            ],
        }),
        Components({
            resolvers: [
                // 自动注册图标组件
                IconsResolver({ enabledCollections: ['ep'] }),
                // 自动导入 Element Plus 组件
                // 安装 @element-plus/icons-vue 没用，必需要安装 @iconify-json/ep
                ElementPlusResolver()
            ]
        }),
        Icons({
            autoInstall: true
        }),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
            symbolId: 'icon-[dir]-[name]',
        })
    ],
    resolve: { alias },
    server: {
        host: '0.0.0.0',
    },
})
