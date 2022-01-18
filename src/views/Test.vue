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
	<div style="width: 172px; height: 83px">
		<EarlyWarningNum />
	</div>
	<div style="width: 360px; height: 220px">
		<ChartBox><div>jjj</div></ChartBox>
	</div>
</template>

<style lang="scss"></style>
