<template>
	<div class="chart-three-box">
		<div class="header">
			<img class="icon" src="./img/title-tip.png" alt="" />
			<span class="title">{{ data[type].title }}</span>
		</div>
		<div
			class="content"
			:style="`background:url(${data[type].bg}) no-repeat;background-size: 100% 100%;`">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
// 第三级弹窗 左边 box
import { defineComponent, reactive } from 'vue';
enum SChartType {
	hardware = 'hardware',
	cpu = 'cpu',
	performance = 'performance',
	disk = 'disk',
	read = 'read',
}
export default defineComponent({
	name: 'ChartBoxOne',
	props: {
		type: {
			type: String,
			default: SChartType.hardware,
		},
	},
	setup() {
		let data = reactive({
			hardware: {
				title: '硬件健康',
				bg: new URL('./img/hardware-bg.png', import.meta.url).href,
			},
			cpu: {
				title: 'CPU温度',
				bg: new URL('./img/cpu-bg.png', import.meta.url).href,
			},
			performance: {
				title: '资源占比',
				bg: new URL('./img/performance-bg.png', import.meta.url).href,
			},
			disk: {
				title: '硬盘温度',
				bg: new URL('./img/disk-bg.png', import.meta.url).href,
			},
			read: {
				title: '性能概况',
				bg: new URL('./img/read-bg.png', import.meta.url).href,
			},
		});
		return { data };
	},
});
</script>
<style lang="scss" scoped>
.chart-three-box {
	width: 100%;
	height: 100%;
	.header {
		display: flex;
		align-items: center;
		height: 38px;
		.icon {
			width: 30px;
			height: 19px;
		}
		.title {
			margin-left: 10px;
			height: 20px;
			font-size: 14px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			line-height: 20px;
		}
	}
	.content {
		height: calc(100% - 38px);
		width: 100%;
	}
}
</style>
