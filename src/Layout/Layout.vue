<script lang="ts" setup>
import { ref } from 'vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'

const isCollapse = ref<boolean>(false)

const collapseChange = () => {
    isCollapse.value = !isCollapse.value
    console.log(isCollapse.value)
}
</script>

<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="isCollapse" collapsible>
            <div class="logo" />
            <Sidebar :isCollapse="isCollapse" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header>
                <Header :isCollapse="isCollapse" @collapseChange="collapseChange" />
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
    .ant-layout-sider {
        width: 220px !important;
    }
    .ant-layout-header {
        height: 48px;
        padding: 0 20px 0 0;
        background-color: var(--header-bg);
    }
}
</style>