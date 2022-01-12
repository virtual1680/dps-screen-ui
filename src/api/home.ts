import request from '@/utils/axios';

export const info = (domain: string) => {
	return request({
		url: '/blade-system/tenant/info',
		method: 'get',
		params: {
			domain,
		},
	});
};



// 左上标签数据接口
export const apiLeftTopTags = () => {
	return request({
		url: '/m-screen/statistics/getTagsLeftData',
		method: 'get',
		params: {
		},
	});
};


// 右上标签数据接口
export const apiRightTopTags = () => {
	return request({
		url: '/m-screen/statistics/getTagsRightData',
		method: 'get',
		params: {
		},
	});
};


// 工单状态
export const apiOrderStatusTrend = () => {
	return request({
		url: '/m-screen/statistics/getOrderStatusTrend',
		method: 'get',
		params: {
		},
	});
};


// 设备信息
export const apiDeviceInfo = () => {
	return request({
		url: '/m-screen/statistics/getDeviceInfo',
		method: 'get',
		params: {
		},
	});
};



