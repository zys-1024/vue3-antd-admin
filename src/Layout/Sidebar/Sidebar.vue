<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router';
import { menus } from '@/router'
import { storeToRefs } from 'pinia'
import layoutStore from '@/store/layout'

interface ISelected {
    openKeys: string[]
    selectedKeys: string[]
}

const route = useRoute()
const { menuType, menuTheme }  = storeToRefs(layoutStore())
const selected = reactive<ISelected>({
    openKeys: [],
    selectedKeys: []
})

onMounted(() => {
    format()
})
watch(() => route.path, () => {
    format()
})

const menus_ = computed(() => {
    return menus.filter(item => item.meta?.menu)
})

const mode = computed(() => {
    return menuType.value === 'mix' ? 'inline' : menuType.value
})

const format = () => {
    // 菜单类型为horizontal返回空数组，不自动展开
    if (menuType.value === 'horizontal') {
        return [[], [route.path]]
    }
    // 将例如/menu/menu3/menu3_1/menu3_1_1 转成 ['/menu', '/menu/menu3', '/menu/menu3/menu3_1', '/menu/menu3/menu3_1/menu3_1_1']
    const openKeys =  route.path.split('/').filter(item => !!item).map((item, index, arr) => {
        let key = ''
        for(let i = 0; i <= index; i++) {
            key += ('/' + arr[i])
        }
        return key
    })
    selected.openKeys = [...selected.openKeys, ...openKeys]
    selected.selectedKeys = [route.path]
}


</script>

<template>
    <a-menu 
        :mode="mode"
        :theme="menuTheme"
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
    border: none;
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