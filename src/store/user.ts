import { defineStore } from 'pinia'
import { login, ILoginForm } from '@/api/user'

const userStore = defineStore('user', {
    state: () => ({
        username: '',
    }),
    actions: {
        async login(form: ILoginForm) {
            const { data, code, msg } = await login(form)
            ElMessage[code === 200 ? 'success' : 'error'](msg)
            if (code === 200) {
                this.username = data.username
            }
        }
    }
})

export default userStore