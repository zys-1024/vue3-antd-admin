<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { getCode, ILoginForm } from '@/api/user'
import UserStore from '@/store/user'
import { FormInstance } from 'element-plus'
import i18n from '@/locale'

const t = i18n.global.t
const userStore = UserStore()
const form = reactive<ILoginForm>({ username: 'admin', password: '123456', code: '' })
// 语言变更时，表单验证信息跟着改变（不使用computed表单验证信息的语言不会跟着变）
const rules = computed(() => ({
    username: [{ required: true, message: t('login.error.username'), trigger: 'blur' }],
    password: [{ required: true, message: t('login.error.password'), trigger: 'blur' }],
    code: [{ required: true, message: t('login.error.code'), trigger: 'blur' }]
}))
const code = ref<string>('')
const formRef = ref<FormInstance>()
const loading = ref<boolean>(false)

onMounted(() => { 
    getCode_()
    document.addEventListener('keyup', enter)
})
onUnmounted(() => {
    document.removeEventListener('keyup', enter)
})

watch(() => i18n.global.locale.value , () => {
    setTimeout(() => {
        // 语言切换时会自动触发表单验证显示验证信息，使用clearValidate清理验证信息
        formRef.value?.clearValidate()
    }, 0)
})

const enter = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
        submit()
    }
}

const inputFocus = () => {
    const input = document.querySelector('.el-form-item.is-error input') as HTMLInputElement
    input?.focus()
}

const getCode_ = async () => {
    const { data } = await getCode()
    code.value = data
}

const submit = () => {
    formRef.value?.validate(async (valid: boolean) => {
        if(valid) {
            loading.value = true
            await userStore.login(form)
        } else {
            inputFocus()
        }
    })
}
</script>

<template>
    <div class="login">
        <div class="login-other flex flex-middle">
            <DarkMode style="margin-top: -2px;" />
            <ChangeLocale class="login-change-locale" />
        </div>
        <div class="login-form">
            <div class="login-form-header flex flex-center flex-middle">
                <SvgIcon name="vite" />
                <h1 class="login-form-title" v-t="'login.title'" />
            </div>
            <div class="flex">
                <div class="login-form-left">
                    <div></div>
                </div>
                <el-form :model="form" :rules="rules" status-icon ref="formRef" size="large">
                    <h2>{{ $t('login.submit') }}</h2>
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
                        <div class="flex flex-between" style="width: 100%;">
                            <el-checkbox :label="t('login.remember')" />
                            <span class="forget-password pointer">{{ $t('login.forget') }}</span>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="flex flex-between" style="width: 100%;">
                            <el-button size="default" class="flex-grow">{{ $t('login.phoneLogin') }}</el-button>
                            <el-button size="default" class="flex-grow">{{ $t('login.qrcodeLogin') }}</el-button>
                            <el-button size="default" class="flex-grow">{{ $t('login.register') }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 10px;">
                        <el-button type="primary" :loading="loading" style="width: 100%;" @click="submit">{{ $t('login.submit') }}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div class="divider flex flex-middle">
                            <div class="divider-line flex-grow"></div>
                            <span class="divider-text">{{ $t('login.other') }}</span>
                            <div class="divider-line flex-grow"></div>
                        </div>
                        <div class="other-login flex flex-around">
                            <SvgIcon name="qq" />
                            <SvgIcon name="weixin" />
                            <SvgIcon name="dd" />
                            <SvgIcon name="vite" />
                            <SvgIcon name="weibo" />
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--login-bg);
    background-size: cover;
    &::before {
        position: absolute;
        display: block;
        content: "";
        width: 100%;
        height: 400px;
        left: 0;
        top: 0;
        background: var(--login-before-bg);
        border-bottom: 1px solid var(--login-form-border-color);
    }
    .login-other {
        position: absolute;
        top: 15px;
        right: 30px;
        .el-switch { display: block; }
        .login-change-locale {
            margin-left: 15px;
        }
    }
    .login-form {
        position: absolute;
        width: 800px;   
        left: 50%;
        top: 40%;
        transform: translate(-50%, -40%);
        box-sizing: border-box;
        .login-form-header {
            margin-bottom: 40px;
            .svg-icon {
                font-size: 45px;
                margin-right: 15px;
                filter: drop-shadow(0 0 4px);
            }
            .login-form-title {
                margin: 7px 0 0 0;
                color: var(--login-form-title-color);
                text-shadow: var(--login-form-title-shadow);
            }
        }
        .login-form-header+div {
            border-radius: 4px;
            box-shadow: 0 0 0 1px var(--login-form-border-color);
            background: linear-gradient(41deg, black, #3d4f774d);
        }
        .login-form-left {
            position: relative;
            width: 45%;
            padding: 20px;
            background: url('../../assets/svg/login_bg.svg') 50% 50% no-repeat;
            background-size: 80%;
            background-color: var(--login-form-left-bg);
            &::after {
                display: block;
                content: "";
                position: absolute;
                width: 1px;
                height: calc(90% - 20px);
                right: 0;
                top: 27px;
                background: var(--login-form-left-after);
            }
        }
        .el-form {
            width: 55%;
            padding: 20px;
            background: var(--login-form-right-bg);
            h2 { color: var(--text-color); }
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
            .forget-password {
                color: var(--primary-color);
            }
            
            .divider {
                width: 100%;
                color: #989898;
                margin-bottom: 10px;
                .divider-text { margin: 0 15px; }
                .divider-line {
                    border-top: 1px solid var(--border-color);
                }
            }
            .other-login {
                width: 100%;
                .svg-icon {
                    font-size: 27px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>