<script lang="ts" setup>
import { ref } from 'vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'

const isCollapse = ref<boolean>(false)

const collapseChange = () => {
    isCollapse.value = !isCollapse.value
}
</script>

<template>
    <el-container>
        <el-aside style="width: 230px">
            <Sidebar :isCollapse="isCollapse" />
        </el-aside>
        <el-container>
            <el-header>
                <Header :isCollapse="isCollapse" @collapseChange="collapseChange" />
            </el-header>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
    .el-container {
        height: 100%;
        // background-color: var(--layout-bg);
        .el-header {
            height: 50px;
            border-bottom: 1px solid var(--border-color);
            // background-color: #fff;
        }
    }
</style>