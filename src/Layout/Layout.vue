<script lang="ts" setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import layoutStore from '@/store/layout'
import ResizeObserver from 'resize-observer-polyfill'
import useMethod from '@/hooks/useMethod'
import { removeLoading } from '@/utils/tools'

const methods = useMethod()
const layout = layoutStore()
const menu = reactive<{type: 'sm' | 'md' | 'lg', auto: boolean}>({ type: 'lg', auto: true })
const timer = ref<NodeJS.Timer | null>(null)
const tabs = ref<Tabs>({})
const resizeTimer = ref<NodeJS.Timer | null>()

onMounted(() => {
    removeLoading()
    resize()
    window.addEventListener('resize', resize)
    const observer = new ResizeObserver((entries, observer) => {
        const tabsEllipsis = methods.getMethod('tabsEllipsis')
        const anlyzeChartsResize = methods.getMethod('anlyzeChartsResize')
        const monitorChartsResize = methods.getMethod('monitorChartsResize')
        tabsEllipsis && tabsEllipsis()
        // echarts resize节流
        if (resizeTimer.value) return
        resizeTimer.value = setTimeout(() => {
            anlyzeChartsResize && anlyzeChartsResize()
            monitorChartsResize && monitorChartsResize()
            resizeTimer.value = null
        }, 400)
    })
    observer.observe(document.querySelector('.ant-layout-content') as HTMLDivElement)
})

onUnmounted(() => {
    window.removeEventListener('resize', resize)
})

const resize = () => {
    if (timer.value) return
    timer.value = setInterval(() => {
        const width = window.innerWidth
        if (width < 768) {
            layout.setCollapse(false)
            layout.setDrawer(true)
            menu.auto = true
            menu.type = 'sm'
        } else if (width < 992) {
            if(menu.auto) {
                layout.setCollapse(true)
                layout.setDrawer(false)
            }
            menu.auto = false
            menu.type = 'md'
        } else {
            if (menu.auto && menu.type !== 'sm') return
            layout.setCollapse(false)
            layout.setDrawer(false)
            menu.auto = true
            menu.type = 'lg'
        }
        timer.value && clearInterval(timer.value)
        timer.value = null
    }, 100)
}

const visibleHandle = () => {
    layout.setCollapse(!layout.collapse)
}

const smMenuToggle = () => {
    layout.setCollapse(!layout.collapse)
}
</script>

<template>
    <a-layout class="layout">
        <!-- 菜单栏inline类型 -->
        <template v-if="layout.menuType === 'inline'">
            <a-layout-sider
                v-model:collapsed="layout.collapse" 
                :width="230" 
                :collapsedWidth="60"
                :theme="layout.menuTheme"
                v-if="!layout.isDrawer">
                <div class="logo pointer">
                    <div class="flex flex-middle">
                        <SvgIcon name="vite" />
                        <span>Vue3 Admin</span>
                    </div>
                </div>
                <Sidebar />
            </a-layout-sider>
            <a-layout v-if="layout.menuType !== ('horizontal' as any)">
                <a-layout-header>
                    <Header v-model:auto="menu.auto" />
                </a-layout-header>
                <Tabs v-model:tabs="tabs" />
                <a-layout-content class="flex-v flex-between">
                    <RouterView v-slot="{ Component }">
                        <Transition :duration="550" name="nested" mode="out-in">
                            <component :is="Component"></component>
                        </Transition>
                    </RouterView>
                    <Footer />
                </a-layout-content>
            </a-layout>
        </template>

        <!-- 菜单栏horizontal类型 -->
        <template v-else-if="layout.menuType === 'horizontal'">
            <a-layout-header class="flex flex-between">
                <div class="logo pointer" style="padding-right: 50px;" v-if="!layout.isDrawer">
                    <div class="flex flex-middle">
                        <SvgIcon name="vite" />
                        <span>Vue3 Admin</span>
                    </div>
                </div>
                <div v-else class="sm-collapse flex flex-middle" @click="smMenuToggle">
                    <SvgIcon :name="layout.collapse ? 'fold' : 'unfold'"/>
                </div>
                <Sidebar v-if="!layout.isDrawer"/>
                <Header />
            </a-layout-header>
            <Tabs v-model:tabs="tabs" />
            <a-layout-content class="flex-v flex-between">
                <RouterView v-slot="{ Component }">
                    <Transition :duration="550" name="nested" mode="out-in">
                        <component :is="Component"></component>
                    </Transition>
                </RouterView>
                <Footer />
            </a-layout-content>
        </template>

        <!-- 菜单栏mix类型 -->
        <template v-else-if="layout.menuType === 'mix'">
            <a-layout-header class="flex flex-between">
                <div class="logo pointer" v-if="!layout.isDrawer">
                    <div class="flex flex-middle">
                        <SvgIcon name="vite" />
                        <span>Vue3 Admin</span>
                    </div>
                </div>
                <div v-else class="sm-collapse flex flex-middle" @click="smMenuToggle">
                    <SvgIcon :name="layout.collapse ? 'fold' : 'unfold'"/>
                </div>
                <Header />
            </a-layout-header>
            <a-layout>
                <a-layout-sider 
                    :width="230"
                    v-model:collapsed="layout.collapse"
                    :collapsedWidth="60"
                    collapsible
                    :theme="layout.menuTheme"
                    v-if="!layout.isDrawer">
                    <Sidebar />
                </a-layout-sider>
                <a-layout>
                    <Tabs v-model:tabs="tabs" />
                    <a-layout-content class="flex-v flex-between">
                        <RouterView v-slot="{ Component }">
                            <Transition name="nested" mode="out-in">
                                <component :is="Component"></component>
                            </Transition>
                        </RouterView>
                        <Footer />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </template>
        <Setting />
    </a-layout>

    <!-- 小屏-drawer弹出显示 -->
    <a-drawer 
        v-if="layout.isDrawer" 
        :width="230" 
        v-model:visible="layout.collapse" 
        placement="left"
        :closable="false"
        :destroyOnClose="true"
        class="sm-menu"
        @click="visibleHandle">
        <a-layout-sider
            :width="230" 
            :theme="layout.menuTheme">
            <div class="logo pointer">
                <div class="flex flex-middle">
                    <SvgIcon name="vite" />
                    <span>Vue3 Admin</span>
                </div>
            </div>
            <Sidebar />
        </a-layout-sider>
    </a-drawer>
