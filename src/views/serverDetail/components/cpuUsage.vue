<template>
	<ChartBox type="cpu" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// cpu使用率
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, watch, ref, getCurrentInstance } from 'vue';
import { ECharts } from 'echarts';
import * as echarts from 'echarts';
export default defineComponent({
	name: 'serverNode',
	props: {
		data: {
			type: String,
			default: '0',
		},
	},
	components: { ChartBox },
	setup(props) {
		let lineChart = ref(null);
		let { proxy } = getCurrentInstance() as any;
		let chart: ECharts;

		const initChart = () => {
			//使用主题初始化
			let dom = lineChart.value;
			chart = proxy.$echarts.init(dom);
		};
		watch(
			() => props.data,
			() => {
				chartAnim();
			},
		);
		const chartAnim = () => {
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
		};
		onMounted(() => {
			initChart();
			window.addEventListener('resize', function () {
				// 让我们的图表调用 resize这个方法
				chart && chart.resize();
			});
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
						startAngle: 200,
						endAngle: -20,
						min: 0,
						max: 100,
						splitNumber: -1,
						radius: '89%',
						center: ['50%', '60%'],
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
							offsetCenter: [0, '-20%'],
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
