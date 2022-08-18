<script lang="ts" setup>
import { TRoutes } from '@/router/routes';
import { PropType } from 'vue'

const { item } = defineProps({
    item: {
        type: Object as PropType<TRoutes>,
        require: true
    }
})
</script>

<template>
    <el-sub-menu v-if="item?.children?.length" :index="item.path">
        <template #title>
            <el-icon><SvgIcon :name="item.meta?.icon!" /></el-icon>
            <span>{{ $t(`menu.${item?.meta?.name}`) }}</span>
        </template>
        <MenuItem v-for="child of (item.children.filter(f => !!f.component) as TRoutes[])" :index="child.path" :item="child" />
    </el-sub-menu>
    <el-menu-item v-else :index="item?.path">
        <el-icon><SvgIcon :name="item?.meta?.icon!" /></el-icon>
        <span>{{ $t(`menu.${item?.meta?.name}`) }}</span>
    </el-menu-item>
</template>

<style lang="scss" scoped>

</style>