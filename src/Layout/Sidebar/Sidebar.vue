<script lang="ts" setup>
import { computed } from 'vue'
import router, { TRoutes } from '@/router/routes'

const menus = computed(() => {
    return (router.getRoutes() as TRoutes[]).filter(item => item.meta?.menu)
})
</script>

<template>
    <el-menu default-active="1" >
        <el-menu-item v-for="item of menus" :key="item.name">
            <el-icon><SvgIcon :name="item.meta?.icon!" /></el-icon>
            <span>{{ $t(`menu.${item.meta?.name}`) }}</span>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
    height: 100%;
}
</style>