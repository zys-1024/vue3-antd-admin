<script lang="ts" setup>
import { watch, ref } from 'vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'

const collapse = ref<boolean>(false)
</script>

<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapse" :width="230" :collapsedWidth="60">
            <div class="logo pointer">
                <div class="flex flex-middle">
                    <SvgIcon name="vite" />
                    <span>Vue3 Admin</span>
                </div>
            </div>
            <Sidebar :isCollapse="collapse" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <Header v-model:collapse="collapse" />
            </a-layout-header>
            <a-layout-content>
                <RouterView />
            </a-layout-content>
        </a-layout>
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
        >div {
            height: 100%;
            padding: 0 0 0 24px;
            transition: .3s;
            .svg-icon {
                width: 32px;
                height: 32px;
                margin: 0;
            }
            span {
                flex: 1;
                font-size: 20px;
                color: var(--sider-logo-text-color);
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
        margin-left: 1px;
    }

    .ant-layout-content {
        padding: 15px;
    }
}
</style>