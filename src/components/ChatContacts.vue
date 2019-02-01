<template>
			
			<div class="col-md-4 col-xl-3 chat">
				<div class="card mb-sm-3 mb-md-0 contacts_card">

					<div class="card-header">
						<div class="input-group">

							<input type="text" id="search-contacts" v-bind:placeholder="search_text" v-model="search_text" class="form-control search">
								
							<div class="input-group-prepend">
								<span class="input-group-text search_btn">
									<i class="fas fa-search"></i>
								</span>
							</div>

						</div>
					</div> <!-- end card-header -->

					<div class="card-body contacts_body">
						<ol class="contacts">

							<li v-for="contact in contacts" class="active" :id="'user'+contact.id">
								<div class="d-flex bd-highlight" v-on:click="load_msgs(contact.to_id, contact.from_id, contact.room)">
									<div class="img_cont">
										<img v-bind:src="contact.avatar" class="rounded-circle user_img">
										<span class="online_icon"></span>
									</div>
									<div class="user_info">
										<span>{{contact.name}}</span>
										<p>{{contact.name}} is online</p>
									</div>
								</div>
							</li>

						</ol>
					</div> <!-- end contacts body -->

					<div class="card-footer"></div>

				</div>
			</div>
		
		<!-- <div class="col-md-8 col-xl-6 chat">
			<div class="card">
			<div class="card-header msg_head">
			-->
</template>

<script>
import EventBus from '../../event-bus.js';

export default {
	data () {
		return {
			search_text: "Search Contacts",
			user_id: '1'
		}
	},
	props: ['contacts'],
	sockets: {
	},
	created () {
		console.log('created contacts called');
	},
	mounted () {
		console.log('contacts mounted called');
	},
	methods: {
		load_msgs(user_id, from_id, room) {
			console.log('in load msgs');
			console.log(user_id + ' ' + from_id + ' ' + room);
			EventBus.$emit('change_chat', {to_id: user_id, from_id: from_id, room: room});
		}
	}
}
</script>

<style scoped>

.chat {
	margin-top: auto;
	margin-bottom: auto;
	z-index: 101;
	position: fixed;
	right: 10px;
	bottom: 10px;
	width: 100%;
}
.card {
	height: 500px;
	border-radius: 15px !important;
	background-color: rgba(0,0,0,0.8) !important;
}
.contacts_body{
	padding:  0.75rem 0 !important;
	overflow-y: auto;
	white-space: nowrap;
}

.card-header{
	border-radius: 15px 15px 0 0 !important;
	border-bottom: 0 !important;
}
.card-footer{
	border-radius: 0 0 15px 15px !important;
	border-top: 0 !important;
}

.search{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0,0,0,0.3) !important;
	border:0 !important;
	color:white !important;
}
.search:focus{
  box-shadow:none !important;
  outline:0px !important;
}
.search_btn{
	border-radius: 0 15px 15px 0 !important;
	background-color: rgba(0,0,0,0.3) !important;
	border:0 !important;
	color: white !important;
	cursor: pointer;
}
.contacts{
	list-style: none;
	padding: 0;
}
.contacts li{
	width: 100% !important;
	padding: 5px 10px;
	margin-bottom: 15px !important;
}
.active{
	background-color: rgba(0,0,0,0.3);
}
.user_img{
	height: 70px;
	width: 70px;
	border:1.5px solid #f5f6fa;
}
.img_cont{
	position: relative;
	height: 70px;
	width: 70px;
}

.online_icon{
	position: absolute;
	height: 15px;
	width:15px;
	background-color: #4cd137;
	border-radius: 50%;
	bottom: 0.2em;
	right: 0.4em;
	border:1.5px solid white;
}
.offline{
	background-color: #c23616 !important;
}
.user_info{
	margin-top: auto;
	margin-bottom: auto;
	margin-left: 15px;
}
.user_info span{
	font-size: 20px;
	color: white;
}
.user_info p{
	font-size: 10px;
	color: rgba(255,255,255,0.6);
}

@media(max-width: 576px){
	.contacts_card{
		margin-bottom: 15px !important;
	}
}
</style>