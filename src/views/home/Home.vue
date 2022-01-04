<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@components/HelloWorld.vue';
import screenHeader from '@components/header/index.vue';
export default defineComponent({
	name: 'home',
	components: { 
		screenHeader
	 },
	setup() {},
});
</script>

<template>
	<div>
		
		<screenHeader/>

	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
