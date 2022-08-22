<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

interface IColorState {
  primaryColor?: string
  errorColor?: string
  warningColor?: string
  successColor?: string
  infoColor?: string
}

const defaultColors = {
  primaryColor: '#1890ff',
  errorColor: '#ff4d4f',
  warningColor: '#faad14',
  successColor: '#52c41a',
  infoColor: '#1890ff',
}

let colorState = reactive<IColorState>({ ...defaultColors })

onMounted(() => {
    const antTheme = window.localStorage.getItem('ant-theme')
    if (!!antTheme) {
        Object.assign(colorState, { ...JSON.parse(antTheme) })
    }
})

watch(colorState, (newColor: IColorState) => {
    ConfigProvider.config({
        theme: newColor
    })
    window.localStorage.setItem('ant-theme', JSON.stringify(newColor))
})
</script>

<template>
    <div>
        <span>primary</span>
        <input type="color" v-model="colorState.primaryColor" />
        <span>error</span>
        <input type="color" v-model="colorState.errorColor" />
        <span>wran</span>
        <input type="color" v-model="colorState.warningColor" />
        <span>success</span>
        <input type="color" v-model="colorState.successColor" />
        <span>info</span>
        <input type="color" v-model="colorState.infoColor" />
    </div>
</template>

<style lang="less" scoped>

</style>