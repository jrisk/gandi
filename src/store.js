import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		userSession: 'user sesh pls',
		counter: 0
	},
	mutations: {
		updateSession(state, userSession) {
			state.userSession = userSession;
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