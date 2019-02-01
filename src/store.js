import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		userSession: null,
		testSession: {
	      id: 1,
	      email: 'store email',
	      password: '',
	      username: 'store user',
	      first_name: 'store first',
	      last_name: 'store last',
	      phone: '',
	      profession: '',
	      profession_raw: 0,
	      send_email: 0,
	      teach: 0,
	      learn: 0,
	      teach_learn: 0,
	      lang: 0,
	      lang_raw: 0,
	      lang_teach: 0,
	      about_me: 'hello this is about text',
	      img_url: '/public/img/profile_default.png'
		}
	},
	/*plugins: [new VuexPersistence().plugin],*/
	mutations: {
		updateTestSession(state, testSession) {
			state.testSession = testSession;
		},
		increment(state) {
			state.counter++;
		},
		setAuthUser(state, userSession) {
			state.userSession = userSession;
		}
	},
	actions: {
		setUser(context, user) {
			context.commit('setAuthUser', user);
		},
		loadSession(context) {

			var ep = '/api/user-sess';
			var url = '';

			if (process.env.NODE_ENV != 'prod') {
				url = 'http://localhost:8080';
			}
			else {
				url = 'http://jarisk.com';
			}

			var t_url = url + ep;

			axios
				.get('/api/user-sess', { headers: {
   				'Accept': 'application/json' }})
   			.then(r => r.data)
   			.then(user_info => {
   				let results = user_info;
   				context.commit('updateTestSession', results);
   			})
 		},
		incrementAction(context) {
			console.log('increment pls');
			context.commit('increment');
		}
	},
	getters: {
		isLoggedIn(state) {
			return (state.userSession !== null); 
		}
	}
})