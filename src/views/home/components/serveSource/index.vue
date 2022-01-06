<template>
  <div class="chart-box">
    <div class="content"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'serveSource',
	setup() {},
});
</script>
<style lang="scss" scoped>
.chart-box {
	width: 100%;
	height: 100%;
	.content {
		margin-top: 10px;
		height: calc(100% - 10px);
		background: url('./img/bg.png') no-repeat;
		background-size: 98% 100%;
	}
}
</style>