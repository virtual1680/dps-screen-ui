<template>
	<ChartBox type="serve" style="width: 360px; height: 250px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 工单状态
import ChartBoxTwo from '@components/chartBoxTwo/main.vue';
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

export default defineComponent({
	name: 'workStatus',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: { ChartBoxTwo },
	setup(props) {
		const { chartData } = toRefs(props);
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
		const init = () => {
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
		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
			updateChart(_option as EChartsOption);
		};
		const getOption = () => {
			console.log(new Date().getTime());
			let _resData = [
				{
					num: 1,
					statisticsType: '已处理',
					time: '北京',
				},
				{
					num: 3,
					statisticsType: '处理中',
					time: '北京',
				},
				{
					num: 4,
					statisticsType: '待处理',
					time: '北京',
				},
				{
					num: 1,
					statisticsType: '处理中',
					time: '贵州',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '重庆',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '四川',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '上海',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '云南',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '四川',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '上海',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '云南',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '四川',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '上海',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '云南',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '四川',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '上海',
				},
				{
					num: 1,
					statisticsType: '待处理',
					time: '云南',
				},
			];
			let _areaColor = ['#13DEC7', '#46A6FF', '#00C7E7'];
			let _seriesItem = [],
				seriesArray = [];

			xAxisData = _resData
				.map(item => item.time)
				//当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
				.filter((item, index, arr) => arr.indexOf(item, 0) === index)
				.sort((a, b) => {
					if (a < b) {
						return -1;
					} else if (a > b) {
						return 1;
					}
					return 0;
				});

			let arr = {
				title: ['处理中', '已处理', '待处理'],
				list: [
					{
						name: '北京',
						item: [1, 3, 6],
					},
					{
						name: '上海',
						item: [1, 3, 6],
					},
				],
			};
			console.log('-=-=-=', xAxisData);
			let legendData = _resData
				.map(item => item.statisticsType)
				//当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
				.filter((item, index, arr) => arr.indexOf(item, 0) === index);

			let _seriesData: any = [];
			// type  value date
			legendData.forEach((legendName, index) => {
				let _aData = new Array(xAxisData.length).fill('');
				let typeData = _resData.filter((item: any) => item.statisticsType == legendName);
				console.log(typeData);
				xAxisData.forEach((name: any, i: any) => {
					let arr = typeData.filter(item => item.time == name);
					let val = arr.length != 0 ? arr[0].num : 0;
					_aData[i] = val;
				});
				// console.log(_aData)
				_seriesData.push({
					name: legendName,
					type: 'bar',
					color: _areaColor[index],
					smooth: true,
					symbolSize: 0,
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: _areaColor[index], // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(255,255,255,0)', // 100% 处的颜色
								},
							],
							global: false, // 缺省为 false
						},
					},
					emphasis: {
						symbolSize: 6,
						// focus: 'series'
					},
					animationDelay: function (idx: any) {
						// 越往后的数据延迟越大
						return idx * 10;
					},
					data: _aData,
				});
			});
			console.log(new Date().getTime());
			let option = {
				tooltip: {
					show: true,
					trigger: 'axis',
					backgroundColor: 'rgba(6, 59, 108, 0.6)',
					extraCssText: 'box-shadow: inset rgb(23, 213, 235) 0px 0px 15px 1px;',
					borderColor: '#17D5EB',
					borderWidth: 1,
					textStyle: {
						fontSize: 18,
						color: '#FBFAFB',
					},
					// formatter: function (params){}
				},
				legend: {
					data: legendData, //['ff', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					top: '1%',
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
					type: 'category',
					// boundaryGap: false,
					axisLabel: {
						show: true,
						rotate: 30,
						margin: 20,
						textStyle: {
							color: 'rgba(71,95,123,.5)', //更改坐标轴文字颜色
							fontSize: 14, //更改坐标轴文字大小
						},
						formatter: function (value: any, index: any) {
							return value.slice(0, 10) + '\n' + value.slice(10);
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
					type: 'value',
					splitNumber: 6,
					axisLabel: {
						show: true,
						textStyle: {
							color: 'rgba(71,95,123,.5)', //更改坐标轴文字颜色
							fontSize: 14, //更改坐标轴文字大小
						},
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: 'rgba(38,151,255,.12)',
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
