<template>
 <div class="container emp-profile">
	<div>{{this.info}}</div>
	<a href="/" type="button">{{this.home}}</a>
</div>
</template>

<script>
	export default {
		data() {
			return {
				info: 'You have been logged out',
				home: 'Click here to return to the Home Page',
				new_pass: 0
			}
		}
	}
</script>

