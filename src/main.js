import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router.js'
import { store } from './store.js'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import { Modal, Navbar, Button, Nav, Form, FormInput, Card, Tabs } from 'bootstrap-vue/es/components'
//Jarisk
import JariskNav from './components/jarisk/JariskNav'
import Jarisk from './components/jarisk/Jarisk'
import CardMenu from './components/jarisk/CardMenu'

import SkooliaCard from './components/jarisk/SkooliaCard'
import ChatCard from './components/jarisk/ChatCard'
import OtherCard from './components/jarisk/OtherCard'

//Skoolia
import Login from './components/Login'
import SkooliaNav from './components/SkooliaNav'
import SkooliaModal from './components/SkooliaModal'
import SkooliaProfile from './components/SkooliaProfile'
import UserTabs from './components/UserTabs'
import UserHomeTab from './components/UserHomeTab'

import UserProfileWork from './components/UserProfileWork'

import ChatBox from './components/ChatBox';

Vue.use(new VueSocketIO({
	connection: io(process.env.NODE_HOST+':'+process.env.NODE_PORT)
}));

Vue.use(Modal);
Vue.use(Navbar);
Vue.use(Button);
Vue.use(Nav);
Vue.use(Form);
Vue.use(FormInput);
Vue.use(Card);
Vue.use(Tabs);

Vue.component('jarisk', Jarisk);

Vue.component('jarisk-nav', JariskNav);
Vue.component('jarisk-card-menu', CardMenu);

Vue.component('skoolia-card', SkooliaCard);
Vue.component('chat-card', ChatCard);
Vue.component('other-card', OtherCard);

Vue.component('skoolia-nav', SkooliaNav);
Vue.component('skoolia-modal', SkooliaModal);
Vue.component('skoolia-login', Login);

Vue.component('skoolia-profile', SkooliaProfile);
Vue.component('user-tabs', UserTabs);
Vue.component('user-home-tab', UserHomeTab);

Vue.component('user-profile-work', UserProfileWork);

Vue.component('chat-box', ChatBox);



export function createApp() {
	const router = createRouter();

	const app = new Vue({
		router,
		store,
  		el: '#app',
  		render: h => h(App)
	});

	return { app, router };
}
