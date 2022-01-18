<template>
	<ChartBox type="diskUsage" style="width: 410px; height: 303px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 磁盘使用
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, ref, getCurrentInstance, watch } from 'vue';

export default defineComponent({
	name: 'diskUsage',
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
						pointer: { itemStyle: { color: 'auto' } },
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
							color: 'auto',
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
