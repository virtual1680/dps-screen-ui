<template>
	<div
		class="census-box"
		:style="`background:url(${mapData.get(`${type}`).bg}) no-repeat;background-size:100% 100%;`">
		<div class="content">
			<div class="info">
				<div class="title">{{ mapData.get(`${type}`).name }}</div>
				<div class="num">{{ num }}</div>
			</div>
			<div v-if="type === 'workOrder'" class="info">
				<div class="title">{{ mapData.get(`${type}`).name1 }}</div>
				<div class="num">{{ nums }}</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
// 统计数据展示
import { defineComponent, reactive, ref, onMounted } from 'vue';
enum CensusType {
	serve = 'serve',
	deviceOn = 'deviceOn',
	deviceOff = 'deviceOff',
	workOrder = 'workOrder',
}
export default defineComponent({
	name: 'censusNum',
	props: {
		num: {
			type: Number || String,
			default: 0,
		},
		nums: {
			type: Number || String,
			default: 0,
		},
		type: {
			type: String,
			default: CensusType.serve,
		},
	},
	setup(props) {
		let mapData = new Map();
		mapData.set('serve', {
			name: '服务器数量',
			bg: new URL('./img/serve.png', import.meta.url).href,
		});
		mapData.set('deviceOn', {
			name: '设备在线数',
			bg: new URL('./img/device-z.png', import.meta.url).href,
		});
		mapData.set('deviceOff', {
			name: '设备离线数',
			bg: new URL('./img/device-l.png', import.meta.url).href,
		});
		mapData.set('workOrder', {
			name: '今日工单',
			name1: '昨日工单',
			bg: new URL('./img/work.png', import.meta.url).href,
		});
		let layout = ref('center');
		let infoWidth = ref('auto');
		let infoMargin = ref('0');
		onMounted(() => {
			if (props.type === 'workOrder') {
				layout.value = 'space-around';
				infoWidth.value = '80px';
				infoMargin.value = '-30px';
			}
		});
		return { layout, infoWidth, infoMargin, mapData };
	},
});
</script>
<style lang="scss" scoped>
.census-box {
	width: 100%;
	height: 100%;
	.content {
		display: flex;
		justify-content: v-bind(layout);
		&:first-child {
			margin-left: v-bind(infoMargin);
		}
		.info {
			width: v-bind(infoWidth);
			padding: 8px 0 0 10px;
			.title {
				height: 17px;
				font-size: 12px;
				font-weight: 400;
				color: #a8dfff;
				line-height: 17px;
				letter-spacing: 2px;
			}
			.num {
				font-size: 24px;
				font-family: ElectronicFont;
				font-weight: bold;
				color: #00e4ff;
			}
		}
	}
}
</style>
