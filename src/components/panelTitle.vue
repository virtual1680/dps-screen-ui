<!--*************************************
* @date:   2022-01-04   LYG  [创建文件]
* @update: 2022-01-04   LYG  [编写功能]
*
* @description: header
****************************************-->
<template>
  <div class="title">
    {{content}}
  </div>
</template>
<script lang="ts">
// 面板公用头部
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'panelTitle',
	props: { content: String },
	components: { 
		
	 },
	setup() {

	},
});
</script>
<style lang="scss" scoped>
  .title{
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #00E4FF;
  }
</style>
