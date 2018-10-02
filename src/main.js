import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router.js'
//import { store } from './store.js'

import { Modal, Navbar, Button, Nav, Form, FormInput, Card, Tabs } from 'bootstrap-vue/es/components'
import Menu from './components/Menu'
import Login from './components/Login'
import SkooliaNav from './components/SkooliaNav'
import SkooliaModal from './components/SkooliaModal'
import JariskNav from './components/JariskNav'
import Jarisk from './components/Jarisk'

import CardMenu from './components/CardMenu'

import SkooliaCard from './components/SkooliaCard'
import ChatCard from './components/ChatCard'
import OtherCard from './components/OtherCard'

import SkooliaProfile from './components/SkooliaProfile'
import UserTabs from './components/UserTabs'
import UserHomeTab from './components/UserHomeTab'
import UserTimelineTab from './components/UserTimelineTab'
import UserProfileWork from './components/UserProfileWork'

Vue.use(Modal);
Vue.use(Navbar);
Vue.use(Button);
Vue.use(Nav);
Vue.use(Form);
Vue.use(FormInput);
Vue.use(Card);
Vue.use(Tabs);

Vue.component('jarisk', Jarisk);
Vue.component('jarisk-menu', Menu);
Vue.component('jarisk-nav', JariskNav);
Vue.component('jarisk-card-menu', CardMenu);

Vue.component('skoolia-nav', SkooliaNav);
Vue.component('skoolia-modal', SkooliaModal);
Vue.component('skoolia-login', Login);

Vue.component('skoolia-profile', SkooliaProfile);
Vue.component('user-tabs', UserTabs);
Vue.component('user-home-tab', UserHomeTab);
Vue.component('user-timeline-tab', UserTimelineTab);
Vue.component('user-profile-work', UserProfileWork);


Vue.component('skoolia-card', SkooliaCard);
Vue.component('chat-card', ChatCard);
Vue.component('other-card', OtherCard);


export function createApp() {
	const router = createRouter();

	const app = new Vue({
		router,
  		el: '#app',
  		render: h => h(App)
	});

	return { app, router };
}
