<script lang="ts" setup>
import layoutStore from '@/store/layout'

const layout = layoutStore()

</script>

<template>
    <a-layout class="layout">
        <template v-if="layout.menuType === 'inline'">
            <a-layout-sider
                v-model:collapsed="layout.collapse" 
                :width="230" 
                :collapsedWidth="60"
                :theme="layout.menuTheme">
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
                    <Header v-model:collapse="layout.collapse" />
                </a-layout-header>
                <Tabs />
                <a-layout-content>
                    <RouterView />
                </a-layout-content>
            </a-layout>
        </template>
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