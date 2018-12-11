<template>
<div>
 <div class="container emp-profile">
 	<span>
 	<!-- dictionary phrases -->
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

			var endpoint = '/send-reset';

			var urlArr = url_sesh(endpoint);

			var url_env = urlArr['url_env'];
			var url = urlArr['url'];

			const instance = axios.create({baseURL: url_env })

			const formdata = this.input;

			console.log(formdata);

			if (vm.input.email != '') {
				console.log(vm.input.email);
				instance.post(url, formdata, { headers: { 'Content-Type': 'application/json' }
				}).then( function(resp) {
					//db_check
					//mailgun
					console.log(resp);
					console.log('send reset called');
				}).catch( err => console.log(err));
				

			}

			else {
				console.log('nope');
				//this.info = 'please input your email';
			}
		}
	}
}
</script>