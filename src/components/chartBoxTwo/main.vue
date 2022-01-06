<template>
  <div class="chart-two-box">
    <div class="header">
      <div class="title">
        <img src="./img/title-icon.png" alt="">
        {{ data[type].title }}
      </div>
      <div class="detail"><img src="./img/detail.png" alt="">详情</div>
    </div>
    <div class="content" :style="`background:url(${data['early'].bg}) no-repeat;background-size: 100% 100%;`">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
// 柱状 折线图 box
import { defineComponent, reactive } from 'vue';
enum BChartType {
	early = 'early',
	workStatus = 'workStatus',
	workData = 'workData',
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
				title: '预警趋势',
				bg: new URL('./img/small-bg.png', import.meta.url).href,
			},
			workStatus: {
				title: '工单状态',
				bg: new URL('./img/big-bg.png', import.meta.url).href,
			},
			workData: {
				title: '工单数据',
				bg: new URL('./img/small-bg.png', import.meta.url).href,
			},
		});
		return { data };
	},
});
</script>
<style lang="scss" scoped>
.chart-two-box {
	width: 100%;
	height: 100%;
	.header {
		height: 32px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.title {
			display: flex;
			align-items: center;
			img {
				margin-top: 5px;
				margin-left: 5px;
				width: 16px;
				height: 32px;
			}
			font-size: 14px;
			font-weight: 600;
			color: #00e4ff;
			letter-spacing: 1px;
		}
		.detail {
			margin-right: 15px;
			align-self: flex-end;
			display: flex;
			align-items: center;
			letter-spacing: 2px;
			img {
				margin-top: 4px;
				width: 30px;
				height: 10px;
			}
			font-size: 12px;
			font-weight: 400;
			color: #ffffff;
		}
	}
	.content {
		height: calc(100% - 32px);
		width: 100%;
	}
}
</style>
