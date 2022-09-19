<script setup lang="ts">
import { onMounted } from 'vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import I18nStore from '@/store/i18n'
import darkMode from './utils/theme'
import useTheme from './hooks/useTheme'
import layoutStore from './store/layout'
import { setStorage } from './utils/storage'

const i18nStore = I18nStore()
const { useStyle } = useTheme()
const layout = layoutStore()

onMounted(() => {
	darkMode()
	useStyle()
})

layout.$subscribe(() => {
	setStorage('layoutConfig', JSON.stringify((layout.$state)))
})
</script>

<template>
	<a-config-provider :locale="i18nStore.lang === 'en' ? enUS : zhCN">
		<RouterView />
	</a-config-provider>
</template>

<style lang="less" scoped>

</style>
