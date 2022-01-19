<template>
	<ChartBox type="memory" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 内存使用
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { ECharts } from 'echarts';
import { initChart, getInstance } from '@/serve/echartsCommon';
export default defineComponent({
	name: 'memoryUsage',
	props: {
		content: String,
		data: {
			type: String,
			default: '0',
		},
	},
	components: { ChartBox },
	setup(props) {
		let lineChart = ref(null);
		let { proxy } = getInstance();
		let chart: ECharts | null = null;

		const chartAnim = () => {
			chart?.clear();
			let _option = getOption();
			chart?.setOption(_option);
		};
		watch(
			() => props.data,
			() => {
				chartAnim();
			},
		);
		onMounted(() => {
			chart = initChart(chart, lineChart);
		});

		const getOption = () => {
			const echarts = proxy?.$echarts as ECharts & { graphic: any };
			let option = {
				series: [
					{
						type: 'gauge',
						startAngle: 215,
						endAngle: -35,
						min: 0,
						max: 100,
						splitNumber: -1,
						radius: '80%',
						center: ['51%', '63%'],
						pointer: { show: false },
						axisTick: { show: false },
						axisLine: {
							show: true,
							lineStyle: {
								width: 14,
								color: [
									[
										1,
										echarts.graphic.LinearGradient(0, 0, 1, 0, [
											{ offset: 0.1, color: '#00F3FF' },
											{ offset: 0.6, color: '#FF8D44' },
											{ offset: 1, color: '#DE0113' },
										]),
									],
								],
							},
						},
						axisLabel: { show: false },
						title: { show: false },
						detail: {
							fontSize: 22,
							offsetCenter: [0, '-15%'],
							valueAnimation: true,
							color: '#00E4FF',
						},
						data: [
							{
								value: props.data,
								name: '',
							},
						],
					},
				],
			};
			return option;
		};

		return {
			lineChart,
		};
	},
});
</script>
<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
