import request from '@/utils/request'
import { RouteRecordRaw } from 'vue-router'

export const getRoutes = () => request<RouteRecordRaw[]>({
    url: '/router',
    method: 'get'
})