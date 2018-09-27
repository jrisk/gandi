import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Secure from '../components/Secure.vue';
import Login from '../components/Login.vue';
import SkooliaHome from '../components/SkooliaHome.vue';

Vue.use(Router);

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			/*{ path: '/', redirect: { name: 'home' } },*/
			{ path: '*', component: Home },
			{ path: '/login', component: Login, name: 'login' },
			{ path: '/secure', component: Secure, name: 'secure' },
			{ path: '/home', component: Home, name: 'home' },
			{ path: '/skoolia', component: SkooliaHome, name: 'skoolia' }
		]
	});
}