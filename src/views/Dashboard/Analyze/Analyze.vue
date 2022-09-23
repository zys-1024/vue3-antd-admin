<script lang="ts" setup>
import { reactive, onMounted, ref, nextTick, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import useMethod from '@/hooks/useMethod'

const methods = useMethod()
const orderData = reactive<number[]>([120, 70, 110, 130, 100, 120, 160, 200, 110, 120, 90, 70, 100])
const visitsData = reactive<number[]>([120, 70, 110, 130, 100, 120, 160, 200, 110, 120, 90, 70, 100])
const orderRef = ref<HTMLDivElement>()
const visitsRef = ref<HTMLDivElement>()
let orderCharts: echarts.ECharts
let visitsCharts: echarts.ECharts

onMounted(() => {
	(async () => {
		await nextTick()
		initOrderCharts()
		initVisitsCharts()
	})()
	methods.setMethod('anlyzeResize', resize)
})

onUnmounted(() => {
	orderCharts.dispose()
	visitsCharts.dispose()
})

const resize = async () => {
	await nextTick()
	orderCharts.resize()
	visitsCharts.resize()
}

const initOrderCharts = () => {
	orderCharts = echarts.init(orderRef.value!)
	const option: echarts.EChartsOption = {
		xAxis: { type: 'category', show: false },
		yAxis: { type: 'value', show: false, boundaryGap: [1, 1] },
		grid: { left: 0, right: 0 },
		series: [{
			data: orderData,
			type: 'bar',
			itemStyle: {
				borderRadius: [10, 10, 0, 0],
				color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
						offset: 0,
						color: '#f0f'
					}, {
						offset: 1,
						color: '#0ff'
					}]
				)
			}
		}]
	}
	orderCharts.setOption(option)
}

const initVisitsCharts = () => {
	visitsCharts = echarts.init(visitsRef.value!)
	const option: echarts.EChartsOption = {
		xAxis: { type: 'category', show: false },
		yAxis: { type: 'value', show: false },
		grid: { left: 0, right: 0, bottom: 40 },
		series: [{
			data: visitsData,
			type: 'line',
			smooth: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(
					0, 0, 1, 0, [{
						offset: 0,
						color: '#00bd74'
					}, {
						offset: 1,
						color: 'rgb(55, 162, 255)'
					}]
				)
			},
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
				{
					offset: 0,
					color: '#00bd74'
				},
				{
					offset: 1,
					color: 'rgb(55, 162, 255)'
				}
				])
			},
		}]
	}
	visitsCharts.setOption(option)
}
</script>

<template>
	<div class="analyze">
		<a-row :gutter="[20, 20]">
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="row row-1">
						<div class="flex flex-between">
							<a-statistic 
								title="销售总额" 
								:value="112893" 
								:value-style="{ fontSize: '30px', marginLeft: '-8px', lineHeight: 'initial' }">
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
						<a-statistic value="11069" :value-style="{ fontSize: '14px' }">
							<template #prefix>
								<span>日销售额</span>
								<span>￥</span>
							</template>
						</a-statistic>
					</div>
				</a-card>
			</a-col>
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="row row-2">
						<div class="flex flex-between">
							<a-statistic title="订单数" :value="2369" :value-style="{fontSize: '25px'}" />
							<SvgIcon name="order" />
						</div>
						<div class="charts" ref="orderRef"></div>
						<a-divider />
						<a-statistic value="60%" :value-style="{ fontSize: '14px' }">
							<template #prefix>
								<span>转化率</span>
							</template>
						</a-statistic>
					</div>
				</a-card>
			</a-col>
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="row row-3">
						<div class="flex flex-between">
							<a-statistic title="访问人数" :value="36921" />
							<SvgIcon name="visitsRef" />
						</div>
						<div class="charts" ref="visitsRef"></div>
						<a-divider />
						<a-statistic :value="369" :value-style="{ fontSize: '14px' }">
							<template #prefix>
								<span>日访问量</span>
							</template>
						</a-statistic>
					</div>
				</a-card>
			</a-col>
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="row row-4">
						<div class="flex flex-between">
							<a-statistic title="销售总额" :value="112893" />
							<SvgIcon name="info" />
						</div>
						<div class="charts"></div>
						<a-divider />
					</div>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<style lang="less" scoped>
.analyze {
	.svg-icon { margin: 0 }
	.ant-card {
		height: 100%;
		.charts {
			width: 100%;
			height: 46px;
		}
	}
	.row {
		:deep(.ant-divider) { margin: 8px 0; }
		.ant-statistic {
			.ant-statistic-content {
				line-height: initial;
			}
		}
	}
	.row-1 {
		flex-wrap: wrap;
		>div:nth-child(2) {
			flex-wrap: wrap;
			height: 46px;
			align-items: flex-end;
			>div:first-child { margin-right: 15px; }
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
		>div:last-child {
			:deep(.ant-statistic-content-prefix) {
				margin: 0;
				span:first-child { margin-right: 10px; }
			}
		}
	}
}
</style>