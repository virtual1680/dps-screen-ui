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
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs, watch } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

import { apiServerCategory } from '@/api/home';
export default defineComponent({
	name: 'serverCategor',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: {},

	setup(props) {
		let timer: any = null;
		let echartData: any = [];
		let lineChart = ref(null);
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
		let option: object = {};
		let dataZoomLength = 7;
		let dataZoomTime = 3000;
		let zoomLoop: any = null;
		let xAxisData: any = [];
		const initChart = () => {
			//使用主题初始化
			let dom = lineChart.value;
			chart = proxy.$echarts.init(dom);
		};

		watch(
			() => props.chartData,
			(newVal, oldVal) => {},
		);

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
			await apiServerCategory().then(res => {
				echartData = res.data;
			});
		};

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
			// updateChart(_option as EChartsOption);
			dynamic(chart, _option as EChartsOption, 5000);
		};

		const getOption = () => {
			var salvProName = echartData.map((item: any) => item.name);
			xAxisData = salvProName;
			var salvProValue = echartData.map((item: any) => item.count);
			var salvProMax = []; //背景按最大值

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
				// dataZoom: [
				// 	{
				// 		xAxisIndex: 0, //这里是从X轴的0刻度开始
				// 		show: false, //是否显示滑动条，不影响使用
				// 		type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
				// 		startValue: 0, // 从头开始。
				// 		endValue: dataZoomLength, // 一次性展示6个。
				// 	},
				// ],
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
					// boundaryGap: false,
					axisLabel: {
						show: false,
						margin: 20,
						color: '#A8DFFF', //更改坐标轴文字颜色
						fontSize: 14, //更改坐标轴文字大小
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: 'rgba(38,151,255,.12)',
						},
					},
					splitLine: {
						show: false,
					},
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
							color: new proxy.$echarts.graphic.LinearGradient(0, 1, 1, 0, [
								{
									offset: 0,
									color: 'rgba(0,0,0,0)',
								},
								{
									offset: 1,
									color: '#00E8FB',
								},
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
						itemStyle: {
							color: '#006A7A',
							borderRadius: 30,
						},
					},
				],
			};
			return option;
		};
		// 当 line  bar 数据过多是启动轮询
		const updateChart = (option: EChartsOption) => {
			let xAxisName = xAxisData;

			let fn = () => {
				if (xAxisName.length <= dataZoomLength + 1) {
					zoomLoop && clearTimeout(zoomLoop);
					return;
				}
				// 每次向后滚动一个，最后一个从头开始。
				let zoom = option.dataZoom as DataZoomComponentOption[];
				if ((zoom[0].endValue as number) >= xAxisName.length - 1) {
					option.dataZoom[0].endValue = dataZoomLength;
					option.dataZoom[0].startValue = 0;
				} else {
					option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
					option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
				}
				chart.setOption(option);
				zoomLoop && clearTimeout(zoomLoop);
				zoomLoop = setTimeout(fn, dataZoomTime);
			};
			// 启动
			setTimeout(fn, dataZoomTime);
		};
		// tooltip自动轮询
		const dynamic = (chart, op: EChartsOption, sec: number) => {
			op.currentIndex = -1;
			const fn = () => {
				let dataLen = op.series[0].data.length;
				if (dataLen <= 0) return;
				// 取消之前高亮的图形
				chart.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: op.currentIndex,
				});
				op.currentIndex = (op.currentIndex + 1) % dataLen;
				// 高亮当前图形
				chart.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: op.currentIndex,
				});
				// 显示 tooltip
				chart.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: op.currentIndex,
				});
				timer && clearTimeout(timer);
				timer = setTimeout(fn, sec);
			};
			timer = setTimeout(fn, sec);
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
