<script lang="ts" setup>
import { } from 'vue'

</script>

<template>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
		<template #extra>
			<a-button type="primary">
				<RouterLink to="/">Back Home</RouterLink>
			</a-button>
		</template>
  </a-result>
</template>

<style lang="less" scoped>

</style>