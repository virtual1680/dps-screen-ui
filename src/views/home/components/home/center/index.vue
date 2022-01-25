<template>
	<div class="chart-box">
		<div v-if="false" class="icon" @click="enlargeFun"><img src="./img/enlarge.png" alt="" /></div>
		<div class="content">
			<div @click="enlargeFun" class="box"></div>
			<iframe
				v-if="!enlarge"
				id="iframe"
				scrolling="no"
				src="http://122.9.154.184:8899/topology?type=index"
				frameborder="0"></iframe>
		</div>
		<teleport v-if="enlarge" to="body">
			<div class="center-enlarge">
				<div class="icon" @click="enlargeFun"><img src="./img/enlarge.png" alt="" /></div>
				<div class="top"></div>
				<div class="left"></div>
				<div class="right"></div>
				<div class="bottom"></div>
				<iframe
					id="iframe"
					scrolling="no"
					src="http://122.9.154.184:8899/topology?type=home"
					frameborder="0"></iframe>
			</div>
		</teleport>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
	name: 'serveSource',
	setup() {
		let enlarge = ref(false);
		const enlargeFun = () => {
			enlarge.value = !enlarge.value;
		};
		return { enlarge, enlargeFun };
	},
});
</script>
<style lang="scss" scoped>
.icon {
	position: absolute;
	z-index: 999;
	right: 1px;
	top: 1px;
	img {
		margin-top: 2px;
		margin-right: 2px;
		width: 25px;
		cursor: pointer;
	}
}
.chart-box {
	position: relative;
	width: 100%;
	height: 100%;
	background: url('./img/center-box.png') no-repeat;
	background-size: 100% 100%;
	.content {
		width: 100%;
		height: 100%;
		padding: 33px 23px;
		position: relative;
		.box {
			position: absolute;
			width: calc(100% - 46px);
			height: calc(100% - 66px);
			background: transparent;
			cursor: pointer;
		}
		iframe {
			background: transparent;
			width: 100%;
			height: 100%;
		}
	}
}
.center-enlarge {
	background: rgb(51 56 64 / 65%);
	z-index: 999999999;
	position: fixed;
	width: 1200px;
	height: 900px;
	top: 50%;
	left: 50%;
	margin-left: -600px;
	margin-top: -450px;
	.top {
		position: absolute;
		top: 0;
		left: 0;
		width: 90px;
		height: 60px;
		border-top: 2px solid #00e4ff;
		border-left: 2px solid #00e4ff;
	}
	.right {
		position: absolute;
		right: 0;
		top: 0;
		width: 90px;
		height: 60px;
		border-top: 2px solid #00e4ff;
		border-right: 2px solid #00e4ff;
	}
	.bottom {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 90px;
		height: 60px;
		border-bottom: 2px solid #00e4ff;
		border-right: 2px solid #00e4ff;
	}
	.left {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 90px;
		height: 60px;
		border-bottom: 2px solid #00e4ff;
		border-left: 2px solid #00e4ff;
	}
	iframe {
		background: transparent;
		width: 100%;
		height: 100%;
	}
}
</style>
