<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, shallowRef, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import 'echarts-liquidfill'
import layoutStore from '@/store/layout'
import useMethod from '@/hooks/useMethod'

const layout = layoutStore()
const methods = useMethod()
const chart = shallowRef<echarts.ECharts>()
const chart2 = shallowRef<echarts.ECharts>()
const chart3 = shallowRef<echarts.ECharts>()
const chart4 = shallowRef<echarts.ECharts>()
const chart5 = shallowRef<echarts.ECharts>()
const chart6 = shallowRef<echarts.ECharts>()
const chartRef = ref<HTMLDivElement>()
const chartRef2 = ref<HTMLDivElement>()
const chartRef3 = ref<HTMLDivElement>()
const chartRef4 = ref<HTMLDivElement>()
const chartRef5 = ref<HTMLDivElement>()
const chartRef6 = ref<HTMLDivElement>()
const timer = ref<NodeJS.Timer | null>()
const chart2Timer = ref<NodeJS.Timer | null>()
const money = reactive<{a: string, b: string}>({ a: '2369万元', b:'980万元' })

onMounted(() => {
	init()
})

onUnmounted(() => {
	timer.value && clearInterval(timer.value)
	chart2Timer.value && clearInterval(chart2Timer.value)
	timer.value = null
	chart2Timer.value = null
	chart.value?.dispose()
	chart2.value?.dispose()
	chart3.value?.dispose()
	chart4.value?.dispose()
	chart5.value?.dispose()
	chart6.value?.dispose()
	methods.setMethod('monitorChartsResize', null)
})

watch(() => layout.themeMode, newVal => {
	chart.value?.setOption({ yAxis: {
		name: 'Order',
		splitLine: {
			lineStyle: { color: newVal === 'dark' ? '#222' : '#e0e6f1' }
		}
	}} as echarts.EChartsOption)
})

const init = () => {
	setTimeout(() => {
		initChart()
		initChart2()
		initChart3()
		initChart4()
		initChart5()
		initChart6()
		methods.setMethod('monitorChartsResize', resize)
	})
}

const resize = () => {
	chart.value?.resize()
	chart2.value?.resize()
	chart3.value?.resize()
	chart4.value?.resize()
	chart5.value?.resize()
	chart6.value?.resize()
}

const initChart = () => {
	chart.value = echarts.init(chartRef.value!)
	let app: Record<string, any> = {}
	const categories = (function () {
		let now = new Date()
		let res = []
		let len = 10
		while (len--) {
			res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
			now = new Date(+now - 2000)
		}
		return res
	})()
	const categories2 = (function () {
		let res = []
		let len = 10
		while (len--) {
			res.push(10 - len - 1)
		}
		return res
	})()
	const data = (function () {
		let res = []
		let len = 10
		while (len--) {
			res.push(Math.round(Math.random() * 1000))
		}
		return res
	})()
	const data2 = (function () {
		let res = []
		let len = 0
		while (len < 10) {
			res.push(+(Math.random() * 10 + 5).toFixed(1))
			len++
		}
		return res
	})()
	const option: echarts.EChartsOption = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#283b56'
				}
			}
		},
		dataZoom: {
			show: false,
			start: 0,
			end: 100
		},
		grid: { left: 0, right: 0, bottom: 0, top: 25, containLabel: true },
		xAxis: [
			{
				type: 'category',
				boundaryGap: true,
				data: categories
			},
			{
				type: 'category',
				boundaryGap: true,
				data: categories2
			}
		],
		yAxis: [
			{
				type: 'value',
				scale: true,
				name: 'Price',
				max: 30,
				min: 0,
				boundaryGap: [0.2, 0.2],
				splitLine: {
					lineStyle: { 
					 	color: layout.themeMode === 'dark' ? '#222' : '#e0e6f1' 
					}
				}
			},
			{
				type: 'value',
				scale: true,
				name: 'Order',
				max: 1200,
				min: 0,
				boundaryGap: [0.2, 0.2],
				splitLine: {
					lineStyle: { 
					 	color: layout.themeMode === 'dark' ? '#222' : '#e0e6f1' 
					}
				}
			}
		],
		series: [
			{
				name: 'Dynamic Bar',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: data,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [
						{ offset: 0, color: '#21c7ff' },
						{ offset: 1, color: '#62daaa' }]
					)
				}
			},
			{
				name: 'Dynamic Line',
				type: 'line',
				data: data2,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [
						{ offset: 0, color: '#0ff' },
						{ offset: 1, color: '#f0f' }]
					),
					shadowColor: 'rgba(0,0,0,0.4)',
					shadowBlur: 5,
					shadowOffsetY: 10
				},
				lineStyle: {
					shadowColor: 'rgba(0,0,0,0.4)',
					shadowBlur: 5,
					shadowOffsetY: 10
				}
			}
		]
	}
	chart.value.setOption(option)
	app.count = 11;
	timer.value = setInterval(() => {
		let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
		data.shift();
		data.push(Math.round(Math.random() * 1000));
		data2.shift();
		data2.push(+(Math.random() * 10 + 5).toFixed(1));
		categories.shift();
		categories.push(axisData);
		categories2.shift();
		categories2.push(app.count++);
		chart.value?.setOption({
			xAxis: [
				{ data: categories },
				{ data: categories2 }
			],
			series: [
				{ data: data },
				{ data: data2 }
			]
		});
	}, 2100);
}

