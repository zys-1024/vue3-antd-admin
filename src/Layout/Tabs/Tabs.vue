<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'

interface ITabsItem { path: string, name: string }
interface ITabs { [key: string]: ITabsItem }

const router = useRouter()
const route = useRoute()
const tabs = ref<ITabs>({})
const active = ref<string>()

onMounted(() => {
	addTab()
	active.value = route.path
})

watch(route, newRoute => {
	addTab(newRoute)
	active.value = newRoute.path
})

const addTab = (r: RouteLocationNormalizedLoaded = route ) => {
	const { path, meta: { name } } = r
	if (tabs.value.hasOwnProperty(path)) return
	tabs.value[path] = { path, name: name as string }
}

const del = (path: string) => {
	const keys = Object.keys(tabs.value)
	let index = 0
	keys.forEach((item, i, arr) => {
		if (path === item) {
			delete tabs.value[path]
			index = i
		}
	})
	if (path !== active.value) return
	keys.splice(index, 1)
	index = index === 0 ? 0 : index >= keys.length ? index - 1 : index
	router.push(keys[index])
}
</script>

<template>
    <div class="layout-tabs flex">
		<ul class="layout-tabs-list flex">
			<li class="layout-tabs-item flex flex-between flex-middle" 
				v-for="(item, key, index) in tabs" 
				:key="item.path" 
				:class="{active: active === item.path}"
				@click="$router.push(item.path)">
				{{ $t(`menu.${item.name}`) }}
				<SvgIcon name="close" @click.stop="del(item.path)" v-if="Object.keys(tabs).length !== 1" />
			</li>
		</ul>
    </div>
</template>

<style lang="less" scoped>
.layout-tabs {
	width: 100%;
	padding: 4px 0 0 0;
	border-top: 1px solid var(--border-color);
	background-color: var(--header-bg);
	
	@radius: 8px;
	.layout-tabs-list {
		position: relative;
		margin: 0;
		&::before, &::after {
			display: block;
			content: "";
			width: 10px;
			height: 100%;
			border-radius: 0 0 @radius 0;
			background: var(--tabs-bg);
			z-index: 3;
		}
		&::after {
			border-radius: 0 0 0 @radius;
		}
		.layout-tabs-item {
			color: var(--text-color);
			font-size: 14px;
			padding: 4px 10px;
			cursor: pointer;
			background-color: var(--tabs-bg);
			border-radius: 0 0 @radius @radius;
			z-index: 2;
			&:hover {
				color: var(--tabs-hover-color);
			}
			.svg-icon {
				margin: 1px 0 0 8px;
				border-radius: 50%;
				&:hover {
					color: var(--tabs-active-bg);
					background-color: var(--tabs-active-color);
				}
			}
		}
		.layout-tabs-item.active {
			position: relative;
			border-radius: @radius;
			color: var(--tabs-active-color);
			background-color: var(--tabs-active-bg);
			z-index: 1;
			&::before, &::after {
				position: absolute;
				display: block;
				content: "";
				width: 15px;
				height: 50%;
				bottom: 0;
				background: var(--tabs-active-bg);
				z-index: 0;
			}
			&::before { left: -6px; }
			&::after { right: -6px; }
		}
	}
}
</style>