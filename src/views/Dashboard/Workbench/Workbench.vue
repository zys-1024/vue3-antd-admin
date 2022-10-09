<script lang="ts" setup>
import userStore from '@/store/user'
import { storeToRefs } from 'pinia'
import { getAssets } from '@/utils/tools'

const { userInfo }  = storeToRefs(userStore())
</script>

<template>
	<div class="workbench">
		<div class="workbench-header flex flex-wrap flex-between">
			<div class="workbench-header-left flex flex-wrap flex-middle">
				<a-avatar :src="userInfo.avatar" :size="72" />
				<div>
					<p class="kind-tip">早安，{{ userInfo.username }}, 祝您开心每一天！</p>
					<p class="info">前端开发 | 某某公司 - 某某事业群 - 某某平台 - 某某部门 - WEB</p>
				</div>
			</div>
			<div class="workbench-header-right flex">
				<div>
					<div>项目数</div>
					<div>56</div>
				</div>
				<div>
					<div>团队内排名</div>
					<div>8 / 24</div>
				</div>
				<div>
					<div>项目访问</div>
					<div>2,223</div>
				</div>
			</div>
		</div>
		<a-row :gutter="[0, 20]" class="workbench-content">
			<a-col :xs="24" :xl="16">
				<a-card title="进行中的项目">
					<template #extra><a href="#">全部项目</a></template>
					<a-card-grid>
						<div class="flex flex-middle">
							<a-avatar :src="getAssets('icon/vue.png')" :size="32" />
							<span>Vue</span>
						</div>
						<div> 渐进式 JavaScript 框架，适用场景丰富的 Web 前端框架。 </div>
						<div>
							<span>科学搬砖组</span>&nbsp;
							<span>刚刚</span>
						</div>
					</a-card-grid>
					<a-card-grid>
						<div class="flex flex-middle">
							<a-avatar :src="getAssets('icon/html.png')" :size="32" />
							<span>HTML</span>
						</div>
						<div> HTML5是构建Web内容的一种语言描述方式 </div>
						<div>
							<span>全部都是吴彦祖</span>&nbsp;
							<span>3小时前</span>
						</div>
					</a-card-grid>
					<a-card-grid>
						<div class="flex flex-middle">
							<a-avatar :src="getAssets('icon/react.png')" />
							<span>React</span>
						</div>
						<div>React 用于构建用户界面的 JavaScript 库</div>
						<div>
							<span>扎克组</span>&nbsp;
							<span>5分钟前</span>
						</div>
					</a-card-grid>
					<a-card-grid>
						<div class="flex flex-middle">
							<a-avatar :src="getAssets('icon/typescript.png')" />
							<span>TypeScript</span>
						</div>
						<div>TypeScript 是具有类型语法的 JavaScript。</div>
						<div>
							<span>微软打工仔</span>&nbsp;
							<span>3天前</span>
						</div>
					</a-card-grid>
					<a-card-grid>
						<div class="flex flex-middle">
							<a-avatar :src="getAssets('icon/npm.png')" />
							<span>NPM</span>
						</div>
						<div>让您的 JavaScript 开发更上一层楼</div>
						<div>
							<span>大裤衩</span>&nbsp;
							<span>1年前</span>
						</div>
					</a-card-grid>
					<a-card-grid>
						<div class="flex flex-middle">
							<a-avatar :src="getAssets('icon/nodejs.png')" />
							<span>NodeJs</span>
						</div>
						<div>Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。</div>
						<div>
							<span>开源项目组</span>&nbsp;
							<span>1个月前</span>
						</div>
					</a-card-grid>
				</a-card>
				<br>
				<a-card title="动态">
					<ul>
						<li class="flex">
							<a-avatar :src="getAssets('icon/python.png')" />
							<div>
								<p>王小二&nbsp;在&nbsp;<a href="#">Github</a>&nbsp;新建仓库&nbsp;<a href="#">z-blog</a></p>
								<span>刚刚</span>
							</div>
						</li>
						<li class="flex">
							<a-avatar :src="getAssets('icon/robot.png')" />
							<div>
								<p>周星星&nbsp;将&nbsp;<a href="#">后台管理系统</a>&nbsp;分支合并</p>
								<span>5分钟前</span>
							</div>
						</li>
						<li class="flex">
							<a-avatar :src="getAssets('icon/groovy.png')" />
							<div>
								<p>韩梅梅&nbsp;更新了&nbsp;<a href="#">vue3-antd-admin</a>&nbsp;项目的&nbsp;<a href="#">接口说明文档</a></p>
								<span>6小时前</span>
							</div>
						</li>
						<li class="flex">
							<a-avatar :src="getAssets('icon/rust.png')" />
							<div>
								<p>瑞克&nbsp;<a href="#">@韩梅梅</a>&nbsp;麻烦把&nbsp; <a href="#">接口说明文档</a>&nbsp;更新一下</p>
								<span>9小时前</span>
							</div>
						</li>
						<li class="flex">
							<a-avatar :src="getAssets('icon/nest-controller.png')" />
							<div>
								<p>郭伟伟&nbsp;推送代码到&nbsp;<a href="#">Github</a></p>
								<span>1天前</span>
							</div>
						</li>
						<li class="flex">
							<a-avatar :src="getAssets('icon/gitpod.png')" />
							<div>
								<p>熊初墨&nbsp;在&nbsp;<a href="#">项目组</a>&nbsp;创建了&nbsp;<a href="#">vue3-antd-admin</a>&nbsp;项目</p>
								<span>2天前</span>
							</div>
						</li>
					</ul>
				</a-card>
			</a-col>
			<a-col :xs="24" :xl="8">
				<a-card title="便捷导航">
					<a-card-grid>
						<SvgIcon name="analyze" /><br>
						<span>分析页</span>
					</a-card-grid>
					<a-card-grid>
						<SvgIcon name="monitor" /><br>
						<span>监控页面</span>
					</a-card-grid>
					<a-card-grid>
						<SvgIcon name="setting" /><br>
						<span>设置</span>
					</a-card-grid>
					<a-card-grid>
						<SvgIcon name="user" /><br>
						<span>个人中心</span>
					</a-card-grid>
					<a-card-grid>
						<SvgIcon name="error" /><br>
						<span>异常页</span>
					</a-card-grid>
					<a-card-grid>
						<SvgIcon name="menu" /><br>
						<span>菜单</span>
					</a-card-grid>
				</a-card>
				<br>
				<a-card title="处理结果">
					<a-result
						status="success"
						title="Successfully Purchased Cloud Server ECS!"
						sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
					>
						<template #extra>
						<a-button key="console" type="primary">Go Console</a-button>
						<a-button key="buy">Buy Again</a-button>
						</template>
					</a-result>
				</a-card>
			</a-col>
		</a-row>
	</div> 
