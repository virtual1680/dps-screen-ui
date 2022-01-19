<template>
	<ChartBox type="cpu" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// cpu使用率
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, watch, ref, getCurrentInstance, toRefs } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

export default defineComponent({
	name: 'serverNode',
	props: {
		data: {
			type: Number,
			default: 0,
		},
	},
	components: { ChartBox },
	setup(props) {
		let lineChart = ref(null);
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;

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
											{ offset: 0.3, color: '#00F3FF' },
											{ offset: 0.4, color: '#FF8D44' },
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