</template>

<style lang="less" scoped>
.layout {
    height: 100%;
    .logo {
        position: relative;
        height: 48px;
        overflow: hidden;
        background-color: var(--logo-bg);
        transition: background 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        >div {
            height: 100%;
            padding: 0 0 0 24px;
            transition: .3s cubic-bezier(0.215, 0.61, 0.355, 1);
            .svg-icon {
                width: var(--logo-size);
                height: var(--logo-size);
                margin: 0;
            }
            span {
                flex: 1;
                font-size: var(--logo-font-size);
                color: var(--logo-text-color);
                font-weight: 500;
                white-space: nowrap;
                margin-left: 10px;
                overflow: hidden;
                opacity: 1;
                user-select: none;
                transition: all .3s cubic-bezier(0.215, 0.61, 0.355, 1);
                .ellips;
            }
        }
    }
    .sm-collapse {
        padding: 0 10px;
        height: 100%;
        cursor: pointer;
        &:hover {
            background-color: var(--header-hover-bg);
        }
        .svg-icon {
            color: var(--header-right-color);
            width: 18px !important;
            height: 18px !important;
            margin: 0;
        }
    }
    .ant-layout-sider {
        border-right: 1px solid var(--border-color);
        :deep(.ant-layout-sider-children) {
            display: flex;
            flex-direction: column;
        }
        :deep(.ant-layout-sider-trigger) {
            background-color: var(--toggle-bg);
            border-top: 1px solid var(--border-color);
        }
    }
    .ant-layout-sider-collapsed {
        .logo {
           >div {
                padding: 0 15px;
                span {
                    flex: none;
                    width: 0;
                    margin: 0;
                    opacity: 0;
                }
           }
        }
    }
    .ant-layout-header {
        height: 48px;
        padding: 0 20px 0 0;
        border-bottom: 1px solid var(--border-color);
        background-color: var(--header-bg);
        box-sizing: content-box;
        transition: background .3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .ant-layout-content {
        overflow: auto;
        padding: 20px;
    }
}
</style>
<style lang="less">
.sm-menu {
    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        padding: 0;
        .ant-layout-sider {
            flex: 1 !important;
            .ant-layout-sider-children {
                display: flex;
                flex-direction: column;
                .logo {
                    height: 48px;
                    background-color: var(--logo-bg);
                    >div {
                        height: 100%;
                        padding: 0 0 0 24px;
                        transition: .3s cubic-bezier(0.215, 0.61, 0.355, 1);
                        .svg-icon {
                            width: var(--logo-size);
                            height: var(--logo-size);
                            margin: 0;
                        }
                        span {
                            flex: 1;
                            font-size: var(--logo-font-size);
                            color: var(--logo-text-color);
                            font-weight: 500;
                            white-space: nowrap;
                            margin-left: 10px;
                            overflow: hidden;
                            opacity: 1;
                            user-select: none;
                            transition: all .3s cubic-bezier(0.215, 0.61, 0.355, 1);
                            .ellips;
                        }
                    }
                }
                .ant-menu {
                    flex: 1;
                }
            }
        }
    }
}

.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner { 
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
	transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>