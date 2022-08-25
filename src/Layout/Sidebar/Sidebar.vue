<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router';
import { menus } from '@/router'
import useTheme, { IMenuMode } from '@/hooks/useTheme'

interface ISelected {
    openKeys: string[]
    selectedKeys: string[]
}

const route = useRoute()
const { getMenuTheme, getMenuMode } = useTheme()
const menus_ = computed(() => {
    return menus.filter(item => item.meta?.menu)
})
const mode = computed(() => {
    return getMenuMode() === 'mix' ? 'inline' : (getMenuMode() as keyof IMenuMode)
})

// 将例如/menu/menu3/menu3_1/menu3_1_1 转成 ['/menu', '/menu/menu3', '/menu/menu3/menu3_1', '/menu/menu3/menu3_1/menu3_1_1']
const parse = computed((): Array<string[]> => {
    // 菜单类型为horizontal返回空数组，不自动展开
    if (getMenuMode() === 'horizontal') {
        return Array(2).fill([])
    }
    const openKeys =  route.path.split('/').filter(item => !!item).map((item, index, arr) => {
        let key = ''
        for(let i = 0; i <= index; i++) {
            key += ('/' + arr[i])
        }
        return key
    })
    return [openKeys, [route.path]]
})

const selected = reactive<ISelected>({
    openKeys: parse.value[0],
    selectedKeys: parse.value[1]
})
</script>

<template>
    <a-menu 
        :mode="mode"
        :theme="getMenuTheme()"
        style="height: 48px; line-height: 48px;"
        v-model:openKeys="selected.openKeys"
        v-model:selectedKeys="selected.selectedKeys">
        <MenuItem v-for="item of menus_" :item="item" :key="item.path" />
    </a-menu>
</template>

<style lang="less" scoped>
.ant-menu {
    flex: 1;
    overflow: hidden auto;
    user-select: none;
    .scrollbar();
}
.ant-menu-horizontal {
    overflow: hidden;
    border-bottom: 1px;
    :deep(.ant-menu-overflow-item) {
        &::after { bottom: 1px; }
    }
}
</style>