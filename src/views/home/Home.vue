<script lang="ts">
import { defineComponent } from 'vue';
import screenHeader from '@components/header/index.vue';
export default defineComponent({
	name: 'home',
	components: {
		screenHeader,
	},
	setup() {},
});
</script>

<template>
	<div>
		<screenHeader />
	</div>
</template>

<style lang="scss"></style>
