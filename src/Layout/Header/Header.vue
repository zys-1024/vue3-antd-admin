<script lang="ts" setup>
import UserStore from '@/store/user'

const userStore = UserStore()
</script>

<template>
    <div class="header flex flex-middle flex-between">
        <el-icon class="sidebar-toggle pointer">
			<i-ep-fold />
		</el-icon>
        <div class="navbar">
			<ul class="navbar-list flex">
				<li class="navbar-list-item"><el-icon><i-ep-search /></el-icon></li>
				<li class="navbar-list-item"><el-icon><i-ep-bell /></el-icon></li>
				<li class="navbar-list-item"><SvgIcon name="full" /></li>
				<li class="navbar-list-item" style="padding: 0;">
					<div style="height: 100%;">
						<ChangeLocale :show-locale="false" trigger="hover" />
					</div>
				</li>
				<li class="navbar-list-item" style="padding: 0;">
					<el-dropdown style="height: 100%;">
						<div class="flex flex-middle" style="padding: 0 10px;">
							<el-avatar :size="25" :src="userStore.userInfo.avatar" />
							<span class="username">{{ userStore.userInfo.username }}</span>
						</div>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>
									<SvgIcon name="home" />
									{{ $t('header.home') }}
								</el-dropdown-item>
								<el-dropdown-item>
									<el-icon><i-ep-user /></el-icon>
									{{ $t('header.personalCenter') }}
								</el-dropdown-item>
								<el-dropdown-item>
									<el-icon><i-ep-setting /></el-icon>
									{{ $t('header.setting') }}
								</el-dropdown-item>
								<el-dropdown-item divided @click="userStore.logout">
									<el-icon><i-ep-switchButton /></el-icon>
									{{ $t('header.logout') }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>	
				</li>
			</ul>
		</div>
    </div>
</template>

<style lang="scss" scoped>
.header {
  	height: 100%;
	.navbar {
		height: 100%;
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

				.el-dropdown { height: 100%; }
				.change-locale {
					height: 100%;
					:deep(.el-dropdown) {
						height: 100%;
						>div { padding: 0 10px; }
					}
				}
			}
		}
	}
}
</style>