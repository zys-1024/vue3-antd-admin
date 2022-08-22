import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
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
        Components({
            // 自动导入文件夹下的组件
            dirs: ['src/components', 'src/views', 'src/Layout'],
            extensions: ['vue'],
            // 自动导入AntDesign Vue
            resolvers: [AntDesignVueResolver({ importStyle: false })]
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
    css: {
        preprocessorOptions: {
            less: {
                // 开启less支持
                javascriptEnabled: true,
                additionalData: ['@import "@/assets/style/mixin.less";']
            }
        }
    }
})