</template>

<style lang="less" scoped>
@gray: var(--text-gray);
.workbench {
	a { color: var(--primary-color); }
	margin: -20px -20px 0;
	border-top: 1px solid var(--border-color);
	.workbench-header {
		background-color: var(--tabs-bg);
		padding: 15px 20px;
		.workbench-header-left {
			>.ant-avatar { margin-right: 24px; }
			>div:last-child {
				p:first-child {
					font-size: 20px;
					margin-bottom: 12px;
				}
				p:last-child {
					margin: 0;
					color: @gray;
				}
			}
		}
		.workbench-header-right {
			margin-left: -18px;
			>div:nth-child(2) {
				position: relative;
				&::before, &::after {
					position: absolute;
					top: 8px;
					right: 0;
					width: 1px;
					height: 40px;
					background-color: var(--border-color);
					content: "";
				}
				&::before { left: 0; }
			}
			>div {
				text-align: center;
				>div:first-child {
					color: @gray;
				}
				>div:last-child {
					font-size: 24px;
					padding: 0 32px;
				}
			}
		}
	}
	.workbench-content {
		padding: 20px 10px;
		.ant-col:first-child {
			padding: 0 10px;
			@media screen and (min-width: 0) {
				.ant-card-grid {
					width: 100%;
				}
			}
			@media screen and (min-width: 768px) {
				.ant-card-grid {
					width: 50%;
				}
			}
			@media screen and (min-width: 992px) {
				.ant-card-grid {
					width: 33.33%;
				}
			}
			.ant-card-grid {
				>div:first-child {
					>span:last-child {
						margin-left: 12px;
					}
				}
				>div:nth-child(2) {
					height: 44px;
					overflow: hidden;
					color: @gray;
				}
				>div:last-child {
					.ellips();
					span:first-child { color: var(--text-gray2); }
					span:last-child { color: @gray; }
				}
			}
			li:not(li:last-child) {
				border-bottom: 1px solid var(--border-color);
			}
			li {
				padding: 15px 0;
				>div {
					margin-left: 15px;
					p { margin-bottom: 5px; }
					span { color: @gray; }
				}
			}
			li:first-child { padding-top: 0; }
			li:last-child { padding-bottom: 0; }
		}
		.ant-col:last-child {
			padding: 0 10px;
			.ant-card-grid {
				text-align: center;
				vertical-align: middle;
				.svg-icon {
					margin: 0;
					font-size: 30px;
				}
				>span { display: block; .ellips(); }
			}
			.ant-card-grid:first-child { color: #41b883; }
			.ant-card-grid:nth-child(2) { color: #faad14; }
			.ant-card-grid:nth-child(3) { color: #00bcd4; }
			.ant-card-grid:nth-child(4) { color: #0288d1; }
			.ant-card-grid:nth-child(5) { color: #ea005a; }
			.ant-card-grid:last-child { color: #7f59ff; }
		}
	}
}
</style>