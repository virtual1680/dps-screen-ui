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
