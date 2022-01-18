<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	ComponentInternalInstance,
	onMounted,
	reactive,
	ref,
} from 'vue';
import ChartBox from '@components/chartBoxThree/main.vue';
import scrollList from './scroll-list.vue';
import { apiWarningList } from '@/api/serverList';
export default defineComponent({
	name: 'home',
	components: { scrollList, ChartBox },
	setup(props, { emit }) {
		let data = ref([] as any[]);
		let scrollList = ref(null);
		let config = ref({
			header: {
				data: ['排名', '应用', '占比', '周环比'],
				height: 36,
				color: '#5399AF',
				borderColor: '#7DF5FF',
				borderSize: 1,
				background: '#004E5D',
			},
			doubleBg: '#073039',
			data: data,
			pageSize: 5,
		});
		const selectItem = (id: string, rowIndex: number, colIndex: number) => {
			console.log(id, rowIndex, colIndex);
		};
		data.value = [
			{
				id: '1',
				value: [
					`<div class="row-icon">1</div>`,
					'redis',
					`<div class="mix">
							<span class="tx">100%</span>
							<div class="progress">
								<div style="width: 35%"></div>
							</div>
						</div>`,
					`<div class="ratio">
							<div class="tx">33%</div>
							<div class="up down"></div>
						</div>`,
				],
			},
			{
				id: '2',
				value: [
					`<div class="row-icon">1</div>`,
					'redis',
					`<div class="mix">
							<span class="tx">100%</span>
							<div class="progress">
								<div style="width: 35%"></div>
							</div>
						</div>`,
					`<div class="ratio">
							<div class="tx">33%</div>
							<div class="up down"></div>
						</div>`,
				],
			},
			{
				id: '3',
				value: [
					`<div class="row-icon">1</div>`,
					'redis',
					`<div class="mix">
							<span class="tx">100%</span>
							<div class="progress">
								<div style="width: 35%"></div>
							</div>
						</div>`,
					`<div class="ratio">
							<div class="tx">33%</div>
							<div class="up down"></div>
						</div>`,
				],
			},
			{
				id: '4',
				value: [
					`<div class="row-icon">1</div>`,
					'redis',
					`<div class="mix">
							<span class="tx">100%</span>
							<div class="progress">
								<div style="width: 35%"></div>
							</div>
						</div>`,
					`<div class="ratio">
							<div class="tx">33%</div>
							<div class="up down"></div>
						</div>`,
				],
			},
			{ id: '5', value: [`<div class="row-icon">5</div>`, 2, 3, 4] },
			{ id: '6', value: [`<div class="row-icon">6</div>`, 2, 3, 4] },
			{ id: '7', value: [`<div class="row-icon">7</div>`, 2, 3, 4] },
			{ id: '8', value: [`<div class="row-icon">8</div>`, 2, 3, 4] },
			{ id: '9', value: [9, 2, 3, 4] },
			{ id: '10', value: [10, 2, 3, 4] },
			{ id: '11', value: [11, 2, 3, 4] },
			{ id: '12', value: [12, 2, 3, 4] },
		];

		let { proxy } = getCurrentInstance() as ComponentInternalInstance;

		onMounted(() => {
			getData();
			// (proxy?.$echarts as any).init();
		});

		const closeServerListPage = () => {
			emit('closeServerPage', '关闭服务器列表弹窗');
		};
		// 获取数据
		const getData = () => {};

		return {
			config,
			closeServerListPage,
		};
	},
});
</script>

<template>
	<ChartBox type="performance" style="width: 410px; height: 303px">
		<div class="header">
			<div class="item selected">CPU</div>
			<div class="item unselect">内存</div>
			<div class="item unselect">ID读写</div>
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
