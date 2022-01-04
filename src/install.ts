import * as echarts from 'echarts';
import { ElButton, ElInput, ElForm, ElFormItem, ElIcon, ElUpload } from 'element-plus';
import 'element-plus/dist/index.css';

import '@/assets/style/css/base.css'
import '@/assets/style/css/animate.css'

import { App } from 'vue';
export default {
	install: (app: App) => {
		app.config.globalProperties.$echarts = echarts;
		app.use(ElButton).use(ElInput).use(ElForm).use(ElFormItem).use(ElIcon).use(ElUpload);
	},
};
