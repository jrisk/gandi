<template>
 <div class="container emp-profile">
 	<div class="row justify-content-center">
	 	<span>
	 	{{this.pass_info}}
		</span>
	</div>
	<div class="row justify-content-center">
    <span v-bind:class="{'text-danger': txtActive}">
    	{{this.info}}
    </span>
  </div>
	<div class="form-group row justify-content-center margin-spacer">
        <input class="form-control input-large" type="text" name="email" v-model="input.email" placeholder="Email Address" @keyup.enter="send_reset()" />
	</div>
  <div class="row justify-content-center margin-spacer">
        <button type="button" class="btn btn-primary" v-on:click="send_reset()">Send Reset Link</button>
	</div>
 </div>
</template>

<script>
import axios from 'axios';
import url_sesh from '../../url_method.js';

export default {
	data() {
		return {
			txtActive: true,
			input: {
				email: 'test@test.com'
			},
			info: '',
			pass_info: 'Enter the email address used with your account, and we’ll email you a link to reset your password'
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

			if (vm.input.email != '') {
				instance.post(url, formdata, { headers: { 'Content-Type': 'application/json' }
				}).then( function(resp) {
					if (resp.data == 'e') {
						vm.info = 'That email wasn\'t found';
					}
					else {
						vm.info = 'Email sent with new password';
						vm.txtActive = false;
					}
				}).catch( function(err) { 
					vm.$router.replace({name: 'error'});
				});
			}

			else {
				vm.info = 'Please input your email';
			}
		}
	}
}
</script>