<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const visible = ref<boolean>(true)
const settingRef = ref<HTMLDivElement>()
const btnRef = ref<HTMLDivElement>()
const colors = ['#1890ff', '#f00', '#ff0062', '#f50', '#87d068']

onMounted(() => {
	const content = document.querySelector('.layout-setting-drawer .ant-drawer-content-wrapper')
	content?.appendChild(btnRef.value as HTMLDivElement)
})

const visibleHandle = () => visible.value = !visible.value
</script>

<template>
    <div class="layout-setting" ref="settingRef">
		<div class="layout-setting-handle flex flex-center flex-middle" ref="btnRef" @click="visibleHandle">
			<SvgIcon :name="visible ? 'close' : 'setting'" />
		</div>
		<a-drawer class="layout-setting-drawer" v-model:visible="visible" :getContainer="settingRef" :closable="false" :width="300">
			<div class="layout-setting-item layout-setting-style">
				<p>{{ $t('setting.pageStyle') }}</p>
				<div class="flex">
					<a-tooltip placement="top">
						<template #title>
						<span>{{ $t('setting.lightMenuStyle') }}</span>
						</template>
						<div />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>
						<span>{{ $t('setting.darkMenuStyle') }}</span>
						</template>
						<div />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>
						<span>{{ $t('setting.darkMode') }}</span>
						</template>
						<div />
					</a-tooltip>
				</div>
			</div>
			<div class="layout-setting-item layout-setting-theme-color">
				<p>{{ $t('setting.themeColor') }}</p>
				<ul class="flex">
					<li v-for="item of colors" :key="item" :style="{backgroundColor: item}"></li>
				</ul>
			</div>
			<div class="layout-setting-item layout-setting-navigation-mode">
				<p>{{ $t('setting.navMode') }}</p>
				<div class="flex">
					<a-tooltip placement="top">
						<template #title>
						<span>{{ $t('setting.siderMenuLayout') }}</span>
						</template>
						<div />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>
						<span>{{ $t('setting.topMenuLayout') }}</span>
						</template>
						<div />
					</a-tooltip>
					<a-tooltip placement="top">
						<template #title>
						<span>{{ $t('setting.mixMenuLayout') }}</span>
						</template>
						<div />
					</a-tooltip>
				</div>
			</div>
		</a-drawer>
    </div>
</template>

<style lang="less" scoped>
.layout-setting {
	:deep(.layout-setting-handle) {
		position: absolute;
		width: 48px;
		height: 48px;
		top: 300px;
		left: -48px;
		font-size: 20px;
		border-radius: var(--z-radius) 0 0 var(--z-radius);
		background-color: var(--setting-bg);
		cursor: pointer;
		.svg-icon { margin: 0; }
	}

	.layout-setting-item:not(:first-child) {
		margin-top: 25px;
	}

	.checkbox-item {
		position: relative;
		width: 45px;
		height: 36px;
		margin-right: 15px;
		border-radius: var(--z-radius);
		background-color: var(--setting-style-bg2);
		box-shadow: var(--setting-style-shadow);
		overflow: hidden;
		cursor: pointer;
		&::before, &::after {
			position: absolute;
			display: block;
			content: "";
			top: 0;
			left: 0
		}
		&::before { width: 100%; height: 9px; }
		&::after { width: 15px; height: 100%; }
	}
	.layout-setting-style,
	.layout-setting-navigation-mode {
		>div {
			div {
				.checkbox-item();
			}
			div:first-child {
				&::before { background-color: var(--setting-style-pseudo1); }
				&::after { background-color: var(--setting-style-pseudo1); }
			}
			div:nth-child(2) {
				&::before { background-color: var(--setting-style-pseudo1); }
				&::after { background-color: var(--setting-style-pseudo2); }
			}
			div:last-child {
				background-color: var(--setting-style-bg3);
				&::before { background-color: var(--setting-style-pseudo); }
				&::after { background-color: var(--setting-style-pseudo); }
			}
		}
	}
	.layout-setting-theme-color {
		ul {
			li {
				width: 20px;
				height: 20px;
				border-radius: var(--z-radius);
				background-color: var(--primary-color);
				margin-right: 10px;
				cursor: pointer;
			}
		}
	}
	.layout-setting-navigation-mode {
		>div {
			div:first-child {
				&::after { background-color: var(--setting-style-pseudo2); }
				&::before { background-color: var(--setting-style-pseudo1); }
			}
			div:nth-child(2) {
				&::before { background-color: var(--setting-style-pseudo2);}
				&::after { background-color: transparent}
			}
			div:last-child {
				background-color: var(--setting-style-bg2);
				&::before { background-color: var(--setting-style-pseudo2); z-index: 1; }
				&::after { background-color: var(--setting-style-pseudo1); z-index: 0; }
			}
		}
	}
}
</style>