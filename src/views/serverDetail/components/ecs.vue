<script lang="ts">
import ChartBox from '@components/chartBoxFour/main.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { EChartsOption, EChartOption, ECharts } from 'echarts';
import { dynamic, updateChart, initChart, getInstance } from '@/serve/echartsCommon';
export default defineComponent({
	name: 'ecs',
	components: { ChartBox },
	props: { data: Object },
	setup(props) {
		let timer: NodeJS.Timer | null = null;
		let lineChart = ref(null);
		let { proxy } = getInstance();
		let chart: ECharts | null = null;
		let dataZoomLength = 10;
		let dataZoomTime = 3000;
		let zoomLoop: NodeJS.Timer | null = null;

		let xAxisData: string[] = [];
		let echartData: any = [];

		watch(
			() => props.data,
			n => {
				xAxisData = n?.title;
				echartData = [{ name: 'ECS连接', value: n?.list }];
				chartAnim();
			},
		);

		onMounted(() => {
			chart = initChart(chart, lineChart);
		});

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart?.clear();
			let _option = getOption();
			chart?.setOption(_option as EChartOption);
			updateChart(
				chart,
				_option as EChartsOption,
				xAxisData,
				dataZoomLength,
				zoomLoop,
				dataZoomTime,
			);
			dynamic(timer, chart, _option as EChartsOption, 2000);
		};

		const getOption = () => {
			let _areaColor = [
				'rgba(11, 154, 168,',
				'rgba(0, 228, 255,',
				'rgba(255, 141, 68,',
				'rgba(241, 94, 94, ',
				'rgba(51, 63, 255,',
				'rgba(255, 225, 255,',
				'rgba(255, 255, 255,',
			];
			let _seriesData: any = [];
			const echarts = proxy?.$echarts as ECharts & { graphic: any };
			echartData.forEach((list: any, k: number) => {
				_seriesData.push({
					name: list.name,
					type: 'line',
					zlevel: k,
					symbol: 'none',
					itemStyle: {
						color: _areaColor[k] + '1)',
						lineStyle: {
							color: _areaColor[k] + '1)',
							width: 2,
						},
					},
					areaStyle: {
						//区域填充样式
						color: echarts.graphic.LinearGradient(0, 1, 0, 0, [
							{ offset: 0, color: _areaColor[k] + ' 0.1)' },
							{ offset: 1, color: _areaColor[k] + '0.5)' },
						]),
					},
					data: list.value,
				});
			});

			let option = {
				tooltip: {
					show: true,
					trigger: 'axis',
					backgroundColor: 'rgba(6, 59, 108, 0.6)',
					extraCssText: 'box-shadow: inset rgb(23, 213, 235) 0px 0px 15px 1px;',
					borderColor: '#17D5EB',
					borderWidth: 1,
					textStyle: { fontSize: 12, color: '#FBFAFB' },
					axisPointer: { type: 'shadow' },
				},
				legend: {
					top: '5%',
					textStyle: { color: '#A8DFFF' },
				},
				dataZoom: [
					{
						xAxisIndex: 0, //这里是从X轴的0刻度开始
						show: false, //是否显示滑动条，不影响使用
						type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
						startValue: 0, // 从头开始。
						endValue: dataZoomLength, // 一次性展示6个。
					},
				],
				grid: {
					left: '3%',
					right: '2%',
					bottom: '8%',
					top: '12%',
					containLabel: true,
				},
				xAxis: {
					axisLabel: {
						show: true,
						margin: 10,
						textStyle: {
							color: '#A8DFFF', //更改坐标轴文字颜色
							fontSize: 14, //更改坐标轴文字大小
						},
					},
					axisTick: { show: false },
					axisLine: {
						show: true,
						lineStyle: {
							color: 'rgba(38,151,255,.12)',
						},
					},
					data: xAxisData,
				},
				yAxis: {
					splitNumber: 5,
					axisLabel: {
						show: true,
						textStyle: {
							color: '#5399AF', //更改坐标轴文字颜色
							fontSize: 14, //更改坐标轴文字大小
						},
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: 'rgba(18, 81, 115, 0.6)',
						},
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(38,151,255,.12)',
						},
					},
				},
				series: _seriesData,
			};
			return option;
		};
		return {
			lineChart,
		};
	},
});
</script>

<template>
	<ChartBox type="ecsConnect" style="width: 460px; height: 446px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
