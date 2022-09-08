<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import layoutStore from '@/store/layout'

const layout = layoutStore()
const timer = ref<NodeJS.Timer | null>(null)
const auto = ref<boolean>(false)

onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
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
            auto.value = true
        } else if (width < 992) {
            if(auto.value) {
                layout.setCollapse(true)
                layout.setDrawer(false)
            }
            auto.value = false
        } else {
            if (auto.value) return
            layout.setCollapse(false)
            layout.setDrawer(false)
            auto.value = true
        }
        timer.value && clearInterval(timer.value)
        timer.value = null
    }, 100)
}

const visibleHandle = () => {
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
                    <Header v-model:auto="auto" />
                </a-layout-header>
                <Tabs />
                <a-layout-content>
                    <RouterView />
                </a-layout-content>
            </a-layout>
        </template>

        <!-- 菜单栏horizontal类型 -->
        <template v-else-if="layout.menuType === 'horizontal'">
            <a-layout-header class="flex">
                <div class="logo pointer" style="padding-right: 50px;">
                    <div class="flex flex-middle">
                        <SvgIcon name="vite" />
                        <span>Vue3 Admin</span>
                    </div>
                </div>
                <Sidebar />
                <Header />
            </a-layout-header>
            <Tabs />
            <a-layout-content>
                <RouterView />
            </a-layout-content>
        </template>

        <!-- 菜单栏mix类型 -->
        <template v-else-if="layout.menuType === 'mix'">
            <a-layout-header class="flex flex-between">
                <div class="logo pointer">
                    <div class="flex flex-middle">
                        <SvgIcon name="vite" />
                        <span>Vue3 Admin</span>
                    </div>
                </div>
                <Header />
            </a-layout-header>
            <a-layout>
                <a-layout-sider 
                    :width="230"
                    :collapsedWidth="60"
                    collapsible
                    :theme="layout.menuTheme">
                    <Sidebar />
                </a-layout-sider>
                <a-layout>
                    <Tabs />
                    <a-layout-content>
                        <RouterView />
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
        transition: background .3s;
        >div {
            height: 100%;
            padding: 0 0 0 24px;
            transition: .3s;
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
                transition: all .3s;
                .ellips;
            }
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
        transition: background .3s;
    }

    .ant-layout-content {
        padding: 15px;
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
                    >div {
                        height: 100%;
                        padding: 0 0 0 24px;
                        transition: .3s;
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
                            transition: all .3s;
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
</style>