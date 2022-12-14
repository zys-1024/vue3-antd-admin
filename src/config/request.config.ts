const dev = 'http://localhost:9999'
const prod = 'http://localhost:9999'

const config = {
    // 后台地址
    baseURL: import.meta.env.VITE_ENV === 'development' ? dev : prod,
    // 请求超时
    timeout: 30000
}

export default config