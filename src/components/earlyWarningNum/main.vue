<template>
	<div class="early-num-box">
		<div class="icon"></div>
		<div class="info">
			<div>
				<div class="title">{{ title }}预警</div>
				<div class="num">{{ num }}</div>
			</div>
			<div class="compare">
				<div class="label">{{ des }}</div>
				<div class="value down">{{ percent }}%</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
// 预警数据展示
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'earlyWarningNum',
	props: {
		title: {
			type: String,
			default: '昨日',
		},
		num: {
			type: Number || String,
			default: 0,
		},
		des: {
			type: String,
			default: '同比昨日',
		},
		percent: {
			type: Number || String,
			default: 0,
		},
	},
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
		padding: 5px 5px 8px 10px;
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
			font-size: 26px;
			font-family: ElectronicFont;
			font-weight: bold;
			color: #00e4ff;
		}
		.compare {
			display: flex;
			align-items: flex-end;
			align-self: flex-end;
			.label {
				font-size: 10px;
				font-weight: 500;
				color: #536f72;
			}
			.value {
				&::before {
					content: '.';
					color: transparent;
					width: 10px;
					height: 10px;
					position: relative;
					left: -5px;
					font-size: 14px;
					font-weight: 400;
				}
				&.down::before {
					background: gold;
				}
				&.up::before {
					background: gold;
				}
				padding-left: 10px;
				top: 2px;
				position: relative;
				font-size: 16px;
				font-weight: 600;
				color: #ffffff;
			}
		}
	}
}
</style>
