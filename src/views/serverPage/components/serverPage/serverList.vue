<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { apiServerList } from '@/api/serverList';
export default defineComponent({
	name: 'serverList',
	components: {},
	setup(_, { emit }) {
		let data = reactive({
			tableData: [],
			params: {
				startIndex: 1,
				queryNum: 50,
			},
			loading: true,
		});
		const getLeftList = async () => {
			await apiServerList(data.params).then((res: any) => {
				let result = res.data;
				if (data.params.startIndex === 1) {
					data.tableData = result;
				} else {
					data.tableData = data.tableData.concat(result);
				}
				data.loading = result.length > 0 ? true : false;
			});
		};

		onMounted(() => {
			// 获取数据
			getLeftList();
		});
		const loadMore = () => {
			if (data.loading) {
				data.loading = false;
				data.params.startIndex += 1;
				getLeftList();
			}
		};
		const closeServerListPage = () => {
			emit('closeServerPage', '关闭服务器列表弹窗');
		};

		return {
			data,
			loadMore,
			closeServerListPage,
		};
	},
});
</script>

<template>
	<el-table
		v-loadmore="loadMore"
		:header-cell-style="{
			backgroundColor: 'transparent',
			textAlign: 'center',
			color: '#FFFFFF',
			borderBottom: '10px solid #021E29',
		}"
		:header-row-style="{
			backgroundColor: '#073039',
			boxShadow: '0px 1px 0px 0px #00688C',
		}"
		:cell-style="{
			backgroundColor: 'transparent',
			textAlign: 'center',
			color: 'rgba(255, 255, 255, .7)',
			borderBottom: '10px solid #021E29',
		}"
		:row-style="{
			backgroundColor: '#072E36',
		}"
		row-class-name="sad"
		:data="data.tableData"
		height="880"
		style="width: 100%">
		<el-table-column prop="serverName" width="180" :show-overflow-tooltip="true" label="项目">
			<template #default="scope">
				<span class="row_icon">{{ scope.row.serverName }}</span>
			</template>
		</el-table-column>
		<el-table-column prop="ip" :show-overflow-tooltip="true" label="IP地址"></el-table-column>
		<el-table-column prop="publicIp" :show-overflow-tooltip="true" label="公网IP"></el-table-column>
		<el-table-column prop="config" :show-overflow-tooltip="true" label="配置"></el-table-column>
		<el-table-column prop="cpu" :show-overflow-tooltip="true" label="cpu占用"></el-table-column>
		<el-table-column prop="memory" :show-overflow-tooltip="true" label="内存占用"></el-table-column>
		<el-table-column prop="disk" :show-overflow-tooltip="true" label="硬盘"></el-table-column>
		<el-table-column prop="provider" :show-overflow-tooltip="true" label="供应商"></el-table-column>
	</el-table>
</template>

<style lang="scss" scoped>
.row_icon {
	display: inline-block;
	min-width: 100%;
	background-image: url('../../../../assets/serverList/row_icon.png');
	background-repeat: no-repeat;
	background-position: left center;
	padding-left: 45px;
	min-height: 36px;
	line-height: 36px;
	color: rgba(0, 228, 255, 1);
	// white-space: nowrap;
}
</style>
