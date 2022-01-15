<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, onMounted,reactive} from 'vue';
import {apiOrderList} from "@/api/serverList"
export default defineComponent({
	name: 'home',
	components: { 
	},
	setup(props,{emit}) {
		let data = reactive({
			tableData: [],
			params: {
				startIndex:0,
				queryNum:200,
			},

		})


		let { proxy } = getCurrentInstance() as ComponentInternalInstance;



		onMounted(() => {
			getData()
			// (proxy?.$echarts as any).init();
		});

		const closeServerListPage = ()=>{
			emit('closeServerPage','关闭服务器列表弹窗')
		}
    // 获取数据
    const getData =  ()=>{
			getLeftList()
    }
		const getLeftList = async()=>{
			
      await apiOrderList(data.params).then((res:any)=>{
				let result = res.data
				data.tableData = result
      })
		}


		return {
			data,
			closeServerListPage
		}
	},
});
</script>

<template>
	<el-table
		:header-cell-style="{
			backgroundColor:'transparent',
			textAlign:'center',
			color: '#FFFFFF',
			borderBottom:'10px solid #021E29',
		}"
		:header-row-style="{
			backgroundColor:'#073039',
			boxShadow: '0px 1px 0px 0px #00688C'		
		}"
		:cell-style="{
			backgroundColor:'transparent',
			textAlign:'center',
			color:'rgba(255, 255, 255, .7)',
			borderBottom:'10px solid #021E29'
		}"
		:row-style="{
			backgroundColor:'#072E36',
		}"
		row-class-name="sad"
		:data="data.tableData"
		height="395"
		style="width: 100%">
		<el-table-column
			prop="projectName"
			width="180"
			:show-overflow-tooltip="true"
			label="项目">
			<template #default="scope">
				<span class="row_icon">{{ scope.row.projectName }}</span>
			</template>
		</el-table-column>
		<el-table-column
			prop="type"
			:show-overflow-tooltip="true"
			label="问题类型">
		</el-table-column>
		<el-table-column
			prop="title"
			:show-overflow-tooltip="true"
			label="预警类型">
		</el-table-column>
		<el-table-column
			prop="name"
			:show-overflow-tooltip="true"
			label="处理人">
		</el-table-column>
		<el-table-column
			prop="createTime"
			:show-overflow-tooltip="true"
			label="创建时间">
		</el-table-column>
		<el-table-column
			prop="status"
			:show-overflow-tooltip="true"
			label="状态">
		</el-table-column>
	</el-table>

</template>

<style lang="scss" scoped>

	.row_icon{
		display: inline-block;
		min-width: 100%;
		background-image: url('../../../../assets/serverList/row_icon.png');
		background-repeat: no-repeat;
		background-position: left center;
		padding-left: 45px;
		min-height: 36px;
		line-height: 36px;
		color:rgba(0, 228, 255, 1);
		// white-space: nowrap;
	}
</style>
