import * as echarts from 'echarts';
import {
	ElButton,
	ElInput,
	ElForm,
	ElFormItem,
	ElIcon,
	ElUpload,
	ElTable,
	ElTableColumn,
} from 'element-plus';
import 'element-plus/dist/index.css';

import '@/assets/style/css/base.css';
import '@/assets/style/css/animate.css';
import '@/assets/font/font.css';

import { App } from 'vue';
export default {
	install: (app: App) => {
		app.config.globalProperties.$echarts = echarts;
		app.use(ElButton);
		app.use(ElInput);
		app.use(ElForm);
		app.use(ElFormItem);
		app.use(ElIcon);
		app.use(ElUpload);
		app.use(ElTable);
		app.use(ElTableColumn);
		app.directive('loadmore', {
			mounted(el, binding) {
				let selectWrap = el.querySelector('.el-scrollbar__wrap');
				selectWrap.addEventListener('scroll', function () {
					let sign = 0;
					const scrollDistance =
						selectWrap.scrollHeight - selectWrap.scrollTop - selectWrap.clientHeight;
					if (scrollDistance <= sign) {
						binding.value();
					}
				});
			},
		});
	},
};
