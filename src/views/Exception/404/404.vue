<script lang="ts" setup>
import { } from 'vue'

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

<style lang="less" scoped>

</style>