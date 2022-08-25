<script lang="ts" setup>
import UserStore from '@/store/user'
import { reactive } from 'vue'
import useTheme from '@/hooks/useTheme'

interface IState { isFullScreen: boolean }

const { collapse } = defineProps({
	collapse: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits<{
    (event: 'update:collapse', collapse: boolean): void
}>()

const userStore = UserStore()
const { getMenuMode } = useTheme()
const state = reactive<IState>({
	isFullScreen: false
})

const fullScreen = () => {
	if (document.fullscreenElement) {
		document.exitFullscreen()
		state.isFullScreen = false
	} else {
		document.documentElement.requestFullscreen()
		state.isFullScreen = true
	}
}
</script>

<template>
    <div class="header flex flex-middle flex-between" :class="{ 'flex-end': getMenuMode() !== 'inline' }">
        <div v-if="getMenuMode() === 'inline'" class="sider-collapse flex flex-center flex-middle pointer" @click="emit('update:collapse', !collapse)">
			<SvgIcon :name="collapse ? 'unfold' : 'fold'" />
		</div>
        <div class="navbar">
			<ul class="navbar-list flex">
				<li class="navbar-list-item"><SvgIcon name="search" /></li>
				<li class="navbar-list-item">
					<a-badge dot>
						<SvgIcon name="bell" />
					</a-badge>
				</li>
				<li class="navbar-list-item" @click="fullScreen"><SvgIcon :name="state.isFullScreen ? 'unfull' : 'full'" /></li>
				<li class="navbar-list-item" style="padding: 0;">
					<div style="height: 100%;">
						<ChangeLocale :show-locale="false" trigger="hover" />
					</div>
				</li>
				<li class="navbar-list-item" style="padding: 0;">
					<a-dropdown style="height: 100%;">
						<div class="flex flex-middle" style="padding: 0 10px;">
							<a-avatar :size="25" :src="userStore.userInfo.avatar" />
							<span class="username">{{ userStore.userInfo.username }}</span>
						</div>
						<template #overlay>
							<a-menu>
								<a-menu-item>
									<SvgIcon name="home" />
									{{ $t('header.home') }}
								</a-menu-item>
								<a-menu-item>
									<SvgIcon name="user" />
									{{ $t('header.personalCenter') }}
								</a-menu-item>
								<a-menu-item>
									<SvgIcon name="setting" />
									{{ $t('header.setting') }}
								</a-menu-item>
								<a-menu-item divided @click="userStore.logout">
									<SvgIcon name="shut" />
									{{ $t('header.logout') }}
								</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>	
				</li>
			</ul>
		</div>
    </div>
</template>

<style lang="less" scoped>
.header {
  	height: 100%;
	.sider-collapse {
		padding: 0 10px;
		height: 100%;
		.svg-icon { font-size: 18px; margin: 0; }
		&:hover {
			background-color: var(--hover-bg);
		}
	}
	.navbar {
		height: 100%;
		user-select: none;
		.navbar-list {
			height: 100%;
			.navbar-list-item {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 10px;
				cursor: pointer;
				&:hover {
					background-color: var(--hover-bg);
				}
				:deep(.svg-icon) { margin: 0; }
				.username {
					font-size: 14px;
					margin-left: 5px;
				}

				.ant-dropdown-trigger { height: 100%; }
				.change-locale {
					height: 100%;
					:deep(.ant-dropdown-trigger) {
						height: 100%;
						padding: 0 10px;
					}
				}
			}
		}
	}
}
</style>