import { getStorage, removeStorage, setStorage } from "./storage"

export const setToken = (token: string): void => {
    setStorage('token', token)
} 

export const getToken = (): string | null => {
    return getStorage('token')
}

export const removeToken = (): void => {
    removeStorage('token')
}