<script lang="ts" setup>
import { } from 'vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Header from './Header/Header.vue'

</script>

<template>
    <el-container>
        <el-aside width="200px">
            <Sidebar />
        </el-aside>
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
    .el-container {
        height: 100%;
        background-color: var(--layout-bg);
        .el-header {
            height: 50px;
            border-bottom: 1px solid var(--border-color);
            background-color: #fff;
        }
    }
</style>