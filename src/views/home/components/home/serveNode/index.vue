<template>
	<ChartBox type="serve" style="width: 360px; height: 250px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 服务器节点分布
import ChartBox from '@components/chartBoxOne/main.vue';
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue';
import { EChartsOption } from 'echarts';
import { dynamic } from '@/serve/echartsCommon';
import { apiServerNope } from '@/api/home';

export default defineComponent({
	name: 'serverNode',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: { ChartBox },
	setup() {
		let lineChart = ref(null);
		let timer: NodeJS.Timer;
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
		let zoomLoop: any = null;

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
			await apiServerNope().then(res => {
				let data = res.data;

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
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
			dynamic(timer, chart, _option as EChartsOption, 5000);
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
				},
				legend: {
					top: '1%',
					show: false,
				},
				grid: {
					left: '2%',
					right: '2%',
					bottom: '2%',
					top: '2%',
					containLabel: true,
				},

				series: [
					{
						name: '',
						type: 'pie',
						radius: '50%',
						data: echartData,
						label: {
							formatter: '{name|{b}}\n{prent|{d}}%',
							fontSize: 12,
							color: '#5399AF',
							rich: {
								name: {
									fontSize: 12,
									color: '#A8DFFF',
								},
								prent: {
									fontSize: 14,
									color: '#00E4FF',
								},
							},
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
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
