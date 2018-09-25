import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
//import { createRouter } from './router/router.js'
//import { store } from './store.js'

export function createApp() {
	//const router = createRouter();

	const app = new Vue({
  		el: '#app',
  		render: h => h(App)
	});

	return { app };
}
