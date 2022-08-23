<script lang="ts" setup>
import { watch, ref } from 'vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'

const collapse = ref<boolean>(false)
</script>

<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapse" :width="230">
            <div class="logo pointer">
                <div class="flex flex-middle flex-center">
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
            padding: 0 24px;
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
            span {
                width: 0;
                margin: 0;
                opacity: 0;
            }
        }
    }
    .ant-layout-header {
        height: 48px;
        padding: 0 20px 0 0;
        background-color: var(--header-bg);
    }
}
</style>