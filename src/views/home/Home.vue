<script lang="ts">
import { defineComponent } from 'vue';
import screenHeader from '@components/header/index.vue';
import workOrderStatus from './components/workOrderStatus.vue';
export default defineComponent({
	name: 'home',
	components: {
		screenHeader,
		workOrderStatus
	},
	setup() {},
});
</script>

<template>
	<div class="container">
		<screenHeader />
		<div class="content">
			<div class="left-container">
				<workOrderStatus style="height:370px;" />
			</div>
			<div class="right-container">
				<div class="early-list"></div>
				<div style="height: 245px; width: 100%; background: red"></div>
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
			height: 80px;
			width: 100%;
			background: violet;
		}
	}
}
</style>
