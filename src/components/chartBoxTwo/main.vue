<template>
	<div class="chart-two-box">
		<div class="header">
			<span>{{ data[type].title }}</span>
		</div>
		<div
			class="content"
			:style="`background:url(${data[type].bg}) no-repeat;background-size: 100% 100%;`">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
// 柱状 折线图 box
import { defineComponent, reactive } from 'vue';
enum BChartType {
	early = 'early',
	serve = 'serve',
	device = 'device',
	workOrder = 'workOrder',
	earlyError = 'earlyError',
}
export default defineComponent({
	name: 'ChartBoxOne',
	props: {
		type: {
			type: String,
			default: BChartType.early,
		},
	},
	setup() {
		let data = reactive({
			early: {
				title: '预警',
				bg: new URL('./img/small-bg.png', import.meta.url).href,
			},
			device: {
				title: '设备信息',
				bg: new URL('./img/device.png', import.meta.url).href,
			},
			workOrder: {
				title: '工单故障占比',
				bg: new URL('./img/work-order.png', import.meta.url).href,
			},
		});
		return { data };
	},
});
</script>
<style lang="scss" scoped>
.chart-one-box {
	width: 100%;
	height: 100%;
	background: red;
	.header {
		height: 32px;
		width: 100%;
		font-size: 13px;
		font-size: 14px;
		font-weight: 600;
		color: #00e4ff;
	}
	.content {
		height: calc(100% - 32px);
		width: 100%;
	}
}
</style>
