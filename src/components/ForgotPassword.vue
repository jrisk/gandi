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
			if (this.input.email == '') {
				//db_check
				//mailgun
			}
		}
	}
}
</script>