<script lang="ts" setup>
import { ref } from 'vue'
import useTheme from '@/hooks/useTheme'

const { getMenuTheme, getMenuMode } = useTheme()
const collapse = ref<boolean>(false)

</script>

<template>
    <a-layout class="layout">
        <template v-if="getMenuMode() === 'inline'">
            <a-layout-sider
                v-model:collapsed="collapse" 
                :width="230" 
                :collapsedWidth="60"
                :theme="getMenuTheme()">
                <div class="logo pointer">
                    <div class="flex flex-middle">
                        <SvgIcon name="vite" />
                        <span>Vue3 Admin</span>
                    </div>
                </div>
                <Sidebar />
            </a-layout-sider>
            <a-layout v-if="getMenuMode() !== 'horizontal'">
                <a-layout-header>
                    <Header v-model:collapse="collapse" />
                </a-layout-header>
                <a-layout-content>
                    <RouterView />
                </a-layout-content>
            </a-layout>
        </template>
        <template v-else-if="getMenuMode() === 'horizontal'">
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
            <a-layout-content>
                <RouterView />
            </a-layout-content>
        </template>
        <template v-else-if="getMenuMode() === 'mix'">
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
                <a-layout-sider :width="230" collapsible :theme="getMenuTheme()">
                    <Sidebar />
                </a-layout-sider>
                <a-layout-content>
                    <RouterView />
                </a-layout-content>
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
        :deep(.ant-layout-sider-children) {
            display: flex;
            flex-direction: column;
        }
        :deep(.ant-layout-sider-trigger) {
            background-color: var(--toggle-bg);
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
        background-color: var(--header-bg);
        transition: background .3s;
    }

    .ant-layout-content {
        padding: 15px;
    }
}
</style>