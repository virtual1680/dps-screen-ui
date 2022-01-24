import request from '@/utils/axios';
interface Params {
	provider: string;
	publicIp: string;
	ip: string;
}
/**
  服务器信息
	params:{provider,publicIp,ip}
 */
export const apiServerInfo = (params: Params) => {
	return request({
		url: '/m-screen/statistics/getServerInfo',
		method: 'get',
		params,
	});
};
