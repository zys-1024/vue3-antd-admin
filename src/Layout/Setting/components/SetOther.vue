<script lang="ts" setup>
import { reactive, watch } from 'vue'
import layoutStore from '@/store/layout'

const layout = layoutStore()
const items = reactive<string[]>(['tabs', 'footer', 'invert'])

watch(() => layout.invert, newVal => {
    console.log(newVal)
    document.body.style.filter = `invert(${newVal ? '10' : '0'})`
})
</script>

<template>
  <div class="other">
        <a-divider />
        <span>{{ $t('otherSettings') }}</span>
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
    .other-item {
        margin-top: 15px;
    }
}
</style>