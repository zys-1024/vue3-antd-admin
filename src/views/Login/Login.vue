<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getCode, ILoginForm } from '@/api/user'
import UserStore from '@/store/user'
import I18nStore from '@/store/i18n'
import { FormInstance, FormRules } from 'element-plus'
import i18n, { Lang } from '@/locale'

const t = i18n.global.t
const userStore = UserStore()
const i18nStore = I18nStore()
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

const langChange = (value: Lang) => {
    i18nStore.changeLang(value)
}

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
        <div class="login-lang flex flex-end pointer">
            <el-dropdown trigger="click" @command="langChange">
                <SvgIcon name="lang" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :command="Lang.ZH">简体中文</el-dropdown-item>
                        <el-dropdown-item :command="Lang.EN">English</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
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
    .login-lang {
        position: absolute;
        top: 16px;
        right: 16px;
        .svg-icon {
            outline: 0;
        }
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
        border: 4px solid rgb(153, 212, 252);
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