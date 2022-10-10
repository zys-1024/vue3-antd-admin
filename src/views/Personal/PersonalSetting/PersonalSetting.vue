<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import userStore from '@/store/user'
import { getAssets } from '@/utils/tools';

const { userInfo } = storeToRefs(userStore())
const active = ref<string[]>(['基本信息'])
const upload = ref<HTMLInputElement>()
const province = ref<string>('广东省')
const city = ref<string>('深圳市')
const provinceData = ['广东省', '浙江省'];
const cityData: any = {
	'广东省': ['深圳市', '广州市', '东莞市'],
	'浙江省': ['杭州市', '绍兴市', '金华市']
}

watch(province, newVal => {
	city.value = cityData[newVal][0]
})
</script>

<template>
	<a-row :gutter="[20, 20]" class="personal-setting">
		<a-col :xs="24" :md="5" class="col-1">
			<a-menu mode="inline" v-model:selected-keys="active">
				<a-menu-item key="基本信息">基本信息</a-menu-item>
				<a-menu-item key="安全设置">安全设置</a-menu-item>
				<a-menu-item key="账号绑定">账号绑定</a-menu-item>
			</a-menu>
		</a-col>
		<a-col :xs="24" :md="19" class="col-2">
			<div>
				<p>{{ active[0] }}</p>
				<a-form class="form1" layout="vertical" v-if="active[0] === '基本信息'">
					<a-form-item label="头像">
						<div class="flex-v flex-middle">
							<a-avatar :src="userInfo.avatar" :size="80" @click="upload!.click()" style="cursor: pointer;" />
							<input type="file" ref="upload" style="display: none;">
						</div>
					</a-form-item>
					<a-form-item label="邮箱">
						<a-input :value="userInfo.email" allowClear />
					</a-form-item>
					<a-form-item label="昵称">
						<a-input :value="userInfo.username" allowClear />
					</a-form-item>
					<a-form-item label="个人简介">
						<a-textarea value="此人很懒，什么都没有留下。。。" :rows="4" />
					</a-form-item>
					<a-form-item label="国家/地区">
						<a-select value="中国">
							<a-select-option value="中国">中国</a-select-option>						
						</a-select>
					</a-form-item>
					<a-form-item label="所在省市">
						<div class="flex">
							<a-select v-model:value="province">
								<a-select-option v-for="item of provinceData" :key="item" :value="item">{{ item }}</a-select-option>
							</a-select>
							&nbsp;&nbsp;
							<a-select v-model:value="city">
								<a-select-option v-for="item of cityData[province]" :key="item" :value="item">{{ item }}</a-select-option>
							</a-select>
						</div>
					</a-form-item>
					<a-form-item label="街道地址">
						<a-input value="光明区凤凰街道" allowClear />
					</a-form-item>
					<a-form-item label="联系电话">
						<div class="flex">
							<a-input value="0198" style="width: 80px;" />
							&nbsp;&nbsp;
							<a-input value="356819304" />
						</div>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" style="width: 100%;">提交</a-button>
					</a-form-item>
				</a-form>
				<a-list v-else-if="active[0] === '安全设置'">
					<a-list-item>
						<template #actions>
							<a>修改</a>
						</template>
						<a-list-item-meta description="当前密码强度：强">
							<template #title>账号密码</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>修改</a>
						</template>
						<a-list-item-meta description="已绑定手机：150****2103">
							<template #title>密保手机</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>设置</a>
						</template>
						<a-list-item-meta description="未设置密保问题，密保问题可有效保护账户安全">
							<template #title>密保问题</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>修改</a>
						</template>
						<a-list-item-meta description="已绑定邮箱：admin****.com">
							<template #title>备用邮箱</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>绑定</a>
						</template>
						<a-list-item-meta description="未绑定 MFA 设备，绑定后，可以进行二次确认">
							<template #title>MFA 设备</template>
						</a-list-item-meta>
					</a-list-item>
				</a-list>
				<a-list v-else-if="active[0] === '账号绑定'">
					<a-list-item>
						<template #actions>
							<a>绑定</a>
						</template>
						<a-list-item-meta description="已绑定微信账号">
							<template #title>绑定微信</template>
							<template #avatar>
								<a-avatar :src="getAssets('svg/weixin.svg')" :size="48" />
							</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>绑定</a>
						</template>
						<a-list-item-meta description="当前未绑定钉钉账号">
							<template #title>绑定钉钉</template>
							<template #avatar>
								<a-avatar :src="getAssets('svg/dd.svg')" :size="48" />
							</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>绑定</a>
						</template>
						<a-list-item-meta description="当前未绑定QQ账号">
							<template #title>绑定QQ</template>
							<template #avatar>
								<a-avatar :src="getAssets('svg/qq.svg')" :size="48" />
							</template>
						</a-list-item-meta>
					</a-list-item>
					<a-list-item>
						<template #actions>
							<a>绑定</a>
						</template>
						<a-list-item-meta description="当前未绑定新浪微博账号">
							<template #title>绑定新浪微博</template>
							<template #avatar>
								<a-avatar :src="getAssets('svg/weibo.svg')" :size="48" />
							</template>
						</a-list-item-meta>
					</a-list-item>
				</a-list>
			</div>
		</a-col>
	</a-row>
</template>

<style lang="less" scoped>
.personal-setting {
	.col-2 {
		>div {
			padding: 20px;
			background-color: var(--header-bg);
			>p { font-size: 20px; margin-bottom: 10px; }
			.form1 { max-width: 600px; }
		}
	}
}
</style>