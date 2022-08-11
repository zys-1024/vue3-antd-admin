import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
        title: '登录'
    }
}]