<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, onMounted } from 'vue';
import EarlyWarningNum from '@/components/earlyWarningNum/main.vue';
export default defineComponent({
	name: 'home',
	components: { EarlyWarningNum },
	setup() {
		let { proxy } = getCurrentInstance() as ComponentInternalInstance;
		onMounted(() => {
			proxy?.$echarts.init();
		});
	},
});
</script>

<template>
	<div style="width: 172px; height: 80px">
		<EarlyWarningNum />
	</div>
</template>

<style lang="scss"></style>
