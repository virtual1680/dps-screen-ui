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

.el-popper.is-dark{
	z-index: 98999999999999999 !important;
}

.el-table--scrollable-y{
	*::-webkit-scrollbar-thumb {
			border-radius: 5px;
			background: #1a95af !important;
	}
	*::-webkit-scrollbar-track {
    background: #03141b !important
	}
}
.el-table__body-wrapper tr td.el-table__fixed-right-patch, 
.el-table__body-wrapper tr th.el-table__fixed-right-patch, 
.el-table__footer-wrapper tr td.el-table__fixed-right-patch, 
.el-table__footer-wrapper tr th.el-table__fixed-right-patch, 
.el-table__header-wrapper tr td.el-table__fixed-right-patch, 
.el-table__header-wrapper tr th.el-table__fixed-right-patch{
	background-color: #000 !important;
}
.el-table--border .el-table__inner-wrapper::after, 
.el-table--border::after, 
.el-table--border::before,
.el-table__inner-wrapper::before{
	display: none;
}

	@keyframes zoomIn {
		0% {
			opacity: 0;
			-webkit-transform: scale(.3)  translate(-50%,-50%);
			-ms-transform: scale(.3)  translate(-50%,-50%);
			transform: scale(.3)  translate(-50%,-50%);
		}

		50% {
			opacity: 1
		}
	}
	@keyframes zoomOut {
		0% {
			opacity: 1;
			-webkit-transform: scale(1)  translate(-50%,-50%);
			-ms-transform: scale(1)  translate(-50%,-50%);
			transform: scale(1)  translate(-50%,-50%);
		}

		50% {
			opacity: 0;
			-webkit-transform: scale(.3)  translate(-50%,-50%);
			-ms-transform: scale(.3)  translate(-50%,-50%);
			transform: scale(.3)  translate(-50%,-50%);
		}

		100% {
			transform: translate(-50%,-50%);
			opacity: 0
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0
		}

		100% {
			opacity: 1
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 1
		}

		100% {
			opacity: 0;
			transform: scale(0)
		}
	}
</style>
