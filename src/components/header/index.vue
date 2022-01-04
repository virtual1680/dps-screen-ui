<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: header
****************************************-->
<template>
  <div class="ly-header">
    <div class="time"></div>
  </div>
</template>
<script lang="ts">
// 项目头部
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'header',
	components: { 
		
	 },
	setup() {

	},
});
</script>
<style lang="scss" scoped>
.ly-header {
  width: 100%;
  min-width: 1920px;
  height: 80px;
  position: relative;
  // background-image: url("@{localUrl}/images/0-可视化公用组件/header.png");
	background-color: red;
  &:before {
    content: "";
    // background-image: url("@{localUrl}/images/0-可视化公用组件/header-g.png");
    width: 1920px;
    height: 80px;
    position: absolute;
    bottom: -11%;
    left: 16%;
		background-color: #ccc;
    animation: opaciAni 5s infinite alternate;
  }
  .nav-name{
    position: absolute;
    top: 11%;
    left: 15%;
    // background-image: url("@{localUrl}/images/0-可视化公用组件/back0.png");
    background-repeat: no-repeat;
    padding-left: 85px;
    cursor: pointer;
    &:hover{
      //  background-image: url("@{localUrl}/images/0-可视化公用组件/back.png");
    }
    span{
       font-size: 50px;
      background: -webkit-linear-gradient(top, #ffffff, #f8ffbe,#ffde01);
      -webkit-background-clip: text;
      color: transparent;
     }
  }
  .nav-name2{
        position: absolute;
       top: 11%;
        left: 13%;
         span{
       font-size: 50px;
      background: -webkit-linear-gradient(top, #ffffff, #f8ffbe,#ffde01);
      -webkit-background-clip: text;
      color: transparent;
     }
  }
}
/*动画*/
.ly-header {
  clip-path: inset(0 50% 0 50%);
  animation-duration: 0.8s;
  animation-delay: 0.8s;
  animation-timing-function: linear;
  animation-fill-mode: forwards; // animation-direction: alternate;
  animation-name: horizontSlide;
  @keyframes horizontSlide {
    0% {
      clip-path: inset(0 50% 0 50%);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
}
@keyframes opaciAni {
  0% {
    opacity:0.7
  }
  to {
    opacity:1
  }
}
</style>
