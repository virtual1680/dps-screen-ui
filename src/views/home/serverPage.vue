<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, onMounted,reactive} from 'vue';
import serverList from './components/serverPage/serverList.vue';
import orderList from './components/serverPage/orderList.vue';
import warningList from './components/serverPage/warningList.vue';
export default defineComponent({
	name: 'home',
	components: { 
		serverList,
		orderList,
		warningList

	},
	setup(props,{emit}) {
		let { proxy } = getCurrentInstance() as ComponentInternalInstance;

		let data = reactive({
			tableData: []

		})


		onMounted(() => {
			// (proxy?.$echarts as any).init();
		});

		const closeServerListPage = ()=>{
			emit('closeServerPage','关闭服务器列表弹窗')
		}


		return {
			data,
			closeServerListPage
		}
	},
});
</script>

<template>
	<div class="serve_box">
		<div class="tool">
			<span  @click="closeServerListPage">返回服务器列表</span>
		</div>
		<div class="list_container">
			<div class="left_box">


				<div class="title">服务器列表</div>

				<div class="inner_box">
						<serverList/>
				</div>

			</div>
			<div class="right_box">
					<div class="fr_top">

						<div class="title">预警列表</div>

						<div class="inner_box">
								<warningList/>

						</div>

					</div>
					<div class="fr_bot">

						<div class="title">工单列表</div>

						<div class="inner_box">
								<orderList/>
						</div>

					</div>
			</div>
		</div>
	</div>

</template>

<style lang="scss" scoped>
.serve_box{
	width: 1920px;
	height: 1080px;
	padding:22px;
	background: url('../../assets/server_list.png') no-repeat;
	background-size: contain;
	.tool{
		height: 72px;
		text-align: right;
		span{
			cursor: pointer;
			display: inline-block;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #00BDFF;
			line-height: 90px;
			padding-right: 20px;
		}
	}
}
.list_container{
	display: flex;
	.left_box{
		width: 1032px;
		height: 964px;
		background: rgba(2, 30, 41, .9);
		padding:0px 19px;
	}
	.right_box{
		padding-left: 20px;
		.fr_top{
			width: 828px;
			height: 465px;
			background: rgba(2, 30, 41, .9);
			padding:0px 19px;
		}
		.fr_bot{
			margin-top: 20px;
			width: 828px;
			height: 479px;
			padding:0px 19px;
			background: rgba(2, 30, 41, .9);
		}

	}
}
.title{
	font-size: 14px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #FFFFFF;
	height: 42px;
	line-height: 42px;
	padding-left: 45px;
	background-image: url('../../assets/serverList/title.png');
	background-repeat: no-repeat;
	background-position: left center;
}
.inner_box{
	width: 100%;
	height: calc(100% - 62px);
	padding:10px;
	margin:0 auto;
	border: 1px solid #063449;
}

.serve_box{
	.el-table{
		background-color: transparent;
		tr{
			background-color: #444 !important;
		}
	}

}

</style>
