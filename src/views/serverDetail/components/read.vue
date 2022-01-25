<script lang="ts">
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { EChartsOption, ECharts } from 'echarts';
import { dynamic, updateChart, initChart } from '@/serve/echartsCommon';
interface DataItem {
	name: string;
	value: string[];
}
export default defineComponent({
	name: 'home',
	components: { ChartBox },
	props: { data: Object },
	setup(props) {
		let timer: any = null;
		let lineChart = ref(null);
		let chart: ECharts;
		let dataZoomLength = 10;
		let dataZoomTime = 3000;
		let zoomLoop: any = null;

		let xAxisData: any = [];
		let echartData: any = []; //title usage

		watch(
			() => props.data,
			n => {
				echartData = n?.list;
				xAxisData = n?.title;
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
			chart?.setOption(_option as any);
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
			let _areaColor = ['rgba(255, 141, 68,', 'rgba(0, 189, 255,', 'rgba(225, 245, 255,'];
			let _seriesData: any = [];
			echartData.forEach((item: DataItem, k: number) => {
				_seriesData.push({
					name: item.name,
					zlevel: k,
					type: 'line',
					symbol: 'circle',
					itemStyle: { color: _areaColor[k] + '1)' },
					lineStyle: { color: _areaColor[k] + '1)', width: 2 },
					data: item.value,
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
					textStyle: {
						fontSize: 12,
						color: '#FBFAFB',
					},
					axisPointer: {
						type: 'shadow',
					},
					// formatter: function (params){}
				},
				legend: {
					top: '5%',
					textStyle: {
						color: '#A8DFFF',
					},
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
					bottom: '2%',
					top: '12%',
					containLabel: true,

					// backgroundColor: "rgba(0,0,0,0.2)",
					// borderWidth: 0
				},
				xAxis: {
					axisLabel: {
						show: true,
						margin: 20,
						color: '#A8DFFF', //更改坐标轴文字颜色
						fontSize: 14, //更改坐标轴文字大小
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: 'rgba(38,151,255,.12)',
						},
					},
					data: xAxisData,
				},
				yAxis: {
					// type: 'value',
					splitNumber: 5,
					axisLabel: {
						show: true,
						color: '#5399AF', //更改坐标轴文字颜色
						fontSize: 14, //更改坐标轴文字大小
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
	<ChartBox type="read" style="width: 840px; height: 350px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
