<script setup lang="ts">
import { onMounted } from 'vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import I18nStore from '@/store/i18n'
import darkMode from './utils/theme'
import useTheme from './hooks/useTheme'

const i18nStore = I18nStore()
const { useStyle } = useTheme()

onMounted(() => {
	darkMode()
	useStyle()
})
</script>

<template>
	<a-config-provider :locale="i18nStore.lang === 'en' ? enUS : zhCN">
		<RouterView />
	</a-config-provider>
</template>

<style lang="less" scoped>

</style>
