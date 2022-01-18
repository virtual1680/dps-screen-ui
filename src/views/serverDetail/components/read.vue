<script lang="ts">
import ChartBox from '@components/chartBoxThree/main.vue';
import { defineComponent, onMounted, ref, getCurrentInstance, watch } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';
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
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
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
		//使用主题初始化
		const initChart = () => {
			const dom = lineChart.value;
			chart = proxy.$echarts.init(dom);
		};

		onMounted(() => {
			initChart();
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
			dynamic(chart, _option as EChartsOption, 2000);
		};

		const getOption = () => {
			let _areaColor = ['rgba(255, 141, 68,', 'rgba(0, 189, 255,', 'rgba(225, 245, 255,'];

			let _seriesData: any = [];

			echartData.forEach((item: DataItem, k: number) => {
				_seriesData.push({
					name: item.name,
					type: 'line',
					symbol: 'circle',
					itemStyle: {
						color: _areaColor[k] + '1)',
					},
					lineStyle: {
						color: _areaColor[k] + '1)',
						width: 2,
					},
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
					// type: 'category',
					// boundaryGap: false,
					axisLabel: {
						show: true,
						margin: 20,
						textStyle: {
							color: '#A8DFFF', //更改坐标轴文字颜色
							fontSize: 14, //更改坐标轴文字大小
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

<template>
	<ChartBox type="read" style="width: 840px; height: 350px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	padding: 15px;
	font-size: 12px;
	justify-content: flex-end;
	.item {
		margin-right: 5px;
		width: 64px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		cursor: pointer;
		&.selected {
			background: url('../../../assets/serverDetail/selected.png') no-repeat;
			background-size: 100% 100%;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #ffffff;
		}
		&.unselect {
			background: url('../../../assets/serverDetail/unselect.png') no-repeat;
			background-size: 100% 100%;
			color: #8de6f8;
		}
	}
}
.chart {
	width: 100%;
	height: 100%;
}
</style>
