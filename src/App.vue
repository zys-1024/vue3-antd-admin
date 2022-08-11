<script setup lang="ts">
import { computed, watch } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useI18n } from 'vue-i18n'
import i18nStore from '@/store/i18n'
import { Lang } from './locale'

const i18n = useI18n()
const store = i18nStore()
const locale = computed(() => (store.lang === Lang.ZH ? zhCn : en))

// 切换语言
// 想直接在pinia里面切换，但是i18n报错只能在setup里面使用。。。
watch(() => store.lang, current => {
	i18n.locale.value = current
})
</script>

<template>
	<el-config-provider :locale="locale">
		<RouterView />
	</el-config-provider>
</template>

<style scoped>

</style>
