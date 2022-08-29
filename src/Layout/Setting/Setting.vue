<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const visible = ref<boolean>(false)
const settingRef = ref<HTMLDivElement>()
const btnRef = ref<HTMLDivElement>()

onMounted(() => {
	const content = document.querySelector('.layout-setting-drawer .ant-drawer-content-wrapper')
	content?.appendChild(btnRef.value as HTMLDivElement)
})

const visibleHandle = () => visible.value = !visible.value
</script>

<template>
    <div class="layout-setting ant-scrolling-effect" ref="settingRef">
		<div class="layout-setting-handle flex flex-center flex-middle" ref="btnRef" @click="visibleHandle">
			<SvgIcon :name="visible ? 'close' : 'setting'" />
		</div>
		<a-drawer class="layout-setting-drawer" v-model:visible="visible" :forceRender="true" :getContainer="settingRef" :closable="false" :width="300">
			<SetLayoutStyle />
		</a-drawer>
    </div>
</template>

<style lang="less" scoped>
.layout-setting {
	:deep(.layout-setting-handle) {
		position: absolute;
		width: 48px;
		height: 48px;
		color: var(--setting-style-handle);
		top: 300px;
		left: -48px;
		font-size: 20px;
		border-radius: var(--z-radius) 0 0 var(--z-radius);
		background-color: var(--setting-bg);
		cursor: pointer;
		.svg-icon { margin: 0; }
	}
}
</style>