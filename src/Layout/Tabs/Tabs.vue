<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'

interface ITabsItem { path: string, name: string, [key: string]: any }
interface ITabs { [key: string]: ITabsItem }

const router = useRouter()
const route = useRoute()
const tabs = ref<ITabs>({})
const hideTabs = ref<ITabsItem[]>([])
const active = ref<string>()
const containerRef = ref<HTMLDivElement>()
const tabRef = ref<HTMLUListElement>()
let observer: ResizeObserver

onMounted(() => {
	addTab()
	active.value = route.path
	observer = new ResizeObserver(ellipsis)
	observer.observe(containerRef.value!)
})

watch(route, newRoute => {
	addTab(newRoute)
	active.value = newRoute.path
})

const addTab = (r: RouteLocationNormalizedLoaded = route ) => {
	const { path, meta: { name } } = r
	if (tabs.value.hasOwnProperty(path)) return
	tabs.value[path] = { path, name: name as string }
	ellipsis()
}

const del = (path: string) => {
	const keys = Object.keys(tabs.value)
	let index = 0
	keys.forEach((item, i, arr) => {
		if (path === item) {
			delete tabs.value[path]
			if (hideTabs.value.length) {
				ellipsis()
			}
			index = i
			return
		}
	})
	if (path !== active.value) return
	keys.splice(index, 1)
	index = index === 0 ? 0 : index >= keys.length ? index - 1 : index
	router.push(keys[index])
}

const delHide = (path: string) => {
	let index = 0
	hideTabs.value.forEach((item, i) => {
		if (item.path === path) {
			index = i
			return
		}
	})
	hideTabs.value.splice(index, 1)
	index = index === 0 ? 0 : index >= hideTabs.value.length ? index - 1 : index
	if (path !== active.value) return
	if (hideTabs.value.length) {
		router.push(hideTabs.value[index].path)
	} else {
		// hideTabs全部删除后跳转到tabs最后一个元素的path（key就是path）
		const arr = Object.keys(tabs.value)
		router.push(arr[arr.length - 1])
	}
}

const ellipsis = async () => {
	await nextTick()
	const parent = containerRef.value
	if (!parent) return
	const ul = tabRef.value
	const parentOffsetWidth = hideTabs.value.length ? parent!.offsetWidth - 27 : parent!.offsetWidth
	const lastChildKey = (ul?.lastElementChild as HTMLLIElement)?.dataset.key
	// ul宽度大于等于ul父元素宽度 并且 ul里面至少有一个子元素 并且 没有添加过
	if (ul!.offsetWidth >= parentOffsetWidth && lastChildKey) {
		// 如果hideTabs不存在这个元素
		if (!hideTabs.value.some(item => item.path === tabs.value[lastChildKey].path)) {
			// 通过ul最后一个子元素的data-key获取tabs里的元素，并添加子元素的宽度, 存入hideTabs
			hideTabs.value.unshift({ ...tabs.value[lastChildKey], width: (ul?.lastElementChild as HTMLLIElement).offsetWidth })	
		}
		// 删除最后一个子元素
		delete tabs.value[lastChildKey]
	} else if (hideTabs.value.length) {
		// 最后隐藏的元素
		const el = hideTabs.value[0]
		// ul父元素宽度足够显示最后隐藏的元素则把el添加进tabs
		if (parentOffsetWidth >= ul!.offsetWidth + el!.width) {
			hideTabs.value.shift()
			tabs.value[el!.path] = el as any as ITabsItem
		}
	}
}
</script>

<template>
    <div class="layout-tabs flex flex-between flex-middle" ref="containerRef">
		<ul class="layout-tabs-list flex" ref="tabRef">
			<li class="layout-tabs-item flex flex-between flex-middle" 
				v-for="item in tabs" 
				:key="item.path" 
				:data-key="item.path"
				:class="{active: active === item.path}"
				@click="$router.push(item.path)">
				{{ $t(`menu.${item.name}`) }}
				<SvgIcon name="close" @click.stop="del(item.path)" v-if="Object.keys(tabs).length !== 1" />
			</li>
		</ul>
		<!-- 不知道什么原因，trigger设置为click，当hideTabs全部删除的时候 再点击tabs 会报错 -->
		<!-- 不设置trigger或者hideTabs长度为0隐藏 可以解决报错 -->
		<a-dropdown overlayClassName="hide-tabs" v-if="hideTabs.length">
			<div class="ellipsis pointer flex flex-middle">
				<SvgIcon name="ellipsis" v-if="hideTabs.length" />
			</div>
			<template #overlay>
				<a-menu>
					<a-menu-item 
						v-for="item of hideTabs" 
						:key="item.path"
						:class="{active: active === item.path}"
						@click="$router.push(item.path)">
						{{ $t(`menu.${item.name}`) }}
						<SvgIcon name="close" @click.stop="delHide(item.path)" />
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
    </div>
</template>

<style lang="less" scoped>
.layout-tabs {
	width: 100%;
	padding: 4px 0 0 0;
	background-color: var(--tabs-bg);
	.ellipsis {
		height: 100%;
		font-size: 20px;
		.svg-icon { outline: none; }
	}
	
	@radius: 8px;
	.layout-tabs-list {
		position: relative;
		margin: 0;
		overflow: hidden;
		&::before, &::after {
			display: block;
			content: "";
			width: 10px;
			border-radius: 0 0 @radius 0;
			background: var(--tabs-bg);
			z-index: 3;
		}
		&::after {
			border-radius: 0 0 0 @radius;
		}
		.layout-tabs-item {
			color: var(--text-color);
			font-size: 13px;
			padding: 4px 10px;
			cursor: pointer;
			background-color: var(--tabs-bg);
			border-radius: 0 0 @radius @radius;
			white-space: nowrap;
			z-index: 2;
			.svg-icon {
				margin: 1px 0 0 8px;
				border-radius: 50%;
				&:hover {
					color: var(--tabs-active-bg);
					background-color: var(--tabs-active-color);
				}
			}
		}
		.layout-tabs-item:hover,
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
				width: 20px;
				height: 50%;
				bottom: 0;
				background: var(--tabs-active-bg);
				z-index: 0;
			}
			&::before { left: -10px; }
			&::after { right: -10px; }
		}
		.layout-tabs-item.hide {
			display: none;
		}
	}
}
</style>
<style lang="less">
.ant-dropdown.hide-tabs {
	.ant-dropdown-menu-item .ant-dropdown-menu-title-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.svg-icon {
			margin: 0 0 0 10px;
			border-radius: 50%;
			&:hover {
				color: var(--tabs-active-bg);
				background-color: var(--tabs-active-color);
			}
		}
	}
	.ant-dropdown-menu-item:hover {
		color: var(--tabs-active-color);
		background-color: var(--tabs-active-bg);
	}
	.ant-dropdown-menu-item.active {
		color: var(--ant-primary-color);
		background-color: var(--ant-primary-1);
	}
}
</style>