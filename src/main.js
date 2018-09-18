import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router.js'
//import { store } from './store.js'

import { Modal, Navbar, Button, Nav, Form, FormInput } from 'bootstrap-vue/es/components'
import Menu from './components/Menu'
import SkooliaNav from './components/SkooliaNav'
import SkooliaModal from './components/SkooliaModal'

Vue.use(Modal);
Vue.use(Navbar);
Vue.use(Button);
Vue.use(Nav);
Vue.use(FormInput);

Vue.component('skoolia-nav', SkooliaNav);
Vue.component('skoolia-menu', Menu);
Vue.component('skoolia-modal', SkooliaModal);

export function createApp() {
	const router = createRouter();

	const app = new Vue({
		router,
  		el: '#app',
  		render: h => h(App)
	});

	return { app, router };
}
