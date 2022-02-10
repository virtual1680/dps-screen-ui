<template>
	<div class="chart-box">
		<div class="header">
			<div class="title">服务器分类</div>
			<div class="detail" @click="openServeList">详情</div>
		</div>
		<div class="content">
			<chart />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import chart from './chart/index.vue';
export default defineComponent({
	name: 'serveSource',
	components: { chart },
	setup(_, { emit }) {
		const openServeList = () => {
			emit('openServeList', true);
		};
		return { openServeList };
	},
});
</script>
<style lang="scss" scoped>
.chart-box {
	width: 100%;
	height: 100%;
	.header {
		height: 32px;
		background: url('./img/title-bg.png') no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
		.title {
			margin: 3px 0 0 20px;
			font-size: 14px;
			font-weight: 600;
			color: #00e4ff;
			letter-spacing: 1px;
		}
		.detail {
			margin: 3px 10px 0 0;
			letter-spacing: 2px;
			font-size: 12px;
			font-weight: 400;
			color: #ffffff;
			cursor: pointer;
		}
	}
	.content {
		height: 310px;
		background: url('./img/content-bg.png') no-repeat;
		background-size: 100% 100%;
	}
}
</style>