const initChart2 = () => {
	chart2.value = echarts.init(chartRef2.value!)
	const data = [10, 14, 18, 16, 20, 38, 30, 34, 40, 39, 35, 58, 60, 65, 55, 50, 64, 60, 65, 70]
	const data2 = [18, 16, 10, 14, 20, 30, 35, 34, 38, 40, 39, 48, 54, 60, 65, 55, 60, 60, 65, 65]
	const option: echarts.EChartsOption = {
		xAxis: {
			type: 'category',
			data: new Array(20).fill('').map((item, index) => index + 1),
			show: false
		},
		yAxis: {
			type: 'value',
			show: false,
		},
		grid: { left: -27, right: -7, bottom: -20, top: 10, containLabel: true },
		series: [
			{
				data,
				type: 'line',
				symbolSize: 0,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
							offset: 0,
							color: '#f0f'
						}, {
							offset: 1,
							color: '#0ff'
						}]
					)
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
							offset: 0,
							color: '#f0f'
						}, {
							offset: 1,
							color: 'rgba(0, 255, 255, .1)'
						}]
					)
				}
			}
		]
	}
	chart2.value.setOption(option)
	let flag = true
	chart2Timer.value = setInterval(() => {
		chart2.value?.setOption({ series: [{ data: flag ? data2 : data }] })
		money.a = flag ? '1383万元' : '2369万元'
		money.b = flag ? '757万元' : '980万元'
		flag = !flag
	}, 1000)
}

const initChart3 = () => {
	chart3.value = echarts.init(chartRef3.value!)
	const option: echarts.EChartsOption = {
		series: [
			{
				type: 'gauge',
				radius: '115%',
				center: ['50%', '59%'],
				axisLine: {
					lineStyle: {
						width: 30,
						color: [
							[0.3, '#67e0e3'],
							[0.7, '#37a2da'],
							[1, '#fd666d']
						]
					}
				},
				pointer: {
					itemStyle: { color: 'inherit' }
				},
				axisTick: {
					distance: -30,
					length: 8,
					lineStyle: {
						color: '#fff',
						width: 2
					}
				},
				splitLine: {
					distance: -30,
					length: 30,
					lineStyle: {
						color: '#fff',
						width: 4
					}
				},
				axisLabel: {
					color: 'inherit',
					distance: 40,
					fontSize: 14
				},
				detail: {
					valueAnimation: true,
					formatter: '{value}',
					color: 'inherit'
				},
				data: [ { value: 70 } ],
			}
		]
	}
	chart3.value.setOption(option)
}

const initChart4 = () => {
	chart4.value = echarts.init(chartRef4.value!)
	const data = [
		{ value: 38, left: '15%', color: '#1890ff'}, 
		{ value: 24, left: '50%', color: '#faad14' }, 
		{ value: 60, left: '85%', color: '#00bd74'}
	]
	const option: echarts.EChartsOption = {
		series: data.map(item => ({
			type: 'gauge',
			startAngle: 90,
			endAngle: -270,
			center: [item.left, '50%'],
			pointer: { show: false },
			axisTick: { show: false },
			splitLine: { show: false },
			axisLabel: { show: false },
			progress: { 
				show: true, 
				itemStyle: { color: item.color } 
			},
			detail: {
				offsetCenter: [0, '15%'],
				fontSize: '16px',
				formatter: value => value + '%',
				color: item.color
			},
			data: [{ value: item.value }]
		}))
	}
	chart4.value.setOption(option)
}

