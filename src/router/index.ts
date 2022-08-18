import { getRoutes } from '@/api/routes'
import { Router, RouteRecordRaw } from 'vue-router'
import router, { TRoutes } from './routes'

export let menus: TRoutes[] = []

const addRoutes = async () => {
    const { data, msg, code } = await getRoutes()
    const routes = formatRoutes(data)
    menus = routes
    try {
        addChildren('Layout', routes)
    } catch(e) {
        console.log(e)
    }
}

const addChildren = (comp: string, children: TRoutes[]) => {
    children.forEach(child => {
        router.addRoute(comp, child)
        if (child.children?.length) {
            addChildren(child.name as string, child.children)
        }
    })
}

// 获取views文件夹下的所有组件, 返回 { ../views/**/*.vue: () => import('') }
const modules = import.meta.glob(`../views/**/*.vue`)

const formatRoutes = (data: RouteRecordRaw[]): RouteRecordRaw[] => {
    const components =  data.map(item => {
        if (item.component) {
            // 后台返回的component是组件路径字符串， 需要转成Component
            item.component = modules[`..${item.component}`]
            if (item.children?.length) {
                item.children = formatRoutes(item.children)
            }
        }
        return item
    })
    return components
}

export default addRoutes