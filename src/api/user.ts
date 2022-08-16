import request from '@/utils/request'
import { IUserInfo } from '@/types/user'

export interface ILoginForm { username: string, password: string, code: string }

export const getCode = () => request<string>({
    url: '/user/code',
    method: 'get'
})

export const login = (data: ILoginForm) => request<IUserInfo>({
    url: '/user/login',
    method: 'post',
    data
})