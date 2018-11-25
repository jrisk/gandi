import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		userSession: 'user sesh pls',
		testSession: {
      id: 1,
      email: 'server email',
      password: 'pass',
      username: 'username',
      first_name: 'server first',
      last_name: 'server last',
      phone: '',
      profession: '',
      send_email: 0,
      teach: 0,
      learn: 0,
      about_me: 'hello this is about text'
		}
	},
	mutations: {
		updateSession(state, userSession) {
			state.userSession = userSession;
		},
		updateTestSession(state, testSession) {
			state.testSession = testSession;
		},
		increment(state) {
			state.counter++;
		}
	},
	actions: {
		loadSession(context) {
			axios
				.get('/api/user-sess', { headers: {
   				'Accept': 'application/json' }})
   			.then(r => r.data)
   			.then(user_info => {
   				let results = user_info;
   				context.commit('updateSession', results);
   			})
 		},
 		loadTestSession(context) {
			axios
				.get('/api/test-sess', { headers: {
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
		}/*,
		rankMarket(context) {
			axios
				.get('/cache/coin')
				.then(r => r.data)
				.then(info => {
					let ranked = [];

					for (let coin of info.data) {
						ranked.push(coin.circulating_supply);
					}

					ranked.sort(function(a,b) {
						return a-b;
					});

					context.commit('updateCoinRank', ranked);
				})
		}*/
	}
})