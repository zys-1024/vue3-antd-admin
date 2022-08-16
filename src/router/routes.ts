import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [{
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
    children: [{
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: { 
            title: '首页'
        }
    }, {
        path: '/home',
        redirect: ''
    }]
}]