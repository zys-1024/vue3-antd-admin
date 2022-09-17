<script lang="ts" setup>
import { nextTick, onMounted, PropType, ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const hideTabs = ref<TabsItem[]>([])
const active = ref<string>()
const containerRef = ref<HTMLDivElement>()
const tabRef = ref<HTMLUListElement>()
let observer: ResizeObserver

const { tabs } = defineProps({
	tabs: {
		type: Object as  PropType<Tabs>,
		required: true
	}
})

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
	if (tabs.hasOwnProperty(path)) return
	tabs[path] = { path, name: name as string }
	ellipsis()
}

const del = (path: string) => {
	const keys = Object.keys(tabs)
	if (keys.length === 1 && keys[0] === '/dashboard/analyze') return
	let index = 0
	for (let i = 0; i < keys.length; i++) {
		if (path === keys[i]) {
			delete tabs[path]
			if (hideTabs.value.length) {
				ellipsis()
			}
			index = i
			break
		}
	}
	if (path !== active.value) return
	keys.splice(index, 1)[0]
	if (!Object.keys(tabs).length) {
		router.push('/')
		return
	}
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
	delete tabs[path] // 删除hideTabs需要同时删除对应tab的dom元素
	index = index === 0 ? 0 : index >= hideTabs.value.length ? index - 1 : index
	if (path !== active.value) return
	if (hideTabs.value.length) {
		router.push(hideTabs.value[index].path)
	} else {
		// hideTabs全部删除后，获取最后一个显示的tab的key进行跳转
		const lastShow = document.querySelectorAll('.layout-tabs-item[show="true"]')
		router.push((lastShow.item(lastShow.length - 1) as HTMLLIElement).dataset.key!)
	}
}

const ellipsis = async () => {
	await nextTick()
	const parent = containerRef.value
	if (!parent) return
	const ul = tabRef.value
	const parentOffsetWidth = parent!.offsetWidth - 30
	// 获取所有tabs元素，从后往前遍历
	const children = ul?.children
	for (let i = children!.length - 1; i >= 0; i--) {
		const child = children?.item(i) as HTMLLIElement
		const { offsetLeft, offsetWidth, dataset } = child
		const lw = offsetLeft + offsetWidth
		const key = dataset.key as string
		// lw 大于 tabs容器父元素的宽度
		if (lw > parentOffsetWidth) {
			// 如果hideTabs没有包含path为key的元素就往里添加
			if (!hideTabs.value.some(item => item.path === key)) {
				hideTabs.value.unshift({ ...tabs[key], lw })
				// 添加show属性供属性选择器添加样式，直接添加class会出现只有最后添加的元素成功添加，之前添加过的class都不见了，布吉岛怎么肥事
				child.setAttribute('show', 'false')
			}
		} else if (hideTabs.value.length) {
			child.setAttribute('show', 'true')
			// 把显示出来的tab筛选出hideTabs
			hideTabs.value = hideTabs.value.filter(item => item.path !== key)
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
				<div>
					{{ $t(`menu.${item.name}`) }}
					<SvgIcon name="close" @click.stop="del(item.path)" />
				</div>
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
						<span>{{ $t(`menu.${item.name}`) }}</span>
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
	position: relative;
	.ellipsis {
		height: 100%;
		font-size: 20px;
		margin-right: 7px;
		.svg-icon { outline: none; margin: 0; }
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
			min-width: 10px;
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
			>div {
				z-index: 1;
				.svg-icon {
					margin: 1px 0 0 8px;
					border-radius: 50%;
					&:hover {
						color: var(--tabs-active-bg);
						background-color: var(--tabs-active-color);
					}
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
				height: 50%;
				bottom: 0;
				z-index: 0;
			}
			&::before { 
				width: calc(100% + 20px);
				left: -10px;
				background-color: var(--tabs-active-bg);
			}
			&::after {
				width: 10px;
				border-radius: 0 0 0 @radius;
				right: -10px;
				background-color: var(--tabs-bg);
			}
		}
		.layout-tabs-item[show="false"] {
			visibility: hidden;
		}
		.layout-tabs-item[show="true"] {
			visibility: visible;
		}
		.layout-tabs-item.hide {
			display: none;
		}
	}
}
</style>
<style lang="less">
.ant-dropdown.hide-tabs {
	.ant-dropdown-menu-item { min-width: 80px; }
	.ant-dropdown-menu-item .ant-dropdown-menu-title-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		span { margin-right: 20px; }
		.svg-icon {
			margin: 0;
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
		color: var(--tabs-active-color);
		background-color: var(--tabs-active-bg);
	}
}
</style>