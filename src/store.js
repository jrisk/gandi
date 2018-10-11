import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		coinResults: 'coin pls',
		counter: 0,
		coinRank: 'sorted and ranked coins'
	},
	mutations: {
		updateMarket(state, coinResults) {
			state.coinResults = coinResults
		},
		updateCoinRank(state, coinRank) {
			state.coinRank = coinRank
		},
		increment(state) {
			state.counter++
		}
	},
	actions: {
		loadMarket(context) {
			axios
				.get('http://localhost:8080/api', { headers: {
   				'Accept': 'application/json' }})
   			.then(r => r.data)
   			.then(coins => {
   				let results = coins.data;
   				context.commit('updateMarket', results)
   			})
 		},
		incrementAction(context) {
			console.log('increment pls');
			context.commit('increment');
		}/*,
		rankMarket(context) {
			axios
				.get('http://localhost:8080/cache/coin')
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
				})*/
		}
	}
})