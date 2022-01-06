<script lang="ts">
import { defineComponent } from 'vue';
import screenHeader from '@components/header/index.vue';
import workOrderStatus from './components/workOrderStatus.vue';
import EarlyWarningNum from '@/components/earlyWarningNum/main.vue';
import ChartBox from '@components/chartBoxOne/main.vue';
import CensusNum from '@components/censusNum/main.vue';
import ChartBoxTwo from '@components/chartBoxTwo/main.vue';
import ServeSource from './components/serveSource/index.vue';
import ServeCategory from './components/serveCategory/index.vue';

import WorkStatus from './components/workStatus/index.vue';
export default defineComponent({
	name: 'home',
	components: {
		screenHeader,
		workOrderStatus,
		EarlyWarningNum,
		ChartBox,
		CensusNum,
		ChartBoxTwo,
		ServeSource,
		ServeCategory,
		WorkStatus,
	},
	setup() {},
});
</script>

<template>
  <div class="container">
    <screenHeader />
    <div class="content">
      <div class="left-container">
        <div class="t-container">
          <div class="item-1 flex-jc-cb flex-d-c">
            <div class="flex-jc-cb" style="height: 76px; width: 100%">
              <CensusNum type="serve" style="height: 100%; width: 126px" />
              <CensusNum type="deviceOn" style="height: 100%; width: 126px" />
              <CensusNum type="deviceOff" style="height: 100%; width: 126px" />
              <CensusNum type="workOrder" style="height: 100%; width: 325px" />
            </div>
            <div class="flex-jc-cb">
              <ChartBox type="serve" style="width: 360px; height: 250px"></ChartBox>
              <ServeSource style="width: 360px; height: 250px"></ServeSource>
            </div>
          </div>
          <div class="item-2"></div>
          <div class="item-3 flex-jc-cb flex-d-c">
            <ServeCategory style="width: 360px; height: 342px" />
            <ChartBox type="device" style="width: 360px; height: 253px;"></ChartBox>
          </div>
          <div class="item-4">
            <ChartBox type="workOrder" style="width: 360px; height: 255px"></ChartBox>
          </div>
          <div class="item-5">
            <WorkStatus />
          </div>
        </div>
        <!-- <workOrderStatus style="height: 370px" /> -->
      </div>
      <div class="right-container flex-jc-cb flex-d-c">
        <div class="early-list flex-jc-cb">
          <EarlyWarningNum type="yesterday" style="width: 172px; height: 83px" />
          <EarlyWarningNum type="today" style="width: 172px; height: 83px" />
          <EarlyWarningNum type="week" style="width: 172px; height: 83px" />
          <EarlyWarningNum type="month" style="width: 172px; height: 83px" />
        </div>
        <div class="early-chart flex-jc-cb">
          <ChartBox type="early" style="width: 360px; height: 253px"></ChartBox>
          <ChartBox type="earlyError" style="width: 360px; height: 253px"></ChartBox>
        </div>
        <div style="height: 280px; width: 100%">
          <ChartBoxTwo type="early" style="height: 100%; width: 100%" />
        </div>
        <div style="height: 306px; width: 100%;">
          <ChartBoxTwo type="early" style="height: 100%; width: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
	height: 100%;
}
.content {
	display: flex;
	height: calc(100% - 80px);
	padding: 10px 15px 23px;
	.left-container {
		width: 1165px;
		display: flex;
		flex-wrap: wrap;
		.t-container {
			display: grid;
			grid-template-columns: 360px 360px 390px;
			grid-template-rows: 338px 260px 335px;
			gap: 17px 13px;
			.item-1 {
				grid-column: 1 / span 2;
				grid-row: 1 / span 1;
			}
			.item-2 {
				background: red;
				grid-column: 3 / span 1;
				grid-row: 1 / span 2;
			}
			.item-3 {
				grid-column: 1 / span 1;
				grid-row: 2 / span 2;
			}
			.item-4 {
				grid-column: 2 / span 1;
				grid-row: 2 / span 1;
			}
			.item-5 {
				grid-column: 2 / span 2;
				grid-row: 3 / span 1;
			}
		}
	}
	.right-container {
		width: 755px;
		height: 100%;
		.early-list {
			height: 83px;
			width: 100%;
		}
		.early-chart {
			height: 253px;
			width: 100%;
		}
	}
}
</style>
