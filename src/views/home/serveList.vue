<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, onMounted } from 'vue';
import EarlyWarningNum from '@/components/earlyWarningNum/main.vue';
import ChartBox from '@components/chartBoxOne/main.vue';
import { EChartsOption } from 'echarts';
export default defineComponent({
	name: 'home',
	components: { EarlyWarningNum, ChartBox },
	setup() {
		let { proxy } = getCurrentInstance() as ComponentInternalInstance;
		onMounted(() => {
			(proxy?.$echarts as any).init();
		});
	},
});
</script>

<template>
	<div class="serve_box">
		<div class="tool">

		</div>
		<div class="list_container">
			<div class="left_box">

			</div>
			<div class="right_box">
					<div class="fr_top">

					</div>
					<div class="fr_bot">

					</div>
			</div>
		</div>
	</div>

</template>

<style lang="scss">
.serve_box{
	width: 1920px;
	height: 1080px;
	padding:22px;
	background: url('../../assets/server_list.png') no-repeat;
	background-size: contain;
	.tool{
		height: 72px;
	}
}
.list_container{
	display: flex;
	.left_box{
		width: 1032px;
		height: 964px;
		background: rgba(2, 30, 41, .9);
	}
	.right_box{
		padding-left: 20px;
		.fr_top{
			width: 828px;
			height: 465px;
			background: rgba(2, 30, 41, .9);
		}
		.fr_bot{
			margin-top: 20px;
			width: 828px;
			height: 479px;
			background: rgba(2, 30, 41, .9);
		}

	}
}

</style>
