import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/token'
import addRoutes from '.'
import Login from '@/views/Login/Login.vue'

export type TRoutes = RouteRecordRaw & {
    children?: TRoutes[],
    meta?: {
        name?: string
        menu?: boolean
        icon?: string 
    }
}

export const routes: TRoutes[] = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        title: '登录'
    }
}, {
    path: '/',
    name: 'Layout',
    component: () => import('@/Layout/Layout.vue'),
    meta: {},
    children: []
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let isAdd = false
router.beforeEach(async (to, from ,next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (getToken()) {
            // 防止路由跳转死循环
            if (!isAdd) {
                await addRoutes()
                isAdd = true
                router.push(to.fullPath)
            }
            next()
        } else {
            next('/login')
        }
    }
})

export default router