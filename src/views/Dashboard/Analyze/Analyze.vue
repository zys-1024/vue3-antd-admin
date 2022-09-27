<script lang="ts" setup>
import { reactive, onMounted, ref, nextTick, onUnmounted, shallowRef } from 'vue'
import * as echarts from 'echarts'
import useMethod from '@/hooks/useMethod'

const methods = useMethod()
const orderData = reactive<number[]>([120, 70, 110, 130, 100, 120, 160, 200, 110, 120, 90, 70, 100])
const visitsData = reactive<number[]>([120, 70, 110, 130, 100, 120, 160, 200, 110, 120, 90, 70, 100])
const salesData = reactive<number[]>([])
const orderRef = ref<HTMLDivElement>()
const visitsRef = ref<HTMLDivElement>()
const otherRef = ref<HTMLDivElement>()
const salesRef = ref<HTMLDivElement>()
const orderCharts = shallowRef<echarts.ECharts>()
const visitsCharts = shallowRef<echarts.ECharts>()
const otherCharts = shallowRef<echarts.ECharts>()
const salesCharts = shallowRef<echarts.ECharts>()

onMounted(() => {
	initCharts()
})

onUnmounted(() => {
	orderCharts.value!.dispose()
	visitsCharts.value!.dispose()
	otherCharts.value!.dispose()
	salesCharts.value!.dispose()
})

const initCharts = () => {
	setTimeout(() => {
		initOrderCharts()
		initVisitsCharts()
		initOtherCharts()
		initSalesCharts()
		methods.setMethod('anlyzeResize', resize)
	})
}

const resize = () => {
	orderCharts.value!.resize()
	visitsCharts.value!.resize()
	otherCharts.value!.resize()
	salesCharts.value!.resize()
}

const initOrderCharts = () => {
	orderCharts.value = echarts.init(orderRef.value!)
	const option: echarts.EChartsOption = {
		xAxis: { type: 'category', show: false },
		yAxis: { type: 'value', show: false },
		grid: { left: 0, right: 0, top: 0, bottom: 0},
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
	orderCharts.value.setOption(option)
}

const initVisitsCharts = () => {
	visitsCharts.value = echarts.init(visitsRef.value!)
	const option: echarts.EChartsOption = {
		xAxis: { type: 'category', show: false },
		yAxis: { type: 'value', show: false },
		grid: { left: 0, right: 0, top: 3, bottom: 0},
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
	visitsCharts.value.setOption(option)
}

const initOtherCharts = () => {
	otherCharts.value = echarts.init(otherRef.value!)
	const option: echarts.EChartsOption = {
		xAxis: { type: 'value', show: false },
		yAxis: { type: 'category', show: false },
		grid: { left: 0, right: 0, top: 0, bottom: 0},
		series: [{
			barWidth: 8,
			data: [120, 200, 150, 80],
			type: 'bar',
			itemStyle: {
				borderRadius: [0, 10, 10, 0],
				color: new echarts.graphic.LinearGradient(
					0, 0, 1, 0, [{
						offset: 0,
						color: 'rgb(55, 162, 255)'
					}, {
						offset: 1,
						color: '#fff'
					}]
				)
			}
		}]
	}
	otherCharts.value.setOption(option)
}

const initSalesCharts = () => {
	salesCharts.value = echarts.init(salesRef.value!)
	const option: echarts.EChartsOption = {
		color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
		title: { text: '订单数' },
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['数码', '电器', '家具', '服饰', '食品']
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: new Array(12).fill('月').map((item, index) => (index + 1) + item)
		}],
		yAxis: { type: 'value' },
		grid: { left: 0, right: '1.1%', bottom: 0, containLabel: true },
		series: [{
			name: '数码',
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 0
			},
			showSymbol: false,
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
				{
					offset: 0,
					color: 'rgb(128, 255, 165)'
				},
				{
					offset: 1,
					color: 'rgb(1, 191, 236)'
				}
				])
			},
			emphasis: {
				focus: 'series'
			},
			data: [140, 232, 101, 264, 90, 340, 250, 232, 101, 264, 90, 340]
		}, {
			name: '电器',
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 0
			},
			showSymbol: false,
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgb(0, 221, 255)'
				}, {
					offset: 1,
					color: 'rgb(77, 119, 255)'
				}])
			},
			emphasis: {
				focus: 'series'
			},
			data: [120, 282, 111, 234, 220, 340, 310, 282, 111, 234, 220, 340]
		}, {
			name: '家具',
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 0
			},
			showSymbol: false,
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgb(55, 162, 255)'
				}, {
					offset: 1,
					color: 'rgb(116, 21, 219)'
				}])
			},
			emphasis: {
				focus: 'series'
			},
			data: [320, 132, 201, 334, 190, 130, 220, 132, 201, 334, 190, 130]
		}, {
			name: '服饰',
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 0
			},
			showSymbol: false,
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgb(255, 0, 135)'
				}, {
					offset: 1,
					color: 'rgb(135, 0, 157)'
				}])
			},
			emphasis: {
				focus: 'series'
			},
			data: [220, 402, 231, 134, 190, 230, 120, 402, 231, 134, 190, 230]
		}, {
			name: '食品',
			type: 'line',
			stack: 'Total',
			smooth: true,
			lineStyle: {
				width: 0
			},
			showSymbol: false,
			label: {
				show: true,
				position: 'top'
			},
			areaStyle: {
				opacity: 0.8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgb(255, 191, 0)'
				}, {
					offset: 1,
					color: 'rgb(224, 62, 76)'
				}])
			},
			emphasis: {
				focus: 'series'
			},
			data: [220, 302, 181, 234, 210, 290, 150, 302, 181, 234, 210, 290]
		}]
	}
	salesCharts.value.setOption(option)
}
</script>

<template>
	<div class="analyze">
		<a-row :gutter="[20, 20]" class="row-1">
			<a-col :xl="6" :sm="12" :xs="24">
				<a-card>
					<div class="col col-1">
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
					<div class="col col-2">
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
					<div class="col col-3">
						<div class="flex flex-between">
							<a-statistic title="访问人数" :value="36921" />
							<SvgIcon name="visits" />
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
					<div class="col col-4">
						<div class="flex flex-between">
							<a-statistic title="随便填的" :value="43542" />
							<SvgIcon name="info" />
						</div>
						<div class="charts" ref="otherRef"></div>
						<a-divider />
						<a-statistic :value="2561" :value-style="{ fontSize: '14px' }">
							<template #prefix>
								<span>随便填的</span>
							</template>
						</a-statistic>
					</div>
				</a-card>
			</a-col>
		</a-row>
		<br>
		<a-row :gutter="[20, 20]" class="row-2">
			<a-col :xl="16" :xs="24">
				<a-card>
					<div class="charts" ref="salesRef"></div>
				</a-card>
			</a-col>
			<a-col :xl="8" :xs="24">
				<a-card title="Card Title">
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
					<a-card-grid style="width: 50%; text-align: center">Content</a-card-grid>
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
	}
	.row-1 {
		.charts {
			width: 100%;
			height: 46px;
		}
		.col {
			:deep(.ant-divider) { margin: 8px 0; }
			.ant-statistic {
				.ant-statistic-content {
					line-height: initial;
				}
			}
		}
		.col-1 {
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

	.row-2 {
		.charts {
			height: 350px;
		}
	}
}
</style>