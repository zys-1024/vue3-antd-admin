<script lang="ts" setup>
import { reactive } from 'vue'
import useTheme from '@/hooks/useTheme'
import darkMode from '@/utils/theme'

interface IStyleName { light: string, dark: string, darkMode: string }
interface INavName { sider: string, top: string, mix: string }
interface ISelected {
	pageStyle: keyof IStyleName
	primaryColor: number
	navMode: keyof INavName
}
interface IStyles { tip: string, name: keyof IStyleName }
interface INavTypes { tip: string, name: keyof INavName }

const { setMenuTheme, setMenuMode } = useTheme()
const selected = reactive<ISelected>({
	pageStyle: 'light',
	primaryColor: 0,
	navMode: 'sider'
})
const colors: string[] = ['#1890ff', '#f00', '#ea005a', '#f50', '#3acf5c', '#07d8ce', '#7f59ff', '#ad0ee3']
const styles: IStyles[] = [
	{ tip: 'setting.lightMenuStyle', name: 'light' },
	{ tip: 'setting.darkMenuStyle', name: 'dark' },
	{ tip: 'setting.darkMode', name: 'darkMode' }
]
const navs: INavTypes[] = [
	{ tip: 'setting.siderMenuLayout', name: 'sider' },
	{ tip: 'setting.topMenuLayout', name: 'top' },
	{ tip: 'setting.mixMenuLayout', name: 'mix' }
]

const setPageStyle = (style: keyof IStyleName) => {
    selected.pageStyle = style
    switch (style) {
        case 'light':
            darkMode(false)
            setMenuTheme('light')
            break
        case 'dark':
            darkMode(false)
            setMenuTheme('dark')
            break
        case 'darkMode':
            darkMode(true)
            // @ts-ignore
            setMenuTheme('default')
            break
    }
}
const setPrimaryColor = (index: number, color: string) => {
    selected.primaryColor = index
}
const setNavigationMode = (mode: keyof INavName) => {
    selected.navMode = mode
    switch(mode) {
        case 'sider':
            setMenuMode('inline')
            break
        case 'top':
            setMenuMode('horizontal')
            break
        case 'mix':
            setMenuMode('mix')
            break
    }
}
</script>

<template>
    <div class="layout-setting-item layout-setting-style">
        <p>{{ $t('setting.pageStyle') }}</p>
        <div class="flex">
            <a-tooltip placement="top" v-for="item of styles" :key="item.name">
                <template #title>
                    <span>{{ $t(item.tip) }}</span>
                </template>
                <div @click="setPageStyle(item.name)">
                    <SvgIcon name="check" v-show="selected.pageStyle === item.name" />
                </div>
            </a-tooltip>
        </div>
    </div>
    <div class="layout-setting-item layout-setting-theme-color">
        <p>{{ $t('setting.themeColor') }}</p>
        <ul class="flex">
            <li v-for="(item, index) of colors" 
            :key="item" 
            :style="{backgroundColor: item}" 
            class="flex flex-middle flex-center"
            @click="setPrimaryColor(index, item)">
                <svgIcon name="check" v-show="selected.primaryColor === index" />
            </li>
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
                    <SvgIcon name="check" v-show="selected.navMode === item.name" />
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