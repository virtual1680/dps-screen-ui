<template>
	<router-view></router-view>
</template>

<style lang="scss">
html,
body {
	// width: 7680px;
	// height: 1680px;
	width: 1920px;
	height: 1080px;
}
#app {
	font-family: PingFangSC-Medium, PingFang SC;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: url('./assets/bg-main.png') no-repeat;
	background-size: 100% 100%;
}
.flex-jc-cb {
	display: flex;
	justify-content: space-between;
}
.flex-d-c {
	flex-direction: column;
}
</style>
