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
import * as echarts from 'echarts';
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
		let chart: ECharts;

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
			let color = [{ offset: 0.25, color: '#7DF5FF' }];
			let value = parseFloat(props.data) / 100;
			if (value <= 1 && value > 0.85) {
				color.push({ offset: 1, color: '#DE0113' });
			}
			if (value <= 0.75 && value > 0.55) {
				color.push({ offset: 0.75, color: '#FFBC90' });
			}
			if (value <= 0.5 && value > 0.3) {
				color.push({ offset: 0.5, color: '#00D4D3' });
			}
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
								color: [[value, new echarts.graphic.LinearGradient(0, 0, 1, 0, color)]],
							},
						},
						axisLabel: { show: false },
						title: { show: false },
						detail: {
							fontSize: 22,
							offsetCenter: [0, '-15%'],
							valueAnimation: true,
							color: '#7DF5FF',
							formatter: (value: string) => {
								return value + '%';
							},
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
