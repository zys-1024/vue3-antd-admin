<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router';
import { menus } from '@/router'

interface ISelected {
    openKeys: string[]
    selectedKeys: string[]
}

const { isCollapse } = defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})

const route = useRoute()

const menus_ = computed(() => {
    return menus.filter(item => item.meta?.menu)
})

// 将例如/menu/menu3/menu3_1/menu3_1_1 转成 ['/menu', '/menu/menu3', '/menu/menu3/menu3_1', '/menu/menu3/menu3_1/menu3_1_1']
const parse = (): string[] => {
    return route.path.split('/').filter(item => !!item).map((item, index, arr) => {
        let key = ''
        for(let i = 0; i <= index; i++) {
            key += ('/' + arr[i])
        }
        return key
    })
}

const selected = reactive<ISelected>({
    openKeys: parse(),
    selectedKeys: [route.path]
})
</script>

<template>
    <a-menu 
        mode="inline" 
        theme="dark"
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
</style>