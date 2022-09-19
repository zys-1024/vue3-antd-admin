<script lang="ts" setup>
import { reactive } from 'vue'
import layoutStore from '@/store/layout'

const layout = layoutStore()
const items = reactive<string[]>(['tabs', 'footer'])
</script>

<template>
  <div class="other">
        <a-divider />
        <ul>
            <li v-for="item of items" :key="item" class="other-item flex flex-between flex-middle">
                {{ $t(`setting.${item}`) }}
                <a-switch v-model:checked="(layout as any)[item]" size="small" />
            </li>
        </ul>
  </div>
</template>

<style lang="less" scoped>
.other {
    .other-item:not(:first-child) {
        margin-top: 15px;
    }
}
</style>