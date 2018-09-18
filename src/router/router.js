import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Secure from '../components/Secure.vue';
import Login from '../components/Login.vue';

Vue.use(Router);

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			{ path: '/',
				redirect: { name: 'login' } 
			},
			{ path: '*', component: Home },
			{ path: '/login', component: Login, name: 'login' },
			{ path: '/secure', component: Secure, name: 'secure' }
		]
	});
}