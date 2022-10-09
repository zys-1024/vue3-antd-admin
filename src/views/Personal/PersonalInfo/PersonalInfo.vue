<script lang="ts" setup>
import userStore from '@/store/user'
import { getAssets } from '@/utils/tools';
import { storeToRefs } from 'pinia'

const { userInfo } = storeToRefs(userStore())
const list = new Array(10).fill({
    title: `ant design vue part`,
    avatar: getAssets('/image/avatar.png'),
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
})
</script>

<template>
	<a-row :gutter="[20, 20]">
		<a-col :sm="24" :xl="7">
			<a-card>
				<div class="l-div1 flex-v flex-middle">
					<a-avatar :src="userInfo.avatar" :size="100" />
					<span>{{ userInfo.username }}</span>
					<span>我闪转腾挪，你转瞬即死</span>
				</div>
				<div class="l-div2">
					<p>
						<SvgIcon name="user_info" />
						<span>前端开发</span>
					</p>
					<p>
						<SvgIcon name="cluster" />
						<span>某某公司 - 某某事业群 - 某某平台 - 某某部门 - WEB</span>
					</p>
					<p>
						<SvgIcon name="location" />
						<span>广东省深圳市</span>
					</p>
				</div>
				<a-divider />
				<div class="l-div3">
					<span>标签</span>
					<div>
						<a-tag color="pink">很有想法的</a-tag>
						<a-tag color="red">辣~</a-tag>
						<a-tag color="orange">川妹子</a-tag>
						<a-tag color="green">大长腿</a-tag>
						<a-tag color="cyan">666</a-tag>
						<a-tag color="blue">海纳百川</a-tag>
						<a-tag color="pink">怕麻烦</a-tag>
						<a-tag color="purple">想不到其他了</a-tag>
						<a-tag color="green"><SvgIcon name="plus" style="margin: 0;" /></a-tag>
					</div>
				</div>
			</a-card>
		</a-col>
		<a-col :sm="24" :xl="17">
			<a-card title="文章">
				<a-list item-layout="vertical" size="large" :pagination="{ pageSize: 10, total: 30 }" :data-source="list">
					<template #footer>
					<div>
						<b>ant design vue</b>
						footer part
					</div>
					</template>
					<template #renderItem="{ item, index }">
						<a-list-item key="item.title">
							<template #actions>
								<span>
									<SvgIcon name="star" />
									<span>169</span>
								</span>
								<span>
									<SvgIcon name="like" />
									<span>138</span>
								</span>
								<span>
									<SvgIcon name="message" />
									<span>250</span>
								</span>
							</template>
							<template #extra>
								<img
									width="272"
									alt="logo"
									:src="getAssets('/image/cover.jpg')"
								/>
							</template>
							<a-list-item-meta :description="item.description">
								<template #title>
									<a href="#">{{ item.title + ' ' + (index + 1) }}</a>
								</template>
								<template #avatar><a-avatar :src="item.avatar" /></template>
							</a-list-item-meta>
							{{ item.content }}
						</a-list-item>
					</template>
				</a-list>
			</a-card>
		</a-col>
	</a-row>
</template>

<style lang="less" scoped>
.l-div1 {
	.ant-avatar { margin-bottom: 15px; }
	>span:nth-child(2) {
		font-size: 20px;
		font-weight: 500;
		text-transform: capitalize;
	}
}
.l-div2 {
	margin-top: 30px;
	span { vertical-align: text-bottom; }
}
.l-div3 {
	>div:last-child {
		margin-top: 10px;
		.ant-tag {
			margin-bottom: 10px;
		}
	}
}

.ant-list-item-action {
	.svg-icon+span {
		vertical-align: text-bottom;
	}
}
</style>