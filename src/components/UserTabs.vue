<template>
	<b-tabs class="user-b-tabs">
		<b-tab title="Home" active>
			<user-home-tab></user-home-tab>
		</b-tab>
		<b-tab title="Timeline">
			<user-timeline-tab></user-timeline-tab>
		</b-tab>
	</b-tabs>
</template>

<style>
.profile-tab-data {
  margin-top:5%;
  text-align: left;
  font-weight: 600;
  color: #0062cc;
}

label {
	font-weight: bold;
	color: black;
}
</style>