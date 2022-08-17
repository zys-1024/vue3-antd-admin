import { defineStore } from 'pinia'
import { login, ILoginForm } from '@/api/user'
import { IUserInfo } from '@/types/user'
import { getToken, removeToken } from '@/utils/token'
import router from '@/router/routes'

const userInfo = getToken()

const userStore = defineStore('user', {
    state: () => ({
        userInfo: (userInfo ? JSON.parse(userInfo) : {}) as IUserInfo,
    }),
    actions: {
        async login(form: ILoginForm) {
            const { data, code, msg } = await login(form)
            ElMessage[code === 200 ? 'success' : 'error'](msg)
            if (code === 200) {
                this.userInfo = data
                router.push('/')
            }
        },
        logout() {
            removeToken()
            this.userInfo = {} as IUserInfo
            router.push('/login')
        }
    }
})

export default userStore