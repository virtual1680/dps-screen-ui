<template>
	<ChartBox type="hardware" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 硬件健康
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

import { apiServerNope } from '@/api/home';

export default defineComponent({
	name: 'serverNode',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: { ChartBox },
	setup(props) {
		let lineChart = ref(null);
		let timer: any = null;
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
		let option: object = {};
		let dataZoomLength = 7;
		let dataZoomTime = 3000;
		let zoomLoop: any = null;
		let xAxisData: any = [];

		let echartData: any = [];

		const initChart = () => {
			//使用主题初始化
			let dom = lineChart.value;
			chart = proxy.$echarts.init(dom);
		};
		const chartAnim = () => {
			// zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
			// dynamic(chart, _option as EChartsOption,5000);
		};
		const init = async () => {
			// await getData()
			initChart();
			chartAnim();
		};

		onMounted(() => {
			init();
			window.addEventListener('resize', function () {
				// 让我们的图表调用 resize这个方法
				chart && chart.resize();
			});
		});
		// 获取数据
		const getData = async () => {
			await apiServerNope().then(res => {
				let data = res.data;

				echartData = data.map((item: any) => {
					return {
						name: item.type,
						value: item.value,
					};
				});
			});
		};

		const getOption = () => {
			let option = {
				series: [
					{
						type: 'gauge',
						startAngle: 210,
						endAngle: -30,
						min: 0,
						max: 1,
						splitNumber: 10,
						center: ['50%', '52%'],
						axisLine: {
							lineStyle: {
								width: 10,
								color: [
									[0.25, '#FF6E76'],
									[0.5, '#FDDD60'],
									[0.75, '#7CFFB2'],
									[1, '#7CFFB2'],
								],
							},
						},
						pointer: {
							itemStyle: {
								color: 'auto',
							},
						},
						axisTick: {
							show: false,
						},
						splitLine: {
							show: false,
						},
						axisLabel: {
							show: false,
						},
						title: {
							show: false,
						},
						detail: {
							fontSize: 22,
							offsetCenter: [0, '40%'],
							valueAnimation: true,
							formatter: function (value: number) {
								if (value >= 0.875) {
									return '优';
								} else if (value >= 0.625) {
									return '良';
								} else if (value >= 0.375) {
									return '差';
								} else if (value >= 0.125) {
									return '老火';
								}
								return '';
							},
							color: 'auto',
						},
						data: [
							{
								value: 1,
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
