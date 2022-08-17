import { getRoutes } from '@/api/routes'
import { Router, RouteRecordRaw } from 'vue-router'

const addRoutes = async (router: Router) => {
    const { data, msg, code } = await getRoutes()
    const routes = formatRoutes(data)
    try {
        routes.forEach(item => {
            router.addRoute('Layout', item)
        })
    } catch(e) {
        console.log(e)
    }
}

const modules = () => {
    // 获取views文件夹下的所有组件, 返回 { ../views/**/*.vue: () => import('') }
    return import.meta.glob(`../views/**/*.vue`)
}

const formatRoutes = (data: RouteRecordRaw[]): RouteRecordRaw[] => {
    const components =  data.map(item => {
        if (item.component) {
            // 后台返回的component是组件路径字符串， 需要转成Component
            item.component = modules()[`..${item.component}`]
        }
        return item
    })
    return components
}

export default addRoutes