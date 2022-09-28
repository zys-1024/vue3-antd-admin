<script lang="ts" setup>
import { reactive, onMounted, ref, nextTick, onUnmounted, shallowRef, watch } from 'vue'
import * as echarts from 'echarts'
import useMethod from '@/hooks/useMethod'
import layoutStore from '@/store/layout'

const layout = layoutStore()
const methods = useMethod()
const orderData = reactive<number[]>([120, 70, 110, 130, 100, 120, 160, 200, 110, 120, 90, 70, 100])
const visitsData = reactive<number[]>([120, 70, 110, 130, 100, 120, 160, 200, 110, 120, 90, 70, 100])
const orderRef = ref<HTMLDivElement>()
const visitsRef = ref<HTMLDivElement>()
const otherRef = ref<HTMLDivElement>()
const otherRef2 = ref<HTMLDivElement>()
const otherRef3 = ref<HTMLDivElement>()
const otherRef4 = ref<HTMLDivElement>()
const otherRef5 = ref<HTMLDivElement>()
const timer = ref<NodeJS.Timer | null>()
const orderCharts = shallowRef<echarts.ECharts>()
const visitsCharts = shallowRef<echarts.ECharts>()
const otherCharts = shallowRef<echarts.ECharts>()
const otherCharts2 = shallowRef<echarts.ECharts>()
const otherCharts3 = shallowRef<echarts.ECharts>()
const otherCharts4 = shallowRef<echarts.ECharts>()
const otherCharts5 = shallowRef<echarts.ECharts>()
const salesRanking = reactive<string[]>(['数码产品', '服饰配饰', '家居生活', '护肤保养', '零食小吃', '饮料酒水', '健康护理', '其他'])

onMounted(() => {
	initCharts()
})

onUnmounted(() => {
	orderCharts.value?.dispose()
	visitsCharts.value?.dispose()
	otherCharts.value?.dispose()
	otherCharts2.value?.dispose()
	otherCharts3.value?.dispose()
	otherCharts4.value?.dispose()
	otherCharts5.value?.dispose()
})

watch(() => layout.themeMode, newVal => {
	otherCharts2.value?.setOption({ xAxis: {
		axisLine: { lineStyle: { color: newVal === 'dark' ? '#686a72' : '#9fa0a6' } }
	},  yAxis: {
		splitLine: {
			lineStyle: { color: newVal === 'dark' ? '#222' : '#e0e6f1' }
		}
	}, series: [{
		name: 'dotted',
		itemStyle: { color: newVal === 'dark' ? '#141414' : '#fff' }
	}] } as echarts.EChartsOption)

	otherCharts3.value?.setOption({ yAxis: {
		splitLine: {
			lineStyle: { color: newVal === 'dark' ? '#222' : '#e0e6f1' }
		}
	}} as echarts.EChartsOption)
})

const initCharts = () => {
	setTimeout(() => {
		initOrderCharts()
		initVisitsCharts()
		initOtherCharts()
		initOtherCharts2()
		initOtherCharts3()
		initOtherCharts4()
		initOtherCharts5()
		methods.setMethod('anlyzeResize', resize)
	})
}

const resize = () => {
	if (timer.value) return
	timer.value = setTimeout(() => {
		orderCharts.value?.resize()
		visitsCharts.value?.resize()
		otherCharts.value?.resize()
		otherCharts2.value?.resize()
		otherCharts3.value?.resize()
		otherCharts4.value?.resize()
		otherCharts5.value?.resize()
		timer.value = null
	}, 400)
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

const initOtherCharts2 = () => {
	otherCharts2.value = echarts.init(otherRef2.value!)
	let category = [];
	let dottedBase = +new Date();
	let lineData = [125.54, 63.98, 268.48, 187.04, 210.32, 174, 298.49, 161.45, 52.91, 200.52, 174.67, 346, 203.96, 58.09, 259.42, 188.27, 234.13, 235.14, 204.43, 257.24];
	let barData = [108, 41.03, 129.61, 122.41, 187.21, 111.76, 153.81, 12.99, 40.87, 111.73,147.41, 171.93, 64.53, 15.07, 110.91, 27.56, 93.35, 106.26, 60.25, 65.12];
	for (let i = 0; i < 20; i++) {
		let date = new Date((dottedBase += 3600 * 24 * 1000));
		category.push(
			[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
		)
	}
	const option: echarts.EChartsOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			data: ['line', 'bar'],
			textStyle: {
				color: '#ccc'
			}
		},
		xAxis: {
			data: category,
			axisLine: {
				lineStyle: {
					color: layout.themeMode === 'dark' ? '#686a72' : '#9fa0a6'
				}
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: layout.themeMode === 'dark' ? '#222' : '#e0e6f1'
				} 
			},
		},
		grid: { left: 0, right: 0, top: 25, bottom: 0, containLabel: true },
		series: [
			{
				name: 'line',
				type: 'line',
				smooth: true,
				showAllSymbol: true,
				symbol: 'emptyCircle',
				symbolSize: 10,
				data: lineData,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00bd74' },
						{ offset: 1, color: 'rgb(55, 162, 255)' }
					])
				}
			},
			{
				name: 'bar',
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					borderRadius: 5,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00bd74' },
						{ offset: 1, color: 'rgb(55, 162, 255)' }
					])
				},
				data: barData,
			},
			{
				name: 'line',
				type: 'bar',
				barGap: '-100%',
				barWidth: 10,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(20,200,212,0.5)' },
						{ offset: 0.2, color: 'rgba(20,200,212,0.2)' },
						{ offset: 1, color: 'rgba(20,200,212,0)' }
					])
				},
				z: -12,
				data: lineData
			},
			{
				name: 'dotted',
				type: 'pictorialBar',
				symbol: 'rect',
				itemStyle: {
					color: layout.themeMode === 'dark' ? '#141414' : '#fff'
				},
				symbolRepeat: true,
				symbolSize: [12, 4],
				symbolMargin: 1,
				z: -10,
				data: lineData
			}
		]
	}
	otherCharts2.value.setOption(option)
}

