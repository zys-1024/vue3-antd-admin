<script lang="ts" setup>
import { } from 'vue'

</script>

<template>
	<a-result
		status="error"
		title="Submission Failed"
		sub-title="Please check and modify the following information before resubmitting."
	>
		<template #extra>
			<a-button key="console" type="primary">Go Console</a-button>
			<a-button key="buy">Buy Again</a-button>
		</template>

		<div class="desc">
		<p style="font-size: 16px">
			<strong>The content you submitted has the following error:</strong>
		</p>
		<p>
			<SvgIcon name="close_circle" style="color: red;" />
			Your account has been frozen
			<a>Thaw immediately &gt;</a>
		</p>
		<p>
			<SvgIcon name="close_circle" style="color: red;" />
			Your account is not yet eligible to apply
			<a>Apply Unlock &gt;</a>
		</p>
		</div>
	</a-result>
</template>

<style lang="less" scoped>

</style>