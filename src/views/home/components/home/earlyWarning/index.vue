<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 预警分布环比
****************************************-->
<template>
	<ChartBox type="early" style="width: 360px; height: 253px">
		<div class="chart" ref="lineChart"></div>
		<div class="detail-box" @click="openServeList"></div>
	</ChartBox>
</template>
<script lang="ts">
import ChartBox from '@components/chartBoxOne/main.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { EChartsOption, ECharts, EChartOption } from 'echarts';
import { dynamic, initChart, getInstance } from '@/serve/echartsCommon';
import { apiWarningCategory } from '@/api/home';

export default defineComponent({
	name: 'earlyWarning',
	components: { ChartBox },
	setup(_, { emit }) {
		let timer: NodeJS.Timer | null = null;
		let lineChart = ref(null);
		let chart: ECharts | null = null;
		let zoomLoop: any = null;
		let echartData: any = [];
		const instance = getInstance();
		const init = async () => {
			await getData();
			chart = await initChart(chart, lineChart, instance);
			chartAnim();
		};

		onMounted(() => {
			init();
		});
		// 获取数据
		const getData = async () => {
			await apiWarningCategory().then(res => {
				let data = res.data.percentage;
				echartData = data.map((item: any) => {
					return {
						name: item.type,
						value: item.value,
					};
				});
			});
		};

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart?.clear();
			let _option = getOption();
			chart?.setOption(_option as EChartOption);
			dynamic(timer, chart, _option as EChartsOption, 5000);
		};

		const formatNumber = (num: any) => {
			let reg = /(?=(\B)(\d{3})+$)/g;
			return num.toString().replace(reg, ',');
		};
		let total = echartData.reduce((a: any, b: any) => {
			return a + b.value * 1;
		}, 0);

		const getOption = () => {
			let color = [
				'#00E4FF',
				'#0B9AA8',
				'#00BDFF',
				'#7DF5FF',
				'#FFFFFF',
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
					axisPointer: { type: 'shadow' },
				},
				legend: {
					show: false,
					bottom: '10%',
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
						center: ['50%', '45%'],
						data: echartData,
						// hoverAnimation: false,
						labelLine: {
							length: 5,
							length2: 10,
						},
						label: {
							formatter: '{name|{b}}\n{d}%',
							fontSize: 14,
							color: '#00E4FF',
							rich: {
								name: {
									fontSize: 12,
									padding: [0, 0, 4, 0],
									color: '#A8DFFF',
								},
								prent: {
									fontSize: 14,
									color: '#00E4FF',
								},
							},
						},
					},
				],
			};
			return option;
		};
		const openServeList = () => {
			emit('openServeList', true);
		};
		return { openServeList, lineChart };
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
