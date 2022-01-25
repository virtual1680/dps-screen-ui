<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 设备信息
****************************************-->
<template>
	<ChartBox type="device" style="width: 360px; height: 253px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
import ChartBox from '@components/chartBoxOne/main.vue';
import { defineComponent, onMounted, ref, getCurrentInstance, watch } from 'vue';
import { ECharts, EChartsOption } from 'echarts';
import { dynamic } from '@/serve/echartsCommon';
import { apiDeviceInfo } from '@/api/home';

export default defineComponent({
	name: 'workStatus',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: { ChartBox },

	setup(props) {
		let timer: NodeJS.Timer | null = null;
		let lineChart = ref(null);
		let { proxy } = getCurrentInstance() as any;
		let chart: ECharts;
		let zoomLoop: any = null;

		let echartData: any = [];
		let totalCount = 0;

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
			await apiDeviceInfo().then(res => {
				let data = res.data.percentage;
				totalCount = res.data.totalCount;
				echartData = data.map((item: any) => {
					return {
						name: item.type,
						value: item.val,
					};
				});
			});
		};

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option as any);
			dynamic(timer, chart, _option as EChartsOption, 5000);
		};

		const formatNumber = (num: any) => {
			let reg = /(?=(\B)(\d{3})+$)/g;
			return num.toString().replace(reg, ',');
		};

		const getOption = () => {
			let color = [
				'#00E4FF',
				'#0B9AA8',
				'#00BDFF',
				'#FFFFFF',
				'#7DF5FF',
				'#0E7CE2',
				'#FF8352',
				'#E271DE',
				'#F8456B',
				'#00FFFF',
				'#4AEAB0',
			];
			let option = {
				color: color,

				title: [
					{
						text: '{name|总量}\n{val|' + formatNumber(totalCount) + '}',
						top: '25%',
						left: 'center',
						textStyle: {
							rich: {
								name: {
									fontSize: 12,
									fontWeight: 'normal',
									color: '#8FFFEA',
									padding: [10, 0],
								},
								val: {
									fontSize: 20,
									fontWeight: 'bold',
									color: '#00E4FF',
								},
							},
						},
					},
				],
				tooltip: {
					show: true,
					trigger: 'item',
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
					bottom: '10%',
					left: '6%',
					right: '12%',
					type: 'scroll',
					textStyle: {
						color: '#A8DFFF',
						fontSize: 12,
					},
					itemWidth: 12,
					itemHeight: 5,
				},
				grid: {
					left: '0%',
					top: '0%',
					containLabel: true,
				},
				series: [
					{
						type: 'pie',
						radius: ['46%', '60%'],
						center: ['50%', '39%'],
						data: echartData,
						emphasis: { scale: false },
						// hoverAnimation: false,
						labelLine: {
							length: 0,
							length2: 0,
						},
						label: {
							formatter: '{d}%',
							fontSize: 12,
							color: '#5399AF',
						},
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
