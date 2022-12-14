<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { getCode, ILoginForm } from '@/api/user'
import UserStore from '@/store/user'
import i18n from '@/locale'
import { FormInstance } from 'ant-design-vue/es'
import { removeLoading } from '@/utils/tools'

const t = i18n.global.t
const userStore = UserStore()
const form = reactive<ILoginForm>({ username: 'admin', password: '123456', code: '' })
// computed保证再次显示验证信息时，语言更改成功
const rules = computed(() => ({
    username: [{ required: true, message: t('login.error.username') }],
    password: [{ required: true, message: t('login.error.password') }],
    code: [{ required: true, message: t('login.error.code') }]
}))
const code = ref<string>('')
const formRef = ref<FormInstance>()
const loading = ref<boolean>(false)

onMounted(() => { 
    removeLoading()
    getCode_()
    document.addEventListener('keyup', enter)
})
onUnmounted(() => {
    document.removeEventListener('keyup', enter)
})

const enter = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
        submit()
    }
}

// 切换语言后，表单验证信息不会跟着切换语言，直接清除验证信息
watch(() => i18n.global.locale.value, () => {
    formRef.value?.clearValidate()
})

const inputFocus = () => {
    const input = document.querySelector('.ant-form-item-has-error input') as HTMLInputElement
    input?.focus()
}

const getCode_ = async () => {
    const { data } = await getCode()
    code.value = data
}

const submit = async () => {
    try {
        await formRef.value?.validateFields()
        loading.value = true
        try {
            await userStore.login(form)
        } catch(e) {
            loading.value = false
        }
    } catch(e) {
         inputFocus()
    }
}
</script>

<template>
    <div class="login">
        <div class="login-other flex flex-middle">
            <DarkModeSwitch style="margin-top: -2px;" />
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
                <a-form :model="form" ref="formRef">
                    <h2>{{ $t('login.submit') }}</h2>
                    <a-form-item has-feedback name="username" :rules="rules.username">
                        <a-input v-model:value="form.username" size="large" :placeholder="$t('login.placeholder.username')">
                            <template #prefix>
                                <SvgIcon name="user" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item has-feedback name="password" :rules="rules.password">
                        <a-input-password v-model:value="form.password" size="large" :placeholder="$t('login.placeholder.password')">
                            <template #prefix>
                                <SvgIcon name="lock" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item has-feedback name="code" :rules="rules.code" class="verify-item">
                        <div class="login-form-verify flex flex-between flex-nowrap">
                            <a-input v-model:value="form.code" size="large" :placeholder="$t('login.placeholder.code')">
                                <template #prefix>
                                    <SvgIcon name="verify" />
                                </template>
                            </a-input>
                            <span class="login-form-verify-code pointer" @click="getCode_" v-html="code"></span>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div class="flex flex-between" style="width: 100%;">
                            <a-checkbox>{{ $t('login.remember') }}</a-checkbox>
                            <span class="forget-password pointer">{{ $t('login.forget') }}</span>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div class="login-methods flex flex-wrap" style="width: 100%;">
                            <a-button class="flex-grow">{{ $t('login.phoneLogin') }}</a-button>
                            <a-button class="flex-grow">{{ $t('login.qrcodeLogin') }}</a-button>
                            <a-button class="flex-grow">{{ $t('login.register') }}</a-button>
                        </div>
                    </a-form-item>
                    <a-form-item style="margin-bottom: 10px;">
                        <a-button type="primary" size="large" :loading="loading" style="width: 100%;" @click="submit">{{ $t('login.submit') }}</a-button>
                    </a-form-item>
                    <a-form-item>
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
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: var(--login-bg-img);
    background-color: var(--login-bg);
    background-size: cover;
    overflow: auto;
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
        .a-switch { display: block; }
        .login-change-locale {
            margin-left: 15px;
        }
    }
    .login-form {
        position: absolute;
        width: 80%;
        max-width: 800px;   
        left: 50%;
        top: 100px;
        transform: translateX(-50%);
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
            border-radius: var(--z-radius);
            box-shadow: 0 0 5px 0 var(--login-form-border-color);
            background: var(--login-form-bg);
            overflow: hidden;
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
        .ant-form {
            flex: 1;
            width: 1px;
            padding: 20px;
            background: var(--login-form-right-bg);
            h2 { color: var(--text-color); }
            .verify-item  {
                :deep(.ant-form-item-children-icon) {
                    display: none;
                }
            }
            .login-form-verify {
                width: 100%;
                :deep(a-input) { flex: 1; }
                .login-form-verify-code {
                    display: block;
                    border: 1px solid var(--z-border-color);
                    width: 150px;
                    height: 40px;
                    margin-left: 20px;
                    border-radius: var(--z-radius);
                    background-color: #fff;
                }
            }
            .forget-password {
                color: var(--primary-color);
            }
            .login-methods {
                button:nth-child(2) { margin: 0 10px; }
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

    @media screen and (min-width: 0) {
        .login-form {
            width: 95%;
            .login-methods {
                button:nth-child(2) { margin: 0 !important; }
            }
            .login-form-left { display: none; }
        }
    }
    @media screen and (min-width: 576px) {
        .login-form {
            width: 80%;
            .login-methods {
                button:nth-child(2) { margin: 0 10px !important; }
            }
        }
    }
    @media screen and (min-width: 992px) {
        .login-form {
            .login-form-left { display: block; }
        }
    }
}
</style>