<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import I18nStore from '@/store/i18n'
import { Lang } from '@/locale'

const { showLocale, trigger } = defineProps({
    trigger: {
        type: String as PropType<'click' | 'hover'>,
        default: 'click',
    },
    showLocale: {
        type: Boolean,
        default: true
    }
})

const i18nStore = I18nStore()
const i18n = useI18n()

const langChange = (value: Lang) => {
    i18n.locale.value = value
    i18nStore.changeLang(value)
}
</script>

<template>
    <div class="change-locale pointer flex flex-middle">
        <el-dropdown  :trigger="trigger" @command="langChange">
            <div class="flex flex-middle flex-end ">
                <SvgIcon name="lang" />
                <span class="show-locale" v-if="showLocale">{{ i18nStore.lang === 'zh' ? '简体中文' : 'English' }}</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :command="Lang.ZH">简体中文</el-dropdown-item>
                    <el-dropdown-item :command="Lang.EN">English</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style lang="scss" scoped>
.change-locale {
    .svg-icon {
        outline: 0;
        color: var(--text-color);
    }
    .show-locale {
        color: var(--text-color);
        font-size: 13px;
    }
}
</style>