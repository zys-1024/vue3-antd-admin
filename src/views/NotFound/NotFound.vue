<script lang="ts" setup>
import { onMounted } from 'vue'
import { removeLoading } from '@/utils/tools'

onMounted(() => {
    removeLoading()
})
</script>

<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
            <a-button type="primary">
                <RouterLink to="/">Back Home</RouterLink>
            </a-button>
        </template>
    </a-result>
</template>

<style lang="" scoped>

</style>