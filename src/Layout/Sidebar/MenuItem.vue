<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TRoutes } from '@/router/routes'

// 使用<script lang="ts" setup>方式,递归MenuItem组件,导致ts报红色波浪线（不会影响代码运行）
// 因为components.d.ts自动导入了MenuItem组件，具体原因不清楚
export default defineComponent({
    props: {
        item: {
            type: Object as PropType<TRoutes>,
            require: true
        }
    },
    setup(props) {
        return {
            item: props.item
        }
    }
})
</script>

<template>
  <a-sub-menu v-if="item?.children?.length" :key="item.path">
        <template #icon> <SvgIcon :name="item.meta?.icon!" /> </template>
        <template #title>{{ $t(`menu.${item?.meta?.name}`) }}</template>
        <MenuItem v-for="child of (item.children.filter(f => !!f.component) as TRoutes[])" :key="child.path" :item="child" />
    </a-sub-menu>
    <a-menu-item v-else :key="item?.path" @click="$router.push(item?.path!)">
        <template #icon><SvgIcon :name="item?.meta?.icon!" /></template>
        <span>{{ $t(`menu.${item?.meta?.name}`) }}</span>
    </a-menu-item>
</template>

<style lang="" scoped>

</style>