const initOtherCharts3 = () => {
	otherCharts3.value = echarts.init(otherRef3.value!)
	let xAxisData = []
	let data1 = []
	let data2 = []
	for (let i = 0; i < 100; i++) {
	xAxisData.push('A' + i)
	data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
	data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
	}
	const option: echarts.EChartsOption = {
		legend: {
			data: ['bar', 'bar2']
		},
		tooltip: {},
		xAxis: {
			data: xAxisData,
			splitLine: {
				show: false
			}
		},
		yAxis: {
			splitLine: {  
				lineStyle: {
					type: 'dashed',
					color: layout.themeMode === 'dark' ? '#222' : '#e0e6f1'
				} 
			}
		},
		grid: { left: 0, right: 5, bottom: 0, top: 30, containLabel: true },
		series: [
			{
				name: 'bar',
				type: 'bar',
				data: data1,
				emphasis: {
					focus: 'series'
				},
				animationDelay: function (idx) {
					return idx * 10;
				}
			},
			{
				name: 'bar2',
				type: 'bar',
				data: data2,
				emphasis: {
					focus: 'series'
				},
				animationDelay: function (idx) {
					return idx * 10 + 100;
				}
			}
		],
		animationEasing: 'elasticOut',
		animationDelayUpdate: function (idx) {
			return idx * 5;
		}
	}
	otherCharts3.value?.setOption(option)
}

const initOtherCharts4 = () => {
	otherCharts4.value = echarts.init(otherRef4.value!)
	const option: echarts.EChartsOption = {
		tooltip: {
			trigger: 'item'
		},
		series: [
			{
				type: 'pie',
				radius: [10, 100],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8
				},
				label: { color: '#bbb' },
				data: [
					{ value: 40, name: 'rose 1' },
					{ value: 38, name: 'rose 2' },
					{ value: 32, name: 'rose 3' },
					{ value: 30, name: 'rose 4' },
					{ value: 28, name: 'rose 5' },
					{ value: 26, name: 'rose 6' },
					{ value: 22, name: 'rose 7' },
					{ value: 18, name: 'rose 8' }
				]
			}
		]
	}
	otherCharts4.value?.setOption(option)
}

const initOtherCharts5 = () => {
	otherCharts5.value = echarts.init(otherRef5.value!)
	const option: echarts.EChartsOption = {
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: 'Sales', max: 6500 },
				{ name: 'Administration', max: 16000 },
				{ name: 'Information Technology', max: 30000 },
				{ name: 'Customer Support', max: 38000 },
				{ name: 'Development', max: 52000 },
				{ name: 'Marketing', max: 25000 }
			]
		},
		series: [
			{
				name: 'Budget vs spending',
				type: 'radar',
				data: [
					{
						value: [4200, 3000, 20000, 35000, 50000, 18000],
						name: 'Allocated Budget'
					},
					{
						value: [5000, 14000, 28000, 26000, 42000, 21000],
						name: 'Actual Spending'
					}
				]
			}
		]
	}
	otherCharts5.value?.setOption(option)
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
			<a-col :xl="17" :xs="24">
				<a-card>
					<div class="charts" ref="otherRef2"></div>
				</a-card>
			</a-col>
			<a-col :xl="7" :xs="24">
				<a-card title="销售额排名">
					<template #extra>
						<SvgIcon name="ellipsis" />
					</template>
					<ul class="sales-ranking flex-v flex-around">
						<li v-for="(item, index) of salesRanking" :key="index" class="flex flex-between">
							<div class="flex">
								<span class="flex flex-center flex-middle">{{ index + 1 }}</span>
								<span>{{ item }}</span>
							</div>
							<a-statistic :value="112893" :value-style="{ fontSize: '16px' }" />
						</li>
					</ul>
				</a-card>
			</a-col>
		</a-row>
		<br>
		<a-row :gutter="[20, 20]" class="row-3">
			<a-col :lg="8" :xs="24">
				<a-card title="柱状图动画延迟">
					<div class="charts" ref="otherRef3"></div>
				</a-card>
			</a-col>
			<a-col :lg="8" :xs="24">
				<a-card title="南丁格尔玫瑰图">
					<div class="charts" ref="otherRef4"></div>
				</a-card>
			</a-col>
			<a-col :lg="8" :xs="24">
				<a-card title="雷达图">
					<div class="charts" ref="otherRef5"></div>
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
	.charts { overflow: hidden; }
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
		.sales-ranking {
			margin: 0;
			li:not(li:last-child) {
				margin-bottom: 10px;
			}
			li {
				border-bottom: 1px dashed var(--border-color);
				>div:first-child {
					span:first-child {
						margin-right: 20px;
						width: 20px;
						height: 20px;
						color: #fff;
						border-radius: 50%;
						background-color: #444;
					}
				}
			}
			li:nth-child(1) { 
				>div>span:first-child {
					background-color: #ea005a;
				}
			 }
			li:nth-child(2) { 
				>div>span:first-child {
					background-color: #00bd74;
				}
			 }
			li:nth-child(3) { 
				>div>span:first-child {
					background-color: #1890ff;
				}
			 }
		}
	}

	.row-3 {
		.charts {
			height: 200px;
		}
	}
}
</style>