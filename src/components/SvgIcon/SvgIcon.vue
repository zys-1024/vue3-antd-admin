<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '',
    },
})

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
    if (props.name) {
        return `svg-icon icon-${props.name}`
    }
    return 'svg-icon'
})
</script>

<template>
    <svg :class="svgClass" v-bind="$attrs">
        <use :xlink:href="iconName" />
    </svg>
</template>

<style lang="less" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: -.5px;
    margin-right: 7px;
}
</style>