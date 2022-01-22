import request from '@/utils/axios';
import md5 from 'js-md5';

export const info = (domain: string) => {
	return request({
		url: '/blade-system/tenant/info',
		method: 'get',
		params: {
			domain,
		},
	});
};
/**
 * 登录
 * @param data {username password}
 */
export const Login = (
	username: string,
	password: string,
	type: string,
	key: string,
	code: string,
) => {
	return request({
		url: '/blade-auth/oauth/token',
		method: 'POST',
		headers: {
			'Tenant-Id': '000000',
			'Dept-Id': '',
			'Role-Id': '',
			'Captcha-Key': key,
			'Captcha-Code': code,
		},
		params: {
			tenantId: '000000',
			username,
			password: md5(password),
			grant_type: 'captcha',
			scope: 'all',
			type,
		},
	});
};

/**
 * 登录图片验证码
 * @returns
 */
export const GetCaptcha = () =>
	request({
		url: '/blade-auth/oauth/captcha',
		method: 'get',
	});

/**
 * 退出登录
 * @returns
 */
export const Logout = () =>
	request({
		url: '/blade-auth/oauth/logout',
		method: 'get',
	});

/**
 * 刷新token
 * @param refresh_token
 * @param tenantId
 * @returns
 */
export const RefreshToken = (refresh_token: string) =>
	request({
		url: '/blade-auth/oauth/token',
		method: 'post',
		headers: {
			'Tenant-Id': '000000',
		},
		params: {
			tenantId: '000000',
			refresh_token,
			grant_type: 'refresh_token',
			scope: 'all',
		},
	});
