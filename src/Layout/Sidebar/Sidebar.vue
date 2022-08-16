<script lang="ts" setup>
import { } from 'vue'

</script>

<template>
    <el-menu default-active="1" >
        <el-menu-item>
            <el-icon>
                <SvgIcon name="home" />
            </el-icon>
            <span>{{ $t('sidebar.home') }}</span>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
    height: 100%;
}
</style>