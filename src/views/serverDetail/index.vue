<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue';
import diskUsage from './components/diskUsage.vue';
import cpuUsage from './components/cpuUsage.vue';
import performance from './components/performance.vue';
import memoryUsage from './components/memoryUsage.vue';
import read from './components/read.vue';

import broadband from './components/broadband.vue';
import ecs from './components/ecs.vue';
import iops from './components/iops.vue';
import disk from './components/disk.vue';
import { apiServerInfo } from '@/api/serverDetail';
export default defineComponent({
	name: 'serverDetail',
	components: {
		diskUsage,
		cpuUsage,
		performance,
		memoryUsage,
		read,
		broadband,
		ecs,
		iops,
		disk,
	},
	props: {
		ip: { type: String, default: '' },
	},
	setup(props, { emit }) {
		let data = reactive({
			performance: {},
			usage: {},
			ecs: {},
			internet: {},
			iops: {},
			disk: {},
			diskUsage: '0',
			memoryUsage: '0',
			cpuUsage: '0',
		});
		watch(
			() => props.ip,
			n => {
				if (n) {
					let [ip, publicIp] = n.split(',');
					loadData(ip, publicIp);
				}
			},
		);
		const loadData = (ip: string, publicIp: string) => {
			let params = { provider: '', publicIp, ip };
			apiServerInfo(params).then(res => {
				const title = res.data.date;
				//进程占比
				data.performance = res.data.process;
				//当前进程
				data.usage = { list: res.data.usage, title };
				//ecs 连接数
				data.ecs = { list: res.data.esConnectNum, title };
				// 内网宽带
				data.internet = { list: res.data.internet, title };
				//实例IOPS
				data.iops = { list: res.data.cloudDiskIOPS, title };
				//磁盘读写
				data.disk = { list: res.data.cloudDisk, title };
				//磁盘使用
				data.diskUsage = res.data.diskUsageNow;
				//内存使用
				data.memoryUsage = res.data.memoryUsageNow;
				//cpu使用
				data.cpuUsage = res.data.cpuUsageNow;
			});
		};
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
					<diskUsage :data="data.diskUsage" />
					<cpuUsage :data="data.cpuUsage" />
				</div>
				<div class="left-item flex-jc-cb">
					<performance :data="data.performance" />
					<memoryUsage :data="data.memoryUsage" />
				</div>
				<div class="left-item">
					<read :data="data.usage" />
				</div>
			</div>
			<div class="right_box flex-jc-cb flex-d-c">
				<div class="right-item flex-jc-cb">
					<broadband :data="data.internet" />
					<iops :data="data.iops" />
				</div>
				<div class="right-item flex-jc-cb">
					<ecs :data="data.ecs" />
					<disk :data="data.disk" />
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
