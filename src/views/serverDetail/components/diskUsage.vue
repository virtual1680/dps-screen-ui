<template>
	<ChartBox type="diskUsage" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 磁盘使用
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { ECharts } from 'echarts';
import { initChart } from '@/serve/echartsCommon';
export default defineComponent({
	name: 'diskUsage',
	props: {
		data: {
			type: String,
			default: '0',
		},
	},
	components: { ChartBox },
	setup(props) {
		let lineChart = ref(null);
		let chart: ECharts | null = null;

		watch(
			() => props.data,
			() => {
				chartAnim();
			},
		);
		onMounted(() => {
			chart = initChart(chart, lineChart);
		});
		const chartAnim = () => {
			chart?.clear();
			let _option = getOption();
			chart?.setOption(_option);
		};

		const getOption = () => {
			let option = {
				series: [
					{
						type: 'gauge',
						startAngle: 210,
						endAngle: -30,
						min: 0,
						max: 100,
						splitNumber: 10,
						center: ['50%', '52%'],
						axisLine: {
							lineStyle: {
								width: 10,
								color: [
									[0.25, '#7DF5FF'],
									[0.5, '#00D4D3'],
									[0.75, '#FFBC90'],
									[1, '#DE0113'],
								],
							},
						},
						pointer: { itemStyle: { color: 'inherit' } },
						axisTick: { show: false },
						splitLine: { show: false },
						axisLabel: { show: false },
						title: { show: false },
						detail: {
							fontSize: 22,
							offsetCenter: [0, '40%'],
							valueAnimation: true,
							formatter: function (value: number) {
								return value + '%';
							},
							color: 'inherit',
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
