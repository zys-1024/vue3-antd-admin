import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/token'
import addRoutes from '.'

export type TRoutes = RouteRecordRaw & {
    meta?: {
        name?: string
        menu?: boolean
        icon?: string 
    }
}

export const routes: TRoutes[] = [{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
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
                await addRoutes(router)
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