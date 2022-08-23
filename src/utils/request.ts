import { notification } from 'ant-design-vue'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import config from '../config/request.config'
import { IResponseType } from '../types/response'
import { getToken, setToken } from './token'

const { baseURL, timeout } = config
const instance: AxiosInstance = axios.create({
    baseURL: baseURL + '/api',
    timeout,
    withCredentials: true
})

instance.interceptors.request.use(request => {
    getToken() && (request.headers!['Authorization'] = getToken()!)
    return request
}, error => error)

instance.interceptors.response.use(response => {
    const token = response.headers['authorization']
    token && setToken(token)
    return response
}, error => {
    const status = error.response.status
    let message = '服务器繁忙'
    switch(status) {
        case 404:
            message = '资源不存在'
            break
        case 401:
            message = '无效的令牌'
            break
        case 403:
            message = '禁止访问'
            break
        case 500:
            message = '服务器错误'
            break
    }
    notification.error({ message: status, description: message })
    return Promise.reject(error)
})

const request = async <T = any>(config: AxiosRequestConfig): Promise<IResponseType<T>> => {
    try {
        const { data } = await instance.request<IResponseType<T>>(config)
        return data
    } catch(e) {
        return Promise.reject(e)
    }
}

export default request