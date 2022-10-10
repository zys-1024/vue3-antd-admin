import * as echarts from 'echarts/core'
import { ECharts } from 'echarts'
import { 
    BarChart,
    BarSeriesOption,
    LineChart,
    LineSeriesOption,
    PictorialBarChart,
    PictorialBarSeriesOption,
    PieChart,
    PieSeriesOption,
    RadarChart,
    RadarSeriesOption,
    GaugeChart,
    GaugeSeriesOption
} from 'echarts/charts'

import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { EChartsType } from 'echarts'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PictorialBarSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>  

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  BarChart,
  LineChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export interface Charts extends ECharts {}

export const chartInit = (dom: HTMLElement, theme?: string | object, opts?: ECOption): EChartsType => {
    return echarts.init(dom) as any as Charts
}
  
export default echarts