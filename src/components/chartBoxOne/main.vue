<template>
  <div class="chart-one-box">
    <div class="header">
      <span>{{ data[type].title }}</span>
    </div>
    <div class="content" :style="`background:url(${data[type].bg}) no-repeat;background-size: 100% 100%;`">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
// 环 饼图 box
import { defineComponent, reactive } from 'vue';
enum SChartType {
	serve = 'serve',
	device = 'device',
	workOrder = 'workOrder',
	early = 'early',
	earlyError = 'earlyError',
}
export default defineComponent({
	name: 'ChartBoxOne',
	props: {
		type: {
			type: String,
			default: SChartType.early,
		},
	},
	setup() {
		let data = reactive({
			serve: {
				title: '服务器节点分布',
				bg: new URL('./img/serve.png', import.meta.url).href,
			},
			device: {
				title: '设备信息',
				bg: new URL('./img/device.png', import.meta.url).href,
			},
			workOrder: {
				title: '工单故障占比',
				bg: new URL('./img/work-order.png', import.meta.url).href,
			},
			early: {
				title: '预警分布环比',
				bg: new URL('./img/early.png', import.meta.url).href,
			},
			earlyError: {
				title: '预警异常分布',
				bg: new URL('./img/early-error.png', import.meta.url).href,
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
	.header {
		background: url('./img/header-bg.png') no-repeat;
		background-size: 100% 100%;
		text-align: center;
		line-height: 23px;
		height: 23px;
		width: 100%;
		font-size: 13px;
		font-weight: 600;
		color: #00e4ff;
		span {
			margin-left: 10px;
		}
	}
	.content {
		height: calc(100% - 23px);
		width: 100%;
	}
}
</style>
