<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, watch, ref } from 'vue';
import ChartBox from '@components/chartBoxThree/main.vue';
import scrollList from './scroll-list.vue';
interface ProcessItem {
	usage: string;
	name: string;
}
interface Process {
	cpuProcess: ProcessItem[];
	memoryProcess: ProcessItem[];
}
export default defineComponent({
	name: 'home',
	components: { scrollList, ChartBox },
	props: { data: Object },
	setup(props) {
		const { proxy } = getCurrentInstance() as ComponentInternalInstance;
		let dataList = ref([] as any[]);
		//cpuProcess memoryProcess
		let activated = ref('cpuProcess');
		let config = ref({
			header: {
				data: ['排名', '应用', '占比'],
				height: 36,
				color: '#5399AF',
				borderColor: '#7DF5FF',
				borderSize: 1,
				background: '#004E5D',
			},
			columnWidth: [80],
			doubleBg: '#073039',
			data: dataList,
			pageSize: 5,
		});
		watch(
			() => props.data,
			n => {
				const data = n as Process;
				loadChart(data.cpuProcess);
			},
		);
		//点击tab
		const clickTab = (e: Event) => {
			const target = e.target as EventTarget & { dataset: { tab: string } };
			if (target.dataset.tab) {
				activated.value = target.dataset.tab;
				const item = props.data as Process;
				//TODO
				if (activated.value === 'memoryProcess') {
					loadChart(item['memoryProcess']);
				} else {
					loadChart(item['cpuProcess']);
				}
			}
		};
		const loadChart = (data: any[]) => {
			dataList.value = data.map((item, index) => {
				return {
					id: index,
					value: [
						`<div class="row-icon">${index + 1}</div>`,
						item.name,
						`<div class="mix">
							<span class="tx">${item.cpuUsage}%</span>
							<div class="progress">
								<div style="width: 35%"></div>
							</div>
						</div>`,
					],
				};
			});
		};
		return {
			config,
			activated,
			clickTab,
		};
	},
});
</script>

<template>
	<ChartBox type="performance" style="width: 410px; height: 303px">
		<div class="header" @click="clickTab">
			<div
				class="item"
				:class="activated === 'cpuProcess' ? 'selected' : 'unselect'"
				data-tab="cpuProcess">
				CPU
			</div>
			<div
				class="item"
				:class="activated === 'memoryProcess' ? 'selected' : 'unselect'"
				data-tab="memoryProcess">
				内存
			</div>
		</div>
		<div style="height: 212px; width: 410px">
			<scrollList :config="config" ref="scrollList" />
		</div>
	</ChartBox>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	padding: 15px;
	font-size: 12px;
	.item {
		margin-right: 5px;
		width: 64px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		cursor: pointer;
		&.selected {
			background: url('../../../assets/serverDetail/selected.png') no-repeat;
			background-size: 100% 100%;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #ffffff;
		}
		&.unselect {
			background: url('../../../assets/serverDetail/unselect.png') no-repeat;
			background-size: 100% 100%;
			color: #8de6f8;
		}
	}
}
</style>
