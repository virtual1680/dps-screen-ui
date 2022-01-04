<template>
	<div class="early-num-box">
		<div class="icon"></div>
		<div class="info">
			<div class="title">昨日预警</div>
			<div class="num">1420</div>
			<div class="compare">
				<div class="label">同比昨日</div>
				<div class="value">26%</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
// 预警数据展示
import { defineComponent } from 'vue';
import HelloWorld from '@components/HelloWorld.vue';
export default defineComponent({
	name: 'earlyWarningNum',
	components: { HelloWorld },
	setup() {},
});
</script>
<style lang="scss" scoped>
.early-num-box {
	width: 100%;
	height: 100%;
	background: red;
	display: flex;
	.icon {
		margin: 8px;
		flex-shrink: 0;
		align-self: center;
		width: 40px;
		height: 40px;
		background: green;
	}
	.info {
		padding: 5px 5px 10px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		filter: blur(0.5px);
		.title {
			height: 17px;
			font-size: 12px;
			font-weight: 400;
			color: #a8dfff;
			line-height: 17px;
		}
		.num {
			height: 24px;
			font-size: 24px;
			font-weight: bold;
			color: #00e4ff;
			line-height: 24px;
		}
		.compare {
			display: flex;
			align-items: center;
			span {
				display: inline-block;
			}
			.label {
				font-size: 10px;
				font-weight: 500;
				color: #536f72;
				line-height: 14px;
			}
			.value {
				font-size: 14px;
				font-weight: 500;
				color: #ffffff;
				line-height: 20px;
			}
		}
	}
}
</style>
