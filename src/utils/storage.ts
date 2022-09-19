export const setStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value)
}

export const getStorage = (key: string): string | null => {
    return window.localStorage.getItem(key)
}

export const removeStorage = (key: string) => {
    window.localStorage.removeItem(key)
}