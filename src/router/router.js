import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/jarisk/Home.vue'; //jarisk home
import Secure from '../components/Secure.vue';
import Login from '../components/Login.vue';
import Logout from '../components/Logout.vue';
import SkooliaHome from '../components/SkooliaHome.vue';
import CreateProfile from '../components/CreateProfile.vue';
import EditProfile from '../components/EditProfile.vue';
import PhotoUpload from '../components/PhotoUpload.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import ResetPassword from '../components/ResetPassword.vue';
import ErrorPage from '../components/ErrorPage.vue';
import UserProfile from '../components/UserProfile.vue';
import ChatBox from '../components/ChatBox.vue';

import CryptoHead from '../components/crypto/CryptoHead.vue';
import DataDriven from '../components/crypto/DataDriven.vue';

Vue.use(Router);

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			/*{ path: '/', redirect: { name: 'home' } },*/
			{ path: '*', component: Home },
			{ path: '/404', component: ErrorPage, name: 'error' },
			{ path: '/login', component: Login, name: 'login' },
			{ path: '/signout', component: Logout, name: 'logout' },
			{ path: '/secure', component: Secure, name: 'secure' },
			{ path: '/home', component: Home, name: 'home' },
			{ path: '/skoolia', component: Login },
			{ path: '/profile', component: SkooliaHome, name: 'profile'},	
			{ path: '/create', component: CreateProfile, name: 'create' },
			{ path: '/edit-profile', component: EditProfile, name: 'edit_profile' },
			{ path: '/forgot-password', component: ForgotPassword, name: 'forgot_password' },
			{ path: '/reset-password/:id', component: ResetPassword, name: 'reset_password' },
			{ path: '/photo-upload', component: PhotoUpload, name: 'photo_upload' },
			{ path: '/users/:id', component: UserProfile, name: 'user_profile' },
			{ path: '/chat', component: ChatBox, name: 'chat_box' },
			//{},
			{ path: '/crypto', component: CryptoHead, name: 'crypto' },
			{ path: '/d3', component: DataDriven, name: 'd3' }
		]
	});
}