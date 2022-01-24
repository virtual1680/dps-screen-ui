<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 服务器分类
****************************************-->
<template>
	<div class="chart" ref="lineChart"></div>
</template>
<script lang="ts">
// 服务器分类
import { defineComponent, onMounted, ref } from 'vue';
import { EChartsOption, ECharts, EChartOption } from 'echarts';
import { dynamic, initChart, getInstance } from '@/serve/echartsCommon';
import { apiServerCategory } from '@/api/home';
export default defineComponent({
	name: 'serverCategory',
	setup() {
		let timer: NodeJS.Timer | null = null;
		let echartData: any = [];
		let lineChart = ref(null);
		const instance = getInstance();
		let chart: ECharts;
		let zoomLoop: any = null;
		let xAxisData: any = [];

		const init = async () => {
			await getData();
			chart = initChart(chart, lineChart, instance);
			chartAnim();
		};

		onMounted(() => {
			init();
		});
		// 获取数据
		const getData = async () => {
			await apiServerCategory().then(res => {
				echartData = res.data;
			});
		};

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart?.clear();
			let _option = getOption();
			chart?.setOption(_option as EChartOption);
			dynamic(timer, chart, _option as EChartsOption, 5000);
		};

		const getOption = () => {
			const echarts = instance.proxy?.$echarts as ECharts & { graphic: any };
			let salvProName = echartData.map((item: any) => item.name);
			xAxisData = salvProName;
			let salvProValue = echartData.map((item: any) => item.count);
			let salvProMax = []; //背景按最大值

			for (let i = 0; i < salvProValue.length; i++) {
				salvProMax.push(salvProValue[0]);
			}

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
					formatter: (params: any) => {
						let item = params.filter((item: any) => item.seriesName != '背景');
						let str = '';
						item.forEach((item: any) => {
							str += item.name + ':' + item.value + '\n';
						});
						return str;
					},
				},
				legend: {
					show: false,
					top: '5%',
					textStyle: {
						color: '#A8DFFF',
					},
				},
				grid: {
					left: '7%',
					right: '7%',
					bottom: '2%',
					top: '2%',
					containLabel: true,
					// backgroundColor: "rgba(0,0,0,0.2)",
					// borderWidth: 0
				},

				xAxis: {
					type: 'value',
					axisLabel: {
						show: false,
						margin: 20,
						color: '#A8DFFF', //更改坐标轴文字颜色
						fontSize: 14, //更改坐标轴文字大小
					},
					axisTick: { show: false },
					axisLine: {
						show: false,
						lineStyle: {
							color: 'rgba(38,151,255,.12)',
						},
					},
					splitLine: { show: false },
					data: xAxisData,
				},
				yAxis: [
					{
						type: 'category',
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
							show: false,
							lineStyle: {
								color: 'rgba(38,151,255,.12)',
							},
						},
						data: salvProName,
					},
					{
						type: 'category',
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
							show: false,
							lineStyle: {
								color: 'rgba(38,151,255,.12)',
							},
						},
						data: salvProValue,
					},
				],
				series: [
					{
						name: '值',
						type: 'bar',
						zlevel: 1,
						itemStyle: {
							borderRadius: 30,
							color: echarts.graphic.LinearGradient(0, 1, 1, 0, [
								{ offset: 0, color: 'rgba(0,0,0,0)' },
								{ offset: 1, color: '#00E8FB' },
							]),
						},
						barWidth: 4,
						data: salvProValue,
					},
					{
						name: '背景',
						type: 'bar',
						barWidth: 4,
						barGap: '-100%',
						data: salvProMax,
						itemStyle: { color: '#006A7A', borderRadius: 30 },
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
