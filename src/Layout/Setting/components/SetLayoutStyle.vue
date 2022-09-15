<script lang="ts" setup>
import { ref } from 'vue'
import useTheme from '@/hooks/useTheme'
import darkMode from '@/utils/theme'
import layoutStore from '@/store/layout'

interface INavName { inline: string, horizontal: string, mix: string }
interface IStyles { tip: string, name: keyof PageStyle }
interface INavTypes { tip: string, name: keyof INavName }

const layout = layoutStore()
const { setBodyAttr } = useTheme()
const primaryColor = ref<string>()
const colorRef = ref<HTMLInputElement>()
const colors: string[] = ['#1890ff', '#ea005a', '#f50', '#faad14', '#00bd74', '#4bd600', '#7f59ff', '']
const styles: IStyles[] = [
	{ tip: 'setting.lightMenuStyle', name: 'light' },
	{ tip: 'setting.darkMenuStyle', name: 'dark' },
	{ tip: 'setting.darkMode', name: 'darkMode' }
]
const navs: INavTypes[] = [
	{ tip: 'setting.siderMenuLayout', name: 'inline' },
	{ tip: 'setting.topMenuLayout', name: 'horizontal' },
	{ tip: 'setting.mixMenuLayout', name: 'mix' }
]

const currentColor = (item: string) => {
    return layout.primaryColor === item || (!colors.includes(layout.primaryColor) && item === '')
}

const setPageStyle = (style: keyof PageStyle) => {
    layout.pageStyle = style
    switch (style) {
        case 'light':
            darkMode(false)
            layout.setMenuTheme('light')
            layout.setThemeMode('light')
            setBodyAttr('menu-theme', 'light')
            break
        case 'dark':
            darkMode(false)
            layout.setThemeMode('light')
            if (layout.menuType !== 'mix') {
                layout.setMenuTheme('dark')
                setBodyAttr('menu-theme', 'dark')
            }
            break
        case 'darkMode':
            darkMode(true)
            layout.setMenuTheme('light')
            layout.setThemeMode('dark')
            setBodyAttr('menu-theme', 'light')
            break
    }
}

const setPrimaryColor_ = (color: string) => {
    if (color === '') {
        colorRef.value?.click()
    } else {
        layout.setThemePrimaryColor(color)
        primaryColor.value = layout.primaryColor
    }
}

const colorChange = (e: Event) => {
    layout.setThemePrimaryColor((e.target as HTMLInputElement).value)
    primaryColor.value = layout.primaryColor
}

const setNavigationMode = (mode: keyof INavName) => {
    layout.menuType = mode
    switch(mode) {
        case 'inline':
            layout.setMenuType('inline')
            setBodyAttr('menu-type', 'inline')
            if (layout.pageStyle === 'dark') {
               layout.setMenuTheme('dark')
            }
            break
        case 'horizontal':
            layout.setMenuType('horizontal')
            setBodyAttr('menu-type', 'horizontal')
            if (layout.pageStyle === 'dark') {
               layout.setMenuTheme('dark')
            }
            break
        case 'mix':
            layout.setMenuType('mix')
            setBodyAttr('menu-type', 'mix')
            if (layout.pageStyle === 'dark') {
                layout.setMenuTheme('light')
            }
            if (layout.pageStyle !== 'darkMode') {
                layout.pageStyle = 'light'
                setBodyAttr('menu-theme', 'light')
            }
            break
    }
}
</script>

<template>
    <div class="layout-setting-item layout-setting-style">
        <p>{{ $t('setting.pageStyle') }}</p>
        <div class="flex">
            <a-tooltip placement="top" v-for="item of styles.filter(item => !(item.name === 'dark' && layout.menuType === 'mix'))" :key="item.name">
                <template #title>
                    <span>{{ $t(item.tip) }}</span>
                </template>
                <div @click="setPageStyle(item.name)">
                    <SvgIcon name="check" v-show="layout.pageStyle === item.name" />
                </div>
            </a-tooltip>
        </div>
    </div>
    <div class="layout-setting-item layout-setting-theme-color">
        <p>{{ $t('setting.themeColor') }}</p>
        <ul class="flex">
            <li v-for="(item, index) of colors" 
            :key="item" 
            :style="{background: item}" 
            :class="{'select-color': index === colors.length - 1}"
            class="flex flex-middle flex-center"
            @click="setPrimaryColor_(item)">
                <svgIcon name="check" v-show="currentColor(item)" />
            </li>
            <input type="color" v-model="primaryColor" ref="colorRef" @change="colorChange" />
        </ul>
    </div>
    <div class="layout-setting-item layout-setting-navigation-mode">
        <p>{{ $t('setting.navMode') }}</p>
        <div class="flex">
            <a-tooltip placement="top" v-for="item of navs" :key="item.name">
                <template #title>
                    <span>{{ $t(item.tip) }}</span>
                </template>
                <div @click="setNavigationMode(item.name)">
                    <SvgIcon name="check" v-show="layout.menuType === item.name" />
                </div>
            </a-tooltip>
        </div>
	</div>
</template>

<style lang="less" scoped>
.layout-setting-item:not(:first-child) {
	margin-top: 25px;
}

.checkbox-item {
	position: relative;
	width: 45px;
	height: 36px;
	margin-right: 15px;
	border-radius: var(--z-radius);
	background-color: var(--setting-style-bg2);
	box-shadow: var(--setting-style-shadow);
	overflow: hidden;
	cursor: pointer;
	&::before, &::after {
		position: absolute;
		display: block;
		content: "";
		top: 0;
		left: 0
	}
	&::before { width: 100%; height: 9px; }
	&::after { width: 15px; height: 100%; }
	.svg-icon {
		position: absolute;
		margin: 0;
		right: 5px;
		bottom: 5px;
	}
}
.layout-setting-style,
.layout-setting-navigation-mode {
	>div {
		div {
			.checkbox-item();
		}
		div:first-child {
			&::before { background-color: var(--setting-style-pseudo1); }
			&::after { background-color: var(--setting-style-pseudo1); }
		}
		div:nth-child(2) {
			&::before { background-color: var(--setting-style-pseudo1); }
			&::after { background-color: var(--setting-style-pseudo2); }
		}
		div:last-child {
			background-color: var(--setting-style-bg3);
			&::before { background-color: var(--setting-style-pseudo); }
			&::after { background-color: var(--setting-style-pseudo); }
		}
	}
}
.layout-setting-theme-color {
	ul {
        position: relative;
		li {
			width: 20px;
			height: 20px;
			border-radius: var(--z-radius);
			background-color: var(--primary-color);
			margin-right: 10px;
			cursor: pointer;
			.svg-icon {
				margin: 0;
				color: var(--setting-style-handle);
			}
		}
        input[type="color"] {
            position: absolute;
            width: 20px;
			height: 20px;
            top: 0;
            right: 22px;
            visibility: hidden;
        }
        .select-color {
            background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
                        linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
                        linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
        }
	}
}
.layout-setting-navigation-mode {
	>div {
		div:first-child {
			&::after { background-color: var(--setting-style-pseudo2); }
			&::before { background-color: var(--setting-style-pseudo1); }
		}
		div:nth-child(2) {
			&::before { background-color: var(--setting-style-pseudo2);}
			&::after { background-color: transparent}
		}
		div:last-child {
			background-color: var(--setting-style-bg2);
			&::before { background-color: var(--setting-style-pseudo2); z-index: 1; }
			&::after { background-color: var(--setting-style-pseudo1); z-index: 0; }
		}
	}
}
</style>