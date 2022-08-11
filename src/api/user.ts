import request from '@/utils/request'

export interface ILoginForm { username: string, password: string, code: string }

export const getCode = () => request<string>({
    url: '/user/code',
    method: 'get'
})

export const login = (data: ILoginForm) => request<{username: string}>({
    url: '/user/login',
    method: 'post',
    data
})