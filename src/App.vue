<script setup lang="ts">
import { computed } from 'vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { Lang } from './locale'
import I18nStore from '@/store/i18n'

const i18nStore = I18nStore()
</script>

<template>
	<a-config-provider :locale="i18nStore.lang === 'en' ? enUS : zhCN">
		<RouterView />
	</a-config-provider>
</template>

<style scoped>

</style>
