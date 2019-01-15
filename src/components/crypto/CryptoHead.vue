<template>
	<div class="container emp-profile">
		<div> Last Year </div>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(val,key) in info">
					<td>{{key}}</td>
					<td>{{val}}</td>
				</tr>
			</tbody>
		</table>

		{{years}} years ago

		<select v-model="years">
			<option v-for="option in options" v-bind:value="option">
				{{option}}
			</option>
		</select>

		<div>
			<input v-model="span">
		</div>

		over {{span}} days
		<button v-on:click="get_year(years, span)" type="button" class="btn btn-lg">Get from {{years}} years ago</button>

		<table v-if="infos != ''" class="table">
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(val,key) in infos">
					<td>{{key}}</td>
					<td>{{val}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios_b from '../../../url_method.js';
//get most oversold coins
//find oversold positions
//add graphs

export default {
	data() {
		return {
			info: '',
			infos: '',
			years: 2,
			options: [1,2,3,4,5,6,7,8],
			span: 7
		} 
	},
	mounted() {
		const vm = this;

		var instance = axios_b();

		var url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

		var url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

		//YYYY-MM-DD
		var today = new Date();

		var today_week = today;

		var start_date = today.toISOString().split('T')[0];

		today_week.setDate(today_week.getDate() + 14) // 2 week

		var end_date = today_week.toISOString().split('T')[0];

		var index_year = start_date.slice(3,4);

		console.log(index_year);

		var start_last = start_date.substr(0,3) + (index_year-1) + start_date.substr(4);

		var end_last = end_date.substr(0,3) + (index_year-1) + end_date.substr(4);

		console.log(start_last);
		console.log(end_last);

		var params = '?start='+start_last+'&end='+end_last;

		var url = url + params;
	instance
      .get(url)
      .then(function(resp) {
      	var prices = resp.data.bpi;
      	vm.get_RSI(prices, 14);
      	vm.info = prices;
      })
      .catch(err => console.log(err));
  },
  methods: {
  	get_swarm() {
  		var info = 'To restate and summarize, it takes a given set of parameters as candidate triggers and stop loss, simulates that on historical data, and then returns the best one it finds.';
  		var extra = 'avoid premature convergence to a local minimum';
  		var problem = 'first positive movers after market-wide losses predict any momentum on next price surge or continued loss';
  	},
  	get_RSI(prices, days) {
	//calculate RSI
	var avg_gain = '';//0.01/14 1% gain over 7 days
	var avg_loss = '';//0.008/14 0.8% loss over 7 days

	console.log(prices[1]);
	let arr = [];
	let smooth_prices = [];
	let sum_of_gains = 0;
	let sum_of_losses = 0;
	let x = 0;

	for (let price in prices) {
		var cur_p = prices[price];
		arr[x] = cur_p;
		console.log(cur_p);

		//smooth operation

		/*if (x > days-1) {
			var diff = arr[x] - arr[x-1];

			if (diff < 0) {
				var diff_p = Math.abs(diff);
				sum_of_smooth_losses += diff_p; 
			}
			else {
				sum_of_smooth_gains += diff;
			}

			smooth_prices.push(cur_p);

			//var RSI_step2 = 100 - (100/1+(avg_gain*13+current_gain)/avg_loss*13+current_loss)
		}*/

		if (x > 0) {
			var diff = arr[x] - arr[x-1];

			if (diff < 0) {
				var diff_p = Math.abs(diff);
				sum_of_losses += diff_p; 
			}
			else {
				sum_of_gains += diff;
			}
		}
		x++;
	}

	var avg_gains = sum_of_gains/days;
	var avg_losses = sum_of_losses/days;

	console.log(avg_gains);
	console.log(avg_losses);

	console.log(avg_losses == 0);

	if (avg_losses == 0) { avg_losses += .0000001}

	var rs = (avg_gains)/(avg_losses);

	var rsi = 100 - (100/(1+rs));

	console.log(rsi);
  	},
  	get_Bollinger() {

  	},
  	get_SimpleMovingAvg() {
  		//7-day
  		//28-day
  		//50-day
  		//100-day
  	},
  	get_ExponentialMovingAvg() {

  	},
  	get_Oscillator() {

  	},
  	get_year(years_ago, time_span) {
  		const vm = this;

		var instance = axios_b();

		//var url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

		var url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

		//YYYY-MM-DD
		var today = new Date();

		var today_week = today;

		var start_date = today.toISOString().split('T')[0];

		var time_span = Number(time_span);

		today_week.setDate(today_week.getDate() + time_span);

		var end_date = today_week.toISOString().split('T')[0];

		var index_year = start_date.slice(3,4);

		console.log(index_year);

		var start_last = start_date.substr(0,3) + (index_year-years_ago) + start_date.substr(4);

		var end_last = end_date.substr(0,3) + (index_year-years_ago) + end_date.substr(4);

		console.log(start_last);
		console.log(end_last);
		console.log(time_span);

		var params = '?start='+start_last+'&end='+end_last;

		var url = url + params;
	instance
      .get(url)
      .then(function(resp) {
      	var prices = resp.data.bpi;

      	vm.get_RSI(prices, time_span);

      	vm.infos = prices;
      })
      .catch(err => console.log(err));
  	}
  }
}
</script>