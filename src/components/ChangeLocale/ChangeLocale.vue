<script lang="ts" setup>
import { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import I18nStore from '@/store/i18n'
import { Lang } from '@/locale'
import { MenuProps } from 'ant-design-vue';

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

const langChange: MenuProps['onClick'] = ({ key }) => {
    i18n.locale.value = key as string
    i18nStore.changeLang(key as Lang)
}
</script>

<template>
    <div class="change-locale pointer flex flex-middle">
        <a-dropdown  :trigger="[trigger]">
            <div class="flex flex-middle flex-end ">
                <SvgIcon name="lang" />
                <span class="show-locale" v-if="showLocale">{{ i18nStore.lang === 'zh' ? '简体中文' : 'English' }}</span>
            </div>
            <template #overlay>
                <a-menu @click="langChange">
                    <a-menu-item :key="Lang.ZH">简体中文</a-menu-item>
                    <a-menu-item :key="Lang.EN">English</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<style lang="less" scoped>
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