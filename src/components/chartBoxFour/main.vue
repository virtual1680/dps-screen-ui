<template>
	<div class="chart-four-box">
		<div class="header">
			<div class="left">
				<img class="icon" src="./img/title-tip.png" alt="" />
				<span class="title">{{ data.get(`${type}`).title }}</span>
			</div>
			<img class="more" src="./img/enlarge.png" alt="" />
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
// 第三级弹窗 右边 box
import { defineComponent } from 'vue';
enum SChartType {
	broadband = 'broadband', //内网宽带
	exampleIops = 'example-iops', //实例iops
	ecsConnect = 'ecs-connect', //ecs 连接
	exampleRw = 'example-rw', //实例读写
}
export default defineComponent({
	name: 'ChartBoxOne',
	props: {
		type: {
			type: String,
			default: SChartType.broadband,
		},
	},
	setup() {
		let data = new Map();
		data.set('broadband', { title: '内网宽带(BIT/S)' });
		data.set('exampleIops', { title: '实例云盘IOPS(次/S)' });
		data.set('ecsConnect', { title: 'ECS同时连接数(T/S)' });
		data.set('exampleRw', { title: '实例云盘读写' });
		return { data };
	},
});
</script>
<style lang="scss" scoped>
.chart-four-box {
	width: 100%;
	height: 100%;
	background: #00232a;
	border: 1px solid #1d4a66;
	border-radius: 4px;
	.header {
		display: flex;
		align-items: center;
		height: 56px;
		justify-content: space-between;
		border-bottom: 1px solid #1d4a66;
		padding: 0 15px;
		.left {
			display: flex;
			align-items: center;
		}
		.icon {
			margin-top: 3px;
			width: 30px;
			height: 19px;
		}
		.title {
			margin-left: 10px;
			font-size: 14px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
		}
		.more {
			width: 31px;
			height: 26px;
		}
	}
	.content {
		height: calc(100% - 38px);
		width: 100%;
	}
}
</style>
