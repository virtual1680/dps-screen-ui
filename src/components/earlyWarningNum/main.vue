<template>
	<div class="early-num-box">
		<div class="icon"><img :src="data.get(`${type}`).icon" alt="" /></div>
		<div class="info">
			<div>
				<div class="title">{{ data.get(`${type}`).name }}预警</div>
				<div class="num">{{ num.value }}</div>
			</div>
			<div class="compare">
				<div class="label">{{ data.get(`${type}`).des }}</div>
				<div class="value">
					<img :src="compare[num.trend == 0 ? 'up' : 'down']" alt="" />
					{{ num.rangeValue }}
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
// 预警数据展示
import { defineComponent, reactive } from 'vue';
enum EarlyType {
	yesterday = 'yesterday',
	today = 'today',
	week = 'week',
	month = 'month',
}
export default defineComponent({
	name: 'earlyWarningNum',
	props: {
		num: {
			type: Object,
			default: {
				value: 0,
			},
		},
		type: {
			type: String,
			default: EarlyType.yesterday,
		},
	},
	setup() {
		let data = new Map();
		data.set('yesterday', {
			name: '昨日',
			icon: new URL('./img/yesterday.png', import.meta.url).href,
			des: '同比昨日',
		});
		data.set('today', {
			name: '今日',
			icon: new URL('./img/day.png', import.meta.url).href,
			des: '同比昨日',
		});
		data.set('week', {
			name: '本周',
			icon: new URL('./img/week.png', import.meta.url).href,
			des: '同比上周',
		});
		data.set('month', {
			name: '本月',
			icon: new URL('./img/month.png', import.meta.url).href,
			des: '同比上月',
		});
		let compare = reactive({
			up: new URL('./img/up.png', import.meta.url).href,
			down: new URL('./img/down.png', import.meta.url).href,
		});

		return { data, compare };
	},
});
</script>
<style lang="scss" scoped>
.early-num-box {
	width: 100%;
	height: 100%;
	background: red;
	display: flex;
	background: url('./img/bg.png') no-repeat;
	background-size: 100% 100%;
	.icon {
		margin: 8px;
		flex-shrink: 0;
		align-self: center;
		width: 48px;
		height: 48px;
		img {
			width: 100%;
		}
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
			letter-spacing: 2px;
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
				flex-shrink: 0;
				font-size: 10px;
				font-weight: 500;
				color: #536f72;
			}
			.value {
				display: flex;
				align-items: center;
				img {
					margin: 0 3px;
					width: 6px;
					height: 11px;
					font-size: 10px;
					font-weight: 400;
				}
				top: 2px;
				position: relative;
				font-size: 14px;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}
}
</style>
