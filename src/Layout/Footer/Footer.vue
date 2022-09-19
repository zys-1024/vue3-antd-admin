<script lang="ts" setup>
import { } from 'vue'
import layoutStore from '@/store/layout'

const layout = layoutStore()
</script>

<template>
  <div class="flex flex-center" v-if="layout.footer">Footer</div>
</template>

<style lang="less" scoped>

</style>