<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 工单状态
****************************************-->
<template>
  <ChartBoxTwo type="workData" style="height: 100%; width: 100%">
    <div class="chart" ref="lineChart"></div>
  </ChartBoxTwo>
</template>
<script lang="ts">
// 工单状态
import ChartBoxTwo from '@components/chartBoxTwo/main.vue';
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs,watch } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

import {apiOrderTypeTrend} from "@/api/home"

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
		let timer:any = null
		let lineChart = ref(null);
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
		
		watch(
			()=>props.chartData,
			(newVal,oldVal)=>{

			}
		)

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
      await apiOrderTypeTrend().then(res=>{
				let data = res.data
				echartData = data
				console.log("))))))",echartData)
      })
    }

		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
			// updateChart(_option as EChartsOption);
      dynamic(chart, _option as EChartsOption,5000);
		};


		
		const getOption = () => {
			let _areaColor = [
				'rgba(11, 154, 168,', 
				'rgba(0, 228, 255,', 
				'rgba(255, 141, 68,',
				'rgba(241, 94, 94, ',
				'rgba(51, 63, 255,',
				'rgba(255, 225, 255,',
				'rgba(255, 255, 255,'];
			 xAxisData = echartData.date

			let _seriesData: any = [];
			
			echartData.list.forEach((list:any,k:number) => {
				_seriesData.push({
						name: list.name,
						type: 'line',
						symbol: 'none',
						itemStyle: {
							color: _areaColor[k]+'1)',
							lineStyle: {
									color: _areaColor[k]+'1)',
									width: 2,
							},
							areaStyle: {
									//区域填充样式
									color: new proxy.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
											{
													offset: 0,
													color: _areaColor[k]+' 0.1)',
											},
											{
													offset: 1,
													color: _areaColor[k]+'0.5)',
											},
									]),
							},
						},
						data: list.item,
				})
			})


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
					axisPointer:{
						type:"shadow",
					}
					// formatter: function (params){}
				},
				legend: {
					// data: legendData, //['ff', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					top: '5%',
					textStyle:{
						color:"#A8DFFF"
					}

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
						textStyle: {
							color: '#A8DFFF', //更改坐标轴文字颜色
							fontSize: 14, //更改坐标轴文字大小
						},
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
    const dynamic = (chart, op:EChartsOption, sec:number)=>{
			op.currentIndex = -1;
			const fn = () => {
					let dataLen = op.series[0].data.length;
					if (dataLen <= 0) return;
					// 取消之前高亮的图形
					chart.dispatchAction({
						type: "downplay",
						seriesIndex: 0,
						dataIndex: op.currentIndex,
					});
					op.currentIndex = (op.currentIndex + 1) % dataLen;
					// 高亮当前图形
					chart.dispatchAction({
						type: "highlight",
						seriesIndex: 0,
						dataIndex: op.currentIndex,
					});
					// 显示 tooltip
					chart.dispatchAction({
						type: "showTip",
						seriesIndex: 0,
						dataIndex: op.currentIndex,
					});
					timer && clearTimeout(timer);
					timer = setTimeout(fn, sec);
			};
      timer = setTimeout(fn, sec);
    }

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
