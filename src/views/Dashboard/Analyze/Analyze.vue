<script lang="ts" setup>
import { } from 'vue'

</script>

<template>
	<div class="analyze">
		<a-row :gutter="[20, 20]">
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="flex flex-between">
						<a-statistic title="销售总额" :value="112893" :value-style="{ fontSize: '30px', marginLeft: '-8px' }">
							<template #prefix>￥</template>
						</a-statistic>
						<SvgIcon name="sales" />
					</div>
					<div class="flex">
						<a-statistic
							:value="11.28"
							:precision="2"
							suffix="%"
							:value-style="{ color: '#3f8600', fontSize: '14px' }">
							<template #prefix>
								<span>周同比</span>
								<SvgIcon name="up" />
							</template>
						</a-statistic>
						<a-statistic
							:value="9.3"
							:precision="2"
							suffix="%"
							:value-style="{ color: '#cf1322', fontSize: '14px' }">
							<template #prefix>
								<span>日同比</span>
								<SvgIcon name="down" />
							</template>
						</a-statistic>
					</div>
					<a-divider />
					<a-statistic :value="11069" :value-style="{ fontSize: '14px' }">
						<template #prefix>
							<span>日销售额</span>
							￥
						</template>
					</a-statistic>
				</a-card>
			</a-col>
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="flex flex-between">
						<a-statistic title="订单数" :value="2369" :value-style="{fontSize: '25px'}" />
						<SvgIcon name="order" />
					</div>
				</a-card>
			</a-col>
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="flex flex-between">
						<a-statistic title="销售总额" :value="112893" />
						<SvgIcon name="info" />
					</div>
				</a-card>
			</a-col>
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="flex flex-between">
						<a-statistic title="销售总额" :value="112893" />
						<SvgIcon name="info" />
					</div>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<style lang="less" scoped>
.analyze {
	.svg-icon { margin: 0 }
	div:first-child {
		.ant-card {
			height: 100%;
			.ant-divider { margin: 8px 0; }
			div:nth-child(2) {
				flex-wrap: wrap;
				div:first-child {
					margin-right: 15px;
				}
				:deep(.ant-statistic-content) {
					display: flex;
					
					.ant-statistic-content-prefix {
						display: flex;
						align-items: center;
						span:first-child {
							color: var(--text-color);
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
}
</style>