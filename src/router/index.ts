import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getToken } from '@/utils/token'
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// router.beforeEach((to, from, next) => {
// 	if (getToken()) {
// 		if (to.path === '/login') {
// 			next({ path: '/' })
// 		} else {
// 			next()
// 		}
// 	} else {
// 		if (to.path === '/login') {
// 			next()
// 		} else {
// 			next({ path: '/login' })
// 		}
// 	}
// })


export default router;
