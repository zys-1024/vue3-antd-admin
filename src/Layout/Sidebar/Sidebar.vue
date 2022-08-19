<script lang="ts" setup>
import { computed } from 'vue'
import { menus } from '@/router'
import MenuItem from './MenuItem.vue'

const { isCollapse } = defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})

const menus_ = computed(() => {
    return menus.filter(item => item.meta?.menu)
})
</script>

<template>
    <el-menu :default-active="$route.path" :collapse="isCollapse" router :default-openeds="[$route.path]">
        <MenuItem v-for="item of menus_" :key="item.name" :item="item" />
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
    height: 100%;
    overflow-y: auto;
    @include scrollbar;
}
</style>