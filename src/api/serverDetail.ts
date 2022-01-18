import request from '@/utils/axios';

/**
  服务器信息
	params:{provider,publicIp,ip}
 */
export const apiServerInfo = params => {
	return request({
		url: '/m-screen/statistics/getServerInfo',
		method: 'get',
		params,
	});
};
