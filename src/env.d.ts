/// <reference types="vite/client" />

import { ECharts } from 'echarts';
import { DefineComponent } from 'vue';
declare module '*.vue' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	// export default component;
}

import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$echarts: ECharts;
	}
}

import Vue from 'vue';
declare module 'vue/types/vue' {
	interface Vue {
		$echarts: ECharts;
	}
}
