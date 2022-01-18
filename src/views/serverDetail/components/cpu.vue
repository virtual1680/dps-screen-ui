<template>
	<ChartBox type="cpu" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// cpu温度
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
								color: [
									[
										1,
										proxy.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
							offsetCenter: [0, '-20%'],
							valueAnimation: true,
							color: '#00E4FF',
						},
						data: [
							{
								value: 100,
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
