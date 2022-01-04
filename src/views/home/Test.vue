<script lang="ts">
import { defineComponent } from 'vue';
import EarlyWarningNum from '@components/earlyWarningNum/main.vue';
export default defineComponent({
	name: 'home',
	components: { EarlyWarningNum },
	setup() {},
});
</script>

<template>
	<div style="width: 172px; height: 80px">
		<EarlyWarningNum />
	</div>
</template>

<style lang="scss"></style>
