<script lang="ts" setup>
import { } from 'vue'

</script>

<template>
    <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
		<template #extra>
			<a-button type="primary">
				<RouterLink to="/">Back Home</RouterLink>
			</a-button>
		</template>
	</a-result>
</template>

<style lang="less" scoped>

</style>