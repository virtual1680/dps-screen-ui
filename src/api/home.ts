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


// 服务器节点分布
export const apiServerNope = () => {
	return request({
		url: '/m-screen/statistics/getServerNope',
		method: 'get',
		params: {
		},
	});
};



// 服务器剩余资源
export const apiServerRemainingResources = () => {
	return request({
		url: '/m-screen/statistics/getServerRemainingResources',
		method: 'get',
		params: {
		},
	});
};


// 预警分布环比
export const apiWarningCategory = () => {
	return request({
		url: '/m-screen/statistics/getWarningCategory',
		method: 'get',
		params: {
		},
	});
};

// 预警异常
export const apiErrorCategory = () => {
	return request({
		url: '/m-screen/statistics/getErrorCategory',
		method: 'get',
		params: {
		},
	});
};

// 工单故障
export const apiOrderStatus = () => {
	return request({
		url: '/m-screen/statistics/getOrderStatus',
		method: 'get',
		params: {
		},
	});
};

// 服务器类别
export const apiServerCategory = () => {
	return request({
		url: '/m-screen/statistics/getServerCategory',
		method: 'get',
		params: {
		},
	});
};

// 工单数据趋势
export const apiOrderTypeTrend = () => {
	return request({
		url: '/m-screen/statistics/getOrderTypeTrend',
		method: 'get',
		params: {
		},
	});
};




