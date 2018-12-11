import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/jarisk/Home.vue'; //jarisk home
import Secure from '../components/Secure.vue';
import Login from '../components/Login.vue';
import SkooliaHome from '../components/SkooliaHome.vue';
import CreateProfile from '../components/CreateProfile.vue';
import ViewProfile from '../components/ViewProfile.vue';
import EditProfile from '../components/EditProfile.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import ErrorPage from '../components/ErrorPage.vue';

Vue.use(Router);

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			/*{ path: '/', redirect: { name: 'home' } },*/
			{ path: '*', component: Home },
			{ path: '/404', component: ErrorPage, name: 'error' },
			{ path: '/login', component: Login, name: 'login' },
			{ path: '/secure', component: Secure, name: 'secure' },
			{ path: '/home', component: Home, name: 'home' },
			{ path: '/skoolia', component: Login },
			{ path: '/profile', component: SkooliaHome, name: 'profile'},	
			{ path: '/create', component: CreateProfile, name: 'create' },
			{ path: '/edit-profile', component: EditProfile, name: 'edit_profile' },
			{ path: '/forgot-password', component: ForgotPassword, name: 'forgot_password' }
		]
	});
}