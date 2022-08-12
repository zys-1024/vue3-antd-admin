<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { Lang } from './locale'
import I18nStore from '@/store/i18n'

const i18nStore = I18nStore()
// 切换Element-Plus语言 
const locale = computed(() => (i18nStore.lang === Lang.ZH ? zhCn : en))
</script>

<template>
	<el-config-provider :locale="locale">
		<RouterView />
	</el-config-provider>
</template>

<style scoped>

</style>
