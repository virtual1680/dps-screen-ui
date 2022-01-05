<script lang="ts">
import { defineComponent } from 'vue';
import screenHeader from '@components/header/index.vue';
import workOrderStatus from './components/workOrderStatus.vue';
import EarlyWarningNum from '@/components/earlyWarningNum/main.vue';
import ChartBox from '@components/chartBoxOne/main.vue';
export default defineComponent({
	name: 'home',
	components: {
		screenHeader,
		workOrderStatus,
		EarlyWarningNum,
		ChartBox,
	},
	setup() {},
});
</script>

<template>
	<div class="container">
		<screenHeader />
		<div class="content">
			<div class="left-container">
				<workOrderStatus style="height: 370px" />
			</div>
			<div class="right-container">
				<div class="early-list">
					<EarlyWarningNum type="yesterday" style="width: 172px; height: 83px" />
					<EarlyWarningNum type="today" style="width: 172px; height: 83px" />
					<EarlyWarningNum type="week" style="width: 172px; height: 83px" />
					<EarlyWarningNum type="month" style="width: 172px; height: 83px" />
				</div>
				<div class="early-chart">
					<ChartBox type="early" style="width: 360px; height: 253px"></ChartBox>
					<ChartBox type="earlyError" style="width: 360px; height: 253px"></ChartBox>
				</div>
				<div style="height: 280px; width: 100%; background: green"></div>
				<div style="height: 310px; width: 100%; background: green"></div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	height: 100%;
}
.content {
	display: flex;
	height: calc(100% - 80px);
	.left-container {
		width: 1165px;
		height: 100%;
		background: pink;
	}
	.right-container {
		width: 755px;
		height: 100%;
		background: yellow;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		.early-list {
			height: 83px;
			width: 100%;
			background: violet;
			display: flex;
			justify-content: space-between;
		}
		.early-chart {
			height: 253px;
			width: 100%;
			background: red;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
