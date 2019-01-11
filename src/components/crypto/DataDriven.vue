<template>
	<div class="emp-profile">
		<span>{{min}}</span>
		<span>{{max}}</span>
		<span>{{sorted}}</span>
	</div>
</template>

<script>
//import {scaleLinear} from "d3-scale";
//ar d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection"));
import * as d3arr from 'd3-array'; //all

	export default {
		data() {
			return {
				info: '',
				min: '',
				max: '',
				sorted: ''
			}
		},
		created() {
			var arr = ["1",9,4,3,2,67,2,6,'78',6,4,3,9,5,64,35]

			var arr_n = arr.map(Number);

			var min = d3arr.min(arr_n);
			var max = d3arr.max(arr_n);

			var arr_s = arr_n.sort((a,b) => a-b) //ascending

			this.sorted = arr_s;

			this.min = min;
			this.max = max;
		},
		mounted() {
			var avg_gain = '';//0.01/14 1% gain over 7 days
			var avg_loss = '';//0.008/14 0.8% loss over 7 days

			

			//average percentage gain or losses during a lookback period
			//var RSI_step1 = 100 - (100/1+(avg_gain/avg_loss));

			//var RSI_step2 = 100 - (100/1+(avg_gain*13+current_gain)/avg_loss*13+current_loss)
		}
	}
</script>
