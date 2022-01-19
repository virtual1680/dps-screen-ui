<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import screenHeader from '@components/header/index.vue';
import EarlyWarningNum from '@/components/earlyWarningNum/main.vue';
import CensusNum from '@components/censusNum/main.vue';

import CenterBox from './components/home/center/index.vue';
import ServeCategory from './components/home/serveCategory/index.vue';
import WorkStatus from './components/home/workStatus/index.vue';
import deviceNews from './components/home/deviceNews/index.vue';
import serveNode from './components/home/serveNode/index.vue';
import serveResources from './components/home/serveResources/index.vue';
import earlyWarning from './components/home/earlyWarning/index.vue';
import warningAbnormal from './components/home/warningAbnormal/index.vue';
import workOrderAbbormal from './components/home/workOrderAbbormal/index.vue';
import workOrderData from './components/home/workOrderData/index.vue';
import warningTrend from './components/home/warningTrend/index.vue';

// 服务器列表
import serverPage from '../serverPage/index.vue';

import { apiLeftTopTags, apiRightTopTags, apiOrderStatusTrend } from '@/api/home';
export default defineComponent({
	name: 'home',
	components: {
		screenHeader,
		EarlyWarningNum,
		CensusNum,
		CenterBox, //中间模块
		ServeCategory, //服务器分类
		WorkStatus,
		deviceNews, //设备信息
		serveNode, //服务器节点
		serveResources,
		earlyWarning, //预警分布
		warningAbnormal, //预警异常
		workOrderAbbormal, //工单故障
		workOrderData, //工单数据
		warningTrend, //预警趋势
		serverPage,
	},
	setup() {
		let data = reactive({
			serverPageShow: false,
			leftTopData: {},
			rightTopData: {},
			orderStatusData: {},
		});

		onMounted(() => {
			init();
		});

		const init = () => {
			getLeftTopData();
			getRightTopTags();
			getOrderStatusTrend();
		};
		// 左上标签数据接口
		const getLeftTopData = () => {
			apiLeftTopTags().then(res => {
				data.leftTopData = res.data;
			});
		};
		// 右上标签数据接口
		const getRightTopTags = () => {
			apiRightTopTags().then(res => {
				data.rightTopData = res.data;
			});
		};
		// 工单状态
		const getOrderStatusTrend = () => {
			apiOrderStatusTrend().then(res => {
				data.orderStatusData = res.data;
			});
		};

		// 打开服务器列表页
		const openServerPageFun = () => {
			data.serverPageShow = true;
		};

		// emit事件监听
		const closeSpage = (val: string) => {
			data.serverPageShow = false;
		};

		return { data, openServerPageFun, closeSpage };
	},
});
</script>

<template>
	<div class="container" @click="openServerPageFun">
		<screenHeader />
		<div class="content">
			<div class="left-container">
				<div class="t-container">
					<div class="item-1 flex-jc-cb flex-d-c">
						<div class="flex-jc-cb" style="height: 76px; width: 100%">
							<CensusNum
								type="serve"
								:num="data.leftTopData.serverNum"
								style="height: 100%; width: 126px" />
							<CensusNum
								type="deviceOn"
								:num="data.leftTopData.deviceOnLine"
								style="height: 100%; width: 126px" />
							<CensusNum
								type="deviceOff"
								:num="data.leftTopData.deviceOffLine"
								style="height: 100%; width: 126px" />
							<CensusNum
								type="workOrder"
								:num="data.leftTopData.todayWorkOrder"
								:nums="data.leftTopData.yesterdayWorkOrder"
								style="height: 100%; width: 325px" />
						</div>
						<div class="flex-jc-cb">
							<serveNode />
							<serveResources />
						</div>
					</div>
					<div class="item-2">
						<CenterBox style="height: 100%; width: 100%" />
					</div>
					<div class="item-3 flex-jc-cb flex-d-c">
						<ServeCategory style="width: 360px; height: 342px" />
						<!-- 设备信息 -->
						<deviceNews />
					</div>
					<div class="item-4">
						<workOrderAbbormal />
					</div>
					<div class="item-5">
						<!-- 工单状态  -->
						<WorkStatus :chartData="data.orderStatusData" />
					</div>
				</div>
			</div>
			<div class="right-container flex-jc-cb flex-d-c">
				<div class="early-list flex-jc-cb">
					<EarlyWarningNum
						type="yesterday"
						:num="data.rightTopData.yesterdayAlarm"
						style="width: 172px; height: 83px" />
					<EarlyWarningNum
						type="today"
						:num="data.rightTopData.todayAlarm"
						style="width: 172px; height: 83px" />
					<EarlyWarningNum
						type="week"
						:num="data.rightTopData.thisWeekAlarm"
						style="width: 172px; height: 83px" />
					<EarlyWarningNum
						type="month"
						:num="data.rightTopData.thisMonthAlarm"
						style="width: 172px; height: 83px" />
				</div>
				<div class="early-chart flex-jc-cb">
					<earlyWarning />
					<warningAbnormal />
				</div>
				<div style="height: 280px; width: 100%">
					<warningTrend />
				</div>
				<div style="height: 306px; width: 100%">
					<workOrderData />
				</div>
			</div>
		</div>
	</div>
	<serverPage
		@closeServerPage="closeSpage"
		:class="['server-page', data.serverPageShow ? 'fadeIn' : 'fadeOut']"></serverPage>
</template>

<style lang="scss" scoped>
.container {
	height: 100%;
}
.content {
	display: flex;
	height: calc(100% - 80px);
	padding: 10px 15px 23px;
	.left-container {
		width: 1165px;
		display: flex;
		flex-wrap: wrap;
		.t-container {
			display: grid;
			grid-template-columns: 360px 360px 390px;
			grid-template-rows: 338px 260px 335px;
			gap: 17px 13px;
			.item-1 {
				grid-column: 1 / span 2;
				grid-row: 1 / span 1;
			}
			.item-2 {
				// background: red;
				grid-column: 3 / span 1;
				grid-row: 1 / span 2;
			}
			.item-3 {
				grid-column: 1 / span 1;
				grid-row: 2 / span 2;
			}
			.item-4 {
				grid-column: 2 / span 1;
				grid-row: 2 / span 1;
			}
			.item-5 {
				grid-column: 2 / span 2;
				grid-row: 3 / span 1;
			}
		}
	}
	.right-container {
		width: 755px;
		height: 100%;
		.early-list {
			height: 83px;
			width: 100%;
		}
		.early-chart {
			height: 253px;
			width: 100%;
		}
	}
}
.server-page {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 9999999;
	animation-duration: 1s;
	animation-fill-mode: both;
	&.fadeIn {
		animation-name: zoomIn;
	}
	&.fadeOut {
		animation-name: fadeOut;
	}
}
</style>
