import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
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
