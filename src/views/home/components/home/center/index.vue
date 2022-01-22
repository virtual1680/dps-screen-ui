<template>
	<div class="chart-box">
		<div class="content">
			<iframe
				id="iframe"
				scrolling="no"
				src="http://122.9.154.184:8899/topology"
				frameborder="0"></iframe>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue';
export default defineComponent({
	name: 'serveSource',
	setup() {
		onMounted(() => {});
	},
});
</script>
<style lang="scss" scoped>
.chart-box {
	width: 100%;
	height: 100%;
	background: url('./img/center-box.png') no-repeat;
	background-size: 100% 100%;
	.content {
		width: 100%;
		height: 100%;
		padding: 33px 23px;
		iframe {
			background: transparent;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
