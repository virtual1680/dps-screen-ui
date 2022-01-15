import request from '@/utils/axios';


// 服务器列表
export const apiServerList = (params) => {
	return request({
		url: '/m-screen/statistics/getServerList',
		method: 'get',
		params: {
			...params
		},
	});
};


// 预警列表
export const apiWarningList = (params) => {
	return request({
		url: '/m-screen/statistics/getWarningList',
		method: 'get',
		params: {
			...params
		},
	});
};



// 工单列表
export const apiOrderList = (params) => {
	return request({
		url: '/m-screen/statistics/getOrderList',
		method: 'get',
		params: {
			...params
		},
	});
};



