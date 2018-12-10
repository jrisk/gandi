<template>
<div>
 <div class="container emp-profile">
 	<span>
	Enter the email address used with your account, and we’ll email you a link to reset your password.
	</span>
	<div class="form-group row justify-content-center margin-spacer">
        <input class="form-control input-large" type="text" name="email" v-model="input.email" placeholder="Email Address" />
	</div>
  <div class="row justify-content-center margin-spacer">
        <button type="button" class="btn btn-primary" v-on:click="send_reset()">Send Reset Link</button>
	</div>
 </div>
</div>
</template>

<script>
import axios from 'axios';
import url_sesh from '../../url_method.js';

export default {
	data() {
		return {
			input: {
				email: 'test@test.com'
			}
		}
	},
	methods: {
		send_reset() {
			const vm = this;

			var endpoint = '/reset-link-test';

			var urlArr = url_sesh(endpoint);

			var url_env = urlArr['url_env'];
			var url = urlArr['url'];

			const instance = axios.create({baseURL: url_env })

			instance.get(url).then( function(resp) {
				console.log('send reset called');
				if (vm.input.email != '') {
					console.log(vm.input.email);
					//db_check
					//mailgun
				}
			}).catch( err => console.log(err));
		}
	}
}
</script>