const initChart5 = () => {
	chart5.value = echarts.init(chartRef5.value!)
	let data = [
        {name: "国庆节快乐", value: "111"},
        {name: "水润更贴肤", value: "222"},
        {name: "持久不脱妆", value: "458"},
        {name: "哪个分期有免息", value: "445"},
        {name: "小黑瓶", value: "456"},
        {name: "高度遮瑕", value: "647"},
        {name: "非常舒适", value: "864"},
        {name: "暗沉暗黄", value: "556"},
        {name: "熬夜变老", value: "189"},
        {name: "抢到了", value: "864"},
        {name: "非常流畅", value: "864"},
        {name: "小白管", value: "652"},
        {name: "国庆节快乐", value: "111"},
        {name: "水润更贴肤", value: "222"},
        {name: "持久不脱妆", value: "458"},
        {name: "哪个分期有免息", value: "445"},
        {name: "小黑瓶", value: "456"},
        {name: "高度遮瑕", value: "647"},
        {name: "非常舒适", value: "864"},
        {name: "暗沉暗黄", value: "556"},
        {name: "熬夜变老", value: "189"},
        {name: "抢到了", value: "864"},
        {name: "非常流畅", value: "864"},
        {name: "小白管", value: "652"},
    ];
	const option = {
		series: [{
			type: 'wordCloud',
			width: '100%',
			height: '100%',
			sizeRange: [5, 25],
			rotationRange: [-90, 90],
			rotationStep: 45,
			gridSize: 8,
			drawOutOfBound: false,
			layoutAnimation: true,
			textStyle: {
				fontFamily: 'sans-serif',
				fontWeight: 'bold',
				color: function () {
					return 'rgb(' + [
						Math.round(Math.random() * 160),
						Math.round(Math.random() * 160),
						Math.round(Math.random() * 160)
					].join(',') + ')';
				}
			},
			emphasis: {
				focus: 'self',
				textStyle: {
					shadowBlur: 10,
					shadowColor: '#333'
				}
			},
			data
		}]
	}
	chart5.value.setOption(option)
}

const initChart6 = () => {
	chart6.value = echarts.init(chartRef6.value!)
	const option = {
		series: [{
			type: 'liquidFill',
			radius: '90%',
			data: [0.4, 0.4, 0.4],
			itemStyle: {
					opacity: 0.6
			},
			emphasis: {
				itemStyle: {
					opacity: 0.9
				}
			}
		}]
	}
	chart6.value.setOption(option)
}
</script>

<template>
    <div class="monitor">
        <a-row :gutter="[20, 20]" class="row-1">
			<a-col :xl="17" :xs="24">
				<a-card title="活动实时交易情况" style="height: 100%;">
					<a-row :gutter="[20, 20]">
						<a-col :xs="24" :sm="12" :md="6">
							<a-statistic title="今日交易额" :value="64939109">
								<template #suffix>元</template>
							</a-statistic>
						</a-col>
						<a-col :xs="24" :sm="12" :md="6">
							<a-statistic title="销售目标完成率" value="95%" />
						</a-col>
						<a-col :xs="24" :sm="12" :md="6">
							<a-statistic-countdown
								title="活动倒计时"
								:value="Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30"
								format="HH:mm:ss:SSS"
								style="margin-right: 50px"
							/>
						</a-col>
						<a-col :xs="24" :sm="12" :md="6">
							<a-statistic title="每秒成交额" value="269元" />
						</a-col>
					</a-row>
					<div class="charts chart1" ref="chartRef"></div>
				</a-card>
			</a-col>
			<a-col :xl="7" :xs="24">
				<a-card title="活动情况预测">
					<a-statistic title="目标评估" value="有望达到预期水平" style="margin-right: 50px" />
					<br>
					<div class="chart2-container">
						<p>
							<p>{{ money.a }}</p>
							<p>{{ money.b }}</p>
						</p>
						<div class="charts chart2" ref="chartRef2"></div>
						<div class="flex flex-between">
							<span>00:00</span>
							<span>12:00</span>
							<span>23:00</span>
						</div>
					</div>
				</a-card>
				<br>
				<a-card title="券核效率">
					<div class="charts chart3" ref="chartRef3"></div>
				</a-card>
			</a-col>
        </a-row>
		<br>
		<a-row :gutter="[20, 20]" class="row-2">
			<a-col :xl="12" :xs="24">
				<a-card title="品类占比">
					<div class="chart4" ref="chartRef4"></div>
				</a-card>
			</a-col>
			<a-col :xl="6" :lg="12" :xs="24">
				<a-card title="热门搜索">
					<div class="chart5" ref="chartRef5"></div>
				</a-card>
			</a-col>
			<a-col :xl="6" :lg="12" :xs="24">
				<a-card title="资源剩余">
					<div class="chart6" ref="chartRef6"></div>
				</a-card>
			</a-col>
		</a-row>
    </div>
</template>

<style lang="less" scoped>
.monitor {
	.charts { overflow: hidden; }
	.row-1 {
		.chart1 {  height: 450px; }
		.chart2-container {
			position: relative;
			>p {
				position: absolute;
				width: 100%;
				top: -10px;
				margin: 0;
				p {
					margin-bottom: 10px;
					border-bottom: 1px dashed var(--border-color);
				}
			}
			.chart2 { height: 80px; }
			:deep(.ant-statistic-content) {
				white-space: nowrap;
			}
			>div:last-child {
				font-size: 12px;
				margin-top: 5px;
			}
		}
		.chart3 { height: 195px; }
	}
	.row-2 {
		.chart4 ,
		.chart5,
		.chart6 { height: 160px; }
	}
}
</style>