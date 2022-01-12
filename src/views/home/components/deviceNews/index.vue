<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 工单状态
****************************************-->
<template>
    <ChartBox type="device" style="width: 360px; height: 253px;">
    <div class="chart" ref="lineChart"></div>
  </ChartBox>
</template>
<script lang="ts">
import ChartBox from '@components/chartBoxOne/main.vue';
import { defineComponent, onMounted, reactive, ref, getCurrentInstance, toRefs,watch } from 'vue';
import { EChartsOption, DataZoomComponentOption } from 'echarts';

import {apiDeviceInfo} from "@/api/home"

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
		let lineChart = ref(null);
		let { proxy } = getCurrentInstance() as any;
		let chart: any = null;
		let option: object = {};
		let dataZoomLength = 7;
		let dataZoomTime = 3000;
		let zoomLoop: any = null;
		let xAxisData: any = [];

    let color = [
      '#00E4FF','#0B9AA8','#00BDFF','#FFFFFF','#7DF5FF',
      '#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'
      ];

    
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
      await apiDeviceInfo().then(res=>{
        console.log('res')
				let data = res.data.percentage
        console.log(res.data.percentage)
				echartData = data.map((item:any)=>{
					console.log(item)
					return{
						name:item.type,
						value:item.val
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
        
    const formatNumber = (num:any)=>{
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
    }
    let total = echartData.reduce((a, b:any) => {
        return a + b.value * 1
    }, 0);

		const getOption = () => {
      console.log(props.chartData)
			let _areaColor = ['#00C7E7', '#00D4D3', '#FFFFFF'];


        console.log(echartData)


			let _seriesData: any = [];

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
						fontSize: 18,
						color: '#FBFAFB',
					},
					axisPointer:{
						type:"shadow",
					}
					// formatter: function (params){}
				},
				legend: {
					// data: legendData, //['ff', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					bottom: '10%',
					textStyle:{
						color:"#A8DFFF",
            fontSize:12
					},
          itemWidth:12,
          itemHeight:5,
					// formatter: function (name:string){
          //   console.log(name)
          //   return name
          // }

				},
				grid: {
					left: '0%',
					top: '0%',
					containLabel: true,

					// backgroundColor: "rgba(0,0,0,0.2)",
					// borderWidth: 0
				},
        series: [{
            type: 'pie',
            radius: ['46%', '60%'],
            center: ['50%', '39%'],
            data: echartData,
            hoverAnimation: false,
            labelLine: {
              length: 0,
              length2: 0,
            },
            label: {
              formatter: '{d}%',
              fontSize:12,
              color:"#5399AF"
            },
        }],
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
