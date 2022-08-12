<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getCode, ILoginForm } from '@/api/user'
import UserStore from '@/store/user'
import { FormInstance, FormRules } from 'element-plus'
import i18n from '@/locale'

const t = i18n.global.t
const userStore = UserStore()
const form = reactive<ILoginForm>({ username: 'admin', password: '123456', code: '' })
const rules = reactive<FormRules>({
    username: [{ required: true, message: t('login.error.username'), trigger: 'blur' }],
    password: [{ required: true, message: t('login.error.password'), trigger: 'blur' }],
    code: [{ required: true, message: t('login.error.code'), trigger: 'blur' }]
})
const code = ref<string>('')
const formRef = ref<FormInstance>()

onMounted(() => {
    getCode_()
})

const getCode_ = async () => {
    const { data } = await getCode()
    code.value = data
}

const submit = () => {
    formRef.value?.validate((valid: boolean) => {
        if(valid) {
            userStore.login(form)
        }
    })
}
</script>

<template>
    <div class="login">
        <ChangeLocale class="login-change-locale" />
        <div class="login-form">
            <p class="login-form-title" v-t="'login.title'" />
            <el-form :model="form" :rules="rules" ref="formRef" size="large">
                <el-form-item prop="username">
                    <el-input v-model="form.username" :placeholder="$t('login.placeholder.username')">
                        <template #prefix>
                            <el-icon>
                                <i-ep-user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" :placeholder="$t('login.placeholder.password')">
                        <template #prefix>
                            <el-icon>
                                <i-ep-lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <div class="login-form-verify flex flex-between flex-nowrap">
                        <el-input v-model="form.code" :placeholder="$t('login.placeholder.code')">
                            <template #prefix>
                                <el-icon>
                                    <i-ep-basketball />
                                </el-icon>
                            </template>
                        </el-input>
                        <span class="login-form-verify-code pointer" @click="getCode_" v-html="code"></span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="submit" v-t="'login.submit'" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("/src/assets/svg/login_bg.svg") 15% 65% no-repeat;
    background-color: #fff;
    .login-change-locale {
        position: absolute;
        top: 15px;
        right: 30px;
    }
    .login-form {
        position: absolute;
        width: 500px;
        height: 460px;
        padding: 30px 50px;
        right: 200px;
        top: calc(50% / 2);
        box-sizing: border-box;
        border-radius: 4px;
        backdrop-filter: blur(20px);
        .login-form-title {
            text-align: center;
            font-size: 30px;
            margin-bottom: 50px;
        }
        .login-form-verify {
            width: 100%;
            :deep(el-input) { flex: 1; }
            .login-form-verify-code {
                display: block;
                border: 1px solid var(--z-border-color);
                width: 150px;
                height: 40px;
                margin-left: 20px;
                border-radius: 4px;
                background-color: #fff;
            }
        }
    }
}
</style>