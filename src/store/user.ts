import { defineStore } from 'pinia'
import { login, ILoginForm } from '@/api/user'
import { IUserInfo } from '@/types/user'
import { getToken, removeToken } from '@/utils/token'
import router from '@/router/routes'
import { message } from 'ant-design-vue'

const userInfo = getToken()

const userStore = defineStore('user', {
    state: () => ({
        userInfo: (userInfo ? JSON.parse(userInfo) : {}) as IUserInfo,
    }),
    actions: {
        async login(form: ILoginForm): Promise<undefined> {
            const { data, code, msg } = await login(form)
            message[code === 200 ? 'success' : 'error'](msg)
            if (code === 200) {
                this.userInfo = data
                router.push('/')
            } else {
                return Promise.reject()
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