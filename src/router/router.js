import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Secure from '../components/Secure.vue';
import Login from '../components/Login.vue';
import SkooliaHome from '../components/SkooliaHome.vue';
import CreateProfile from '../components/CreateProfile.vue';
import ViewProfile from '../components/ViewProfile.vue';
import EditProfile from '../components/EditProfile.vue';

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
			{ path: '/skoolia', component: Login },
			{ path: '/profile', component: SkooliaHome, name: 'profile'},	
			{ path: '/create', component: CreateProfile, name: 'create' },
			{ path: '/edit-profile', component: EditProfile, name: 'edit_profile' }
		]
	});
}