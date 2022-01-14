<template>
  <ChartBox type="workOrder" style="width: 360px; height: 255px">
		<div class="chart" ref="lineChart"></div>
	</ChartBox>
</template>
<script lang="ts">
// 工单故障
import ChartBox from '@components/chartBoxOne/main.vue';
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

import {apiOrderStatus} from "@/api/home"

export default defineComponent({
	name: 'workOrderAbbormal',
	props: {
		content: String,
		chartData: {
			type: Array,
			default: () => [],
		},
	},
	components: { ChartBox },
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

		let total:number = 0 


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
      await apiOrderStatus().then(res=>{
				let data = res.data
				echartData = data.map((item:any)=>{
					return{
						name:item.type,
						value:item.value
					}
				})

				sum()
      })
    }

		const sum = ()=>{
			total =  echartData.map((item:any)=>item.value).reduce((total:number,num:number)=>{
					return total*1 + num*1
			})

		}

		const computePercent = (name:string)=>{
				let num:number = echartData.filter((item:any)=>item.name == name)[0].value || 0
				return (num/total *100).toFixed(2)
		}


		const chartAnim = () => {
			zoomLoop && clearTimeout(zoomLoop);
			chart.clear();
			let _option = getOption();
			chart.setOption(_option);
      dynamic(chart, _option as EChartsOption,5000);
		};
		const getOption = () => {
			let color = [
				'#00E4FF','#0B9AA8','#00BDFF','#FFFFFF','#7DF5FF',
				'#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'
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
					// formatter: function (params){}
				},
				legend: {
					top: 'center',
					right: '6%',
					orient: 'vertical' ,
					textStyle:{
						fontSize: 14,
						fontWeight: 400,
						color: '#00E4FF',
					},
					formatter:(name:string)=>{
						let percent = computePercent(name)
						return name +'   '+ percent+'%'
					}

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

				series: [
					{
						name: '',
						type: 'pie',
						radius: '50%',
						center:['30%','50%'],
						data: echartData,
            label: {
							show:false,
              formatter: '{name|{b}}\n{prent|{d}}%',
              fontSize:12,
              color:"#5399AF",
							rich: {
								name: {
									fontSize: 12,
									color: '#A8DFFF'
								},
								prent: {
									fontSize: 14,
									color: '#00E4FF'
								}
							}
            },
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};
			return option;
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
