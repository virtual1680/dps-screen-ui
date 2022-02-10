<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 预警异常
****************************************-->
<template>
	<ChartBox type="earlyError" style="width: 360px; height: 253px">
		<div class="chart" ref="lineChart"></div>
		<div class="detail-box" @click="openServeList"></div>
	</ChartBox>
</template>
<script lang="ts">
import ChartBox from '@components/chartBoxOne/main.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { EChartsOption, ECharts } from 'echarts';
import { initChart, getInstance, dynamic } from '@/serve/echartsCommon';
import { apiErrorCategory } from '@/api/home';

export default defineComponent({
	name: 'warningAbnormal',
	components: { ChartBox },

	setup(_, { emit }) {
		let timer: NodeJS.Timer | null = null;
		let lineChart = ref(null);
		const instance = getInstance();
		let chart: ECharts;
		let zoomLoop: any = null;
		let echartData: any = {};

		const init = async () => {
			let [error] = await getData();
			if (error) {
				return false;
			}
			chart = initChart(chart, lineChart, instance);
			chartAnim();
		};

		onMounted(() => {
			init();
		});
		// 获取数据
		const getData = () => {
			return apiErrorCategory()
				.then(res => {
					echartData = res.data;
					return [null];
				})
				.catch(() => {
					return [true];
				});
		};

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart?.clear();
			let _option = getOption();
			chart?.setOption(_option as any);
			dynamic(timer, chart, _option as EChartsOption, 5000);
		};

		const formatNumber = (num: any) => {
			let reg = /(?=(\B)(\d{3})+$)/g;
			return num.toString().replace(reg, ',');
		};

		const getOption = () => {
			let total = echartData.alarmNum + echartData.exceptNum + echartData.normalNum;
			let seriesData = [
				{ name: '预警台数', value: echartData.alarmNum },
				{ name: '异常台数', value: echartData.exceptNum },
				{ name: '正常台数', value: echartData.normalNum },
			];
			let color = [
				'#00E4FF',
				'#0B9AA8',
				'#FF8D44',
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
						text: '{name|总量}\n{val|' + formatNumber(total) + '}',
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
				},
				legend: {
					bottom: '12%',
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
						center: ['51%', '41%'],
						data: seriesData,
						// hoverAnimation: false,
						labelLine: {
							length: 5,
							length2: 5,
						},
						label: {
							formatter: '{d}%',
							fontSize: 12,
							color: '#A8DFFF',
						},
					},
				],
			};
			return option;
		};
		const openServeList = () => {
			emit('openServeList', true);
		};
		return {
			openServeList,
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
.chart-one-box:deep(.content) {
	position: relative;
}
.detail-box {
	width: 80px;
	height: 30px;
	left: 50%;
	margin-left: -40px;
	background: transparent;
	position: absolute;
	bottom: 0;
	cursor: pointer;
}
</style>
