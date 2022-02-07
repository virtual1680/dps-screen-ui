<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 预警趋势
****************************************-->
<template>
	<ChartBoxTwo type="early" style="height: 100%; width: 100%">
		<div class="chart" ref="lineChart"></div>
	</ChartBoxTwo>
</template>
<script lang="ts">
// 预警趋势
import ChartBoxTwo from '@components/chartBoxTwo/main.vue';
import { defineComponent, onMounted, ref, getCurrentInstance, watch } from 'vue';
import { EChartsOption } from 'echarts';
import { apiWarningTrend } from '@/api/home';
import { updateChart, dynamic } from '@/serve/echartsCommon';
export default defineComponent({
	name: 'workStatus',
	components: { ChartBoxTwo },

	setup() {
		let timer: any = null;
		let lineChart = ref(null);
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
		let dataZoomLength = 10;
		let dataZoomTime = 6000;
		let zoomLoop: any = null;

		let xAxisData: string[] = [];
		let echartData: any = [];

		const initChart = () => {
			//使用主题初始化
			let dom = lineChart.value;
			chart = proxy.$echarts.init(dom);
		};

		const init = async () => {
			await getData();
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
			await apiWarningTrend().then(res => {
				let data = res.data;
				echartData = data;
			});
		};

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
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
			let colorsArea = ['rgba(0, 199, 231, ', 'rgba(255, 141, 68,', 'rgba(11, 154, 168,'];
			let _seriesData: any = [];
			xAxisData = echartData.date;
			let zrUtil = proxy.$echarts.util;
			echartData.list.forEach((list: any, k: number) => {
				let json = {
					chart0: {
						xcategory: xAxisData,
						low: list.item,
						lowLine: [] as any[],
					},
				};
				zrUtil.each(json.chart0.xcategory, function (_: unknown, index: number) {
					json.chart0.lowLine.push([
						[index, json.chart0.low[index]],
						[index + 1, json.chart0.low[index + 1]],
					]);
				});

				_seriesData.push(
					{
						name: list.name,
						type: 'line',
						zlevel: k,
						// smooth: true,
						symbol: 'circle',
						symbolSize: 10,
						areaStyle: {
							color: new proxy.$echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: colorsArea[k] + '.9)',
									},
									{
										offset: 0.8,
										color: 'rgba(6, 8, 41,.1)',
									},
								],
								false,
							),
							shadowColor: colorsArea[k] + ' 0.1)',
							shadowBlur: 10,
						},
						itemStyle: {
							color: colorsArea[k] + '1)',
						},
						data: list.item,
					},
					{
						name: list.name,
						type: 'lines',
						coordinateSystem: 'cartesian2d',
						zlevel: k + 150,
						smooth: true,
						symbol: 'circle',
						effect: {
							show: true,
							smooth: true,
							period: 2,
							symbolSize: 8,
						},
						lineStyle: {
							color: colorsArea[k] + '1)',
							width: 0,
							opacity: 0,
							curveness: 0,
						},
						data: json.chart0.lowLine,
					},
				);
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
					// data: legendData, //['ff', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
					// type: 'category',
					// boundaryGap: false,
					axisLabel: {
						show: true,
						rotate: 30,
						margin: 20,
						color: '#A8DFFF', //更改坐标轴文字颜色
						fontSize: 14, //更改坐标轴文字大小
						formatter: function (value: any, index: any) {
							return value.slice(0, 4) + '' + value.slice(4);
							// var date = new Date(value);
							// return date.getFullYear()+'\n'+(date.getMonth() + 1)+'-'+date.getDate();
						},
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
<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
