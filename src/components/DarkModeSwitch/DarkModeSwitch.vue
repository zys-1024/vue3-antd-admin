<script lang="ts" setup>
import { ref } from 'vue'
import darkMode, { toggle } from '@/utils/theme'
import layoutStore from '@/store/layout'

const layout = layoutStore()
const dark = ref<boolean>(layout.themeMode === 'dark')

const change = () => {
	dark.value = toggle()
	darkMode(dark.value)
	layout.setThemeMode(dark.value ? 'dark' : 'light')
	layout.setPageStyle(dark.value ? 'darkMode' : 'light')
}
</script>

<template>
	<div class="z-switch pointer" @click="change">
		<SvgIcon :name="dark ? 'moon' : 'sun'" :class="[dark ? 'dark' : '']" />
	</div>
</template>

<style lang="less" scoped>
    .z-switch {
        position: relative;
        width: 40px;
		height: 20px;
        border-radius: 30px;
        border: 1px solid var(--el-border-color);
        background: var(--bg-color-mute);
		transition: background .3s;
        .svg-icon {
			position: absolute;
			width: 18px;
			height: 18px;
			left: 0;
			border-radius: 50%;
			color: var(--text-color);
			background-color: var(--z-dark-switch-action-bg);
			padding: 2px;
			box-sizing: border-box;
			margin: 0;
			transition: all .3s;
		}
		.svg-icon.dark {
			left: calc(100% - 18px);
		}
    }
</style>