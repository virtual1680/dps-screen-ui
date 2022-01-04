<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: 工单状态
****************************************-->
<template>
  <div class="chart-box" ref="lineChart"></div>
</template>
<script lang="ts">
// 工单状态
import { defineComponent, onMounted ,reactive,ref,getCurrentInstance,ComponentInternalInstance} from 'vue';
export default defineComponent({
	name: 'panelTitle',
	props: { 
    content: String ,
    chartData:{
        type:Array,
        default:()=>[]
    }
  },
	components: { 
		
	 },
  mounted(){

  },
	setup() {
    let  lineChart = ref(null)
    let { proxy } = getCurrentInstance() as ComponentInternalInstance
    const state = reactive({
      chart: null,
      option: {},
  
      dataZoomLength:15,
      dataZoomTime:3000,                
      zoomLoop:null,
      xAxisData:[],
    })

    onMounted(()=>{
        init()
        window.addEventListener('resize', function () {
        // 让我们的图表调用 resize这个方法
            // state.chart && state.chart.resize();
        });

    })
    const init = ()=>{
      initChart()
      // chartAnim()
    }
    const initChart = ()=>{
        //使用主题初始化
        let dom = lineChart.value;
        state.chart =  proxy?.$echarts.init(dom);
    }
    return{
      lineChart
    }
	},
});
</script>
<style lang="scss" scoped>
  .title{
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #00E4FF;
  }
</style>
