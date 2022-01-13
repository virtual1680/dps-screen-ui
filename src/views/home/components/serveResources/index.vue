<template>
  <ServeSource style="width: 360px; height: 250px">
		<div class="chart" ref="lineChart"></div>
	</ServeSource>
</template>
<script lang="ts">
// 服务器
import ServeSource from '../serveSource/index.vue';
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

import {apiServerNope} from "@/api/home"

export default defineComponent({
	name: 'serveResources',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: { ServeSource },
	setup(props) {
		let lineChart = ref(null);
		let timer:any = null
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
		let option: object = {};
		let dataZoomLength = 7;
		let dataZoomTime = 3000;
		let zoomLoop: any = null;
		let xAxisData: any = [];

    let echartData:any = [];



		const initChart = () => {
			//使用主题初始化
			let dom = lineChart.value;
			chart = proxy.$echarts.init(dom);
		};
		const init = async () => {
      await getData()
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
    const getData = async ()=>{
      await apiServerNope().then(res=>{
				let data = res.data
				echartData = data.map((item:any)=>{
					return{
						name:item.type,
						value:item.value
					}
				})
      })
    }




		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
		};
		const getOption = () => {
			let color = [
				'#00E4FF','#0B9AA8','#00BDFF','#FFFFFF','#7DF5FF',
				'#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'
			];
			let option = {
        color: color,
				tooltip: {
					show: false,
					trigger: 'item',
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
					top: '1%',
					show:false,
				},
				grid: {
					left: '2%',
					right: '2%',
					bottom: '2%',
					top: '2%',
					containLabel: true,
					// backgroundColor: "rgba(0,0,0,0.2)",
					// borderWidth: 0
				},
				title: [{
						text: '75%',
						left: '50%',
						top: '42%',
						textAlign: 'center',
						textStyle: {
								fontSize: 32,
								fontWeight: '600',
								color: '#00E4FF',
								textAlign: 'center',
						},
				}, {
						text: '服务器资源剩余',
						x: '50%',
						y: '30%',
						textAlign: 'center',
						textStyle: {
							fontSize: 14,
							fontWeight: '400',
							color: '#fff',
							textAlign: 'center',
							textShadow: '0px 1px 3px rgba(143, 255, 234, 0.5)'
						},
				},],
				polar: {
						radius: ['66%', '61%'],
						center: ['50%', '47%'],
				},
				angleAxis: {
						max: 100,
						show: false,
						startAngle: 90,
				},
				radiusAxis: {
						type: 'category',
						show: true,
						inverse:true,
						axisLabel: {
								show: false,
						},
						axisLine: {
								show: false,

						},
						axisTick: {
								show: false
						},
				},

				series: [{
						name: '',
						type: 'bar',
						roundCap: true,
						barWidth: 60,
						showBackground: true,
						backgroundStyle: {
								color: 'rgba(0,0,0,0)',
						},
						data: [75],
						coordinateSystem: 'polar',
						itemStyle: {
								normal: {
										color: new proxy.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
												offset: 0,
												color: '#0ff'
										}, {
												offset: 1,
												color: '#02aeff'
										}]),
								}
						}
					},
				]
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
