<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	ComponentInternalInstance,
	onMounted,
	reactive,
} from 'vue';
import hardwareHealthy from './components/hardwareHealthy.vue';
import cpu from './components/cpu.vue';
import performance from './components/performance.vue';
import disk from './components/disk.vue';
import read from './components/read.vue';

import broadband from './components/broadband.vue';

export default defineComponent({
	name: 'serverDetail',
	components: {
		hardwareHealthy,
		cpu,
		performance,
		disk,
		read,
		broadband,
	},
	setup(props, { emit }) {
		let { proxy } = getCurrentInstance() as ComponentInternalInstance;

		let data = reactive({
			tableData: [],
		});

		onMounted(() => {
			// (proxy?.$echarts as any).init();
		});

		const closeServerListPage = () => {
			emit('closeServerPage', '关闭服务器列表弹窗');
		};

		return {
			data,
			closeServerListPage,
		};
	},
});
</script>

<template>
	<div class="serve_box">
		<div class="tool">
			<span @click="closeServerListPage">返回服务器列表</span>
		</div>
		<div class="list_container">
			<div class="left_box flex-jc-cb flex-d-c">
				<div class="left-item flex-jc-cb">
					<hardwareHealthy />
					<cpu />
				</div>
				<div class="left-item flex-jc-cb">
					<performance />
					<disk />
				</div>
				<div class="left-item">
					<read />
				</div>
			</div>
			<div class="right_box flex-jc-cb flex-d-c">
				<div class="right-item flex-jc-cb">
					<broadband />
					<broadband />
				</div>
				<div class="right-item flex-jc-cb">
					<broadband />
					<broadband />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.serve_box {
	width: 1920px;
	height: 1080px;
	padding: 22px;
	background: url('../../assets/server_list.png') no-repeat;
	background-size: contain;
	.tool {
		height: 32px;
		text-align: right;
		span {
			cursor: pointer;
			display: inline-block;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #00bdff;
			line-height: 90px;
			padding-right: 20px;
		}
	}
}
.list_container {
	display: flex;
	justify-content: space-between;
	height: calc(100% - 50px);
	padding: 0 20px;
	.left_box {
		width: 840px;
		height: 100%;
	}
	.right_box {
		margin-top: 37px;
		width: 978px;
		padding: 18px 20px;
		background: url('../../assets/serverDetail/right-bg.png');
		.fr_top {
			width: 716px;
			height: 465px;
			background: rgba(2, 30, 41, 0.9);
			padding: 0px 19px;
		}
		.fr_bot {
			margin-top: 20px;
			width: 716px;
			height: 479px;
			padding: 0px 19px;
			background: rgba(2, 30, 41, 0.9);
		}
	}
}
.title {
	font-size: 14px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #ffffff;
	height: 42px;
	line-height: 42px;
	padding-left: 45px;
	background-image: url('../../assets/serverList/title.png');
	background-repeat: no-repeat;
	background-position: left center;
}
.inner_box {
	width: 100%;
	height: calc(100% - 62px);
	padding: 10px;
	margin: 0 auto;
	border: 1px solid #063449;
}

.serve_box {
	.el-table {
		background-color: transparent;
		tr {
			background-color: #444 !important;
		}
	}
}
</style>
