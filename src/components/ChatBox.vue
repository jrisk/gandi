<template>

	<div class="container-fluid h-100" id="chatbox-container">
		<div class="row justify-content-right h-100">
		
			<ChatContacts v-if="contact_open == true" v-bind:contacts="contactList"></ChatContacts>

			<div id="hidden-chat" ref="hidden_chat" hidden>
			</div>

				<div class="col-md-8 col-xl-6 chat">
					<div class="card chat-card">

						<div class="card-header msg_head">

							<div class="d-flex bd-highlight">

								<div class="img_cont">
									<img v-bind:src="topUserImg" id="top-user-img" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>

								<div class="user_info">
									<span id="chat-header" ref="chat_header"></span>
									<p>183 Messages</p>
								</div>

							</div> <!-- bd highlight -->

							<div class="video_cam">
								<span v-on:click="open_contacts()">
									<i class="far fa-address-card skoolia-font"></i>
								</span>
								<span v-on:click="minimize()">
									<i class="far fa-minus-square skoolia-font"></i>
								</span>
							</div>

						</div> <!-- card header -->

						<div class="card-body msg_card_body" ref="message_container">

						</div> <!-- card-body -->

						<div class="card-footer">
						<form ref="chatbox_form" id="chatbox-form" v-on:submit.prevent="form_submit()" class="row">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<input ref="input_m" class="form-control type_msg" maxlength="140" autocomplete="off" placeholder="Type your message...">
								<button class="btn btn-primary" type="submit">
									<div class="input-group-append">
										<span class="input-group-text send_btn">
											<i class="fas fa-location-arrow"></i>
										</span>
									</div>
								</button>
							</div>
						</form>
						</div> <!-- card footer -->

					</div> <!-- card -->
				</div> <!-- chat md-8 -->
			</div> <!-- row -->
		</div> <!-- container -->

</template>

<script>
import EventBus from '../../event-bus.js';
import ChatContacts from './ChatContacts.vue';

export default {
	data () {
		return {
			info: "welcome to chat",
			open: true,
			min: false,
			original_user: "",
			other_user: "",
			chat_search: "",
			contact_open: false
		}
	},
	props: ['contactList', 'roomList', 'topUserImg'],
	components: {
		ChatContacts
	},
	sockets: {
		direct_msg: function(data) {
			console.log('direct msg called');

			var from = data.from_id;
			var to = data.to_id;

			if (this.original_user != '') {
			}
			else {
				this.original_user = this.$store.state.userSession.id;
			}

			this.other_user = from == this.original_user ? to : from;

			console.log(this.other_user);
			console.log(data.room);

			this.change_chat(to, from, data.room);
			console.log('end direct msg');
		},
		chat_message: function(data) {

			console.log('in chat msgs');
			console.log(data.room);

			var msgs = document.getElementById('room'+data.room);

			console.log(msgs);

			var container = this.$refs.message_container;

			var styled_msg = this.style_message(data);

			//bug on append, msgs is null sometimes
			msgs.appendChild(styled_msg);
			
			container.scrollTop = container.scrollHeight;
			
		} 
	},
	watch: {
		original_user: function(new_val, old_val) {
			console.log('new: ' + new_val + ' old: ' + old_val);
		}
	},
	methods: {
		open_contacts() {
			this.contact_open = !(this.contact_open);
		},
		assemble_chat() {

			var rooms = this.roomList;

			var contacts = this.contactList;

			console.log('loading contacts');
			console.log(contacts);

			var container = this.$refs.message_container;

			var hidden_container = document.getElementById('hidden-chat');

			var msg_box = '';

			//make sure container empty on each call
			if (hidden_container.firstChild) {
				while (hidden_container.firstChild) {
					hidden_container.removeChild(hidden_container.firstChild);
				}
			}

			var home_room = 0;

			for (var i = rooms.length - 1; i >= 0; i--) {

				var d_obj = rooms[i];
				var d_id = d_obj.id;
				var d_val = d_obj.value

				if (home_room == 0 && d_obj.to_id == d_obj.from_id) {
					home_room = d_id;
				}

				if (document.getElementById('room'+d_id) != null) {
					msg_box = document.getElementById('room'+d_id);
				}
				else {
					msg_box = document.createElement('div');
					msg_box.id = 'room'+d_id;
					hidden_container.appendChild(msg_box);
				}

				var styled_msg = this.style_message(d_val);

				msg_box.appendChild(styled_msg);
			}

			var home = document.getElementById('room'+home_room);

			if (!container.firstChild) {
				container.appendChild(home);
			}

		},
		style_message(data) {

			var msg_contain = document.createElement('div');

			msg_contain.className = 'd-flex mb-4';

			var img_contain = document.createElement('div');
			img_contain.className = 'img_cont_msg';

			var img_d = document.createElement('img');

			img_d.src = data.avatar;

			var top_img = document.getElementById('top-user-img');

			top_img.src = data.avatar;

			img_d.className = 'rounded-circle user_img_msg';

			var msg_cot = document.createElement('div');

			msg_cot.innerHTML = data.msg;
			
			var time_span = document.createElement("span");

			time_span.innerHTML = data.time;

			img_contain.appendChild(img_d);

			//msg_cot.appendChild(time_span);

			//from_id user_id
			if (data.from_id == this.original_user) {
				msg_contain.className += ' justify-content-end';
				msg_cot.className = 'msg_cotainer_send';
				time_span.className = 'msg_time_send';

				msg_contain.appendChild(time_span);
				msg_contain.appendChild(msg_cot);
				msg_contain.appendChild(img_contain);

			}
			else {
				msg_contain.className += ' justify-content-start';
				msg_cot.className = 'msg_cotainer';
				time_span.className = 'msg_time';

				msg_contain.appendChild(img_contain);
				msg_contain.appendChild(msg_cot);
				msg_contain.appendChild(time_span);
			}

			return msg_contain;
		},
		change_chat(to_id, from_id, room) {

			this.other_user = to_id == this.original_user ? from_id : to_id;

			console.log('not me: ' + this.other_user);

			console.log('change to ' + room);

			var container = this.$refs.message_container;
			var hidden_container = this.$refs.hidden_chat;

			var msg_box = '';

			if (document.getElementById('room'+room) != null) {
				 msg_box = document.getElementById('room'+room);
				 console.log(room + ' exists');
			}
			else {
				console.log(room + ' does not exist');
				console.log('this shouldnt be tripped');
					msg_box = document.createElement('div');
					msg_box.id = 'room'+room;
			}

			/*while (container.childNodes.length > 0) {
    		hidden_container.appendChild(container.childNodes[0]);
			}*/

			while (container.childNodes.length > 0) {
				hidden_container.appendChild(container.childNodes[0]);
				//container.removeChild(container.childNodes[0]);
			}

			container.appendChild(msg_box);

			var c_header = this.$refs.chat_header;
			c_header.innerHTML = 'To: ' + this.other_user;

			this.contact_open = false;
		},
		form_submit() {
			var m = this.$refs.input_m;
			var sender = this.original_user;

			var receiver = this.other_user;

			var room = this.original_user < this.other_user ? this.original_user + '.' + this.other_user : this.other_user + '.' + this.original_user;

			console.log('form submit client');
			console.log(room);

			this.$socket.emit('chat_message', {msg: m.value, from_id: sender, to_id: receiver, room: room });
		  m.value = '';
		},
		minimize() {
			this.open = false;
			this.$emit("chatting", false);
		},
		close() {
			this.open = false;
			this.$emit("chatting", false);
		},		
		fade(node, self) {
			var backgroundColor = '';
		if (self == 'self') {
			backgroundColor = '#888';
		}
		else {
			backgroundColor = '#99FF';
		}
		  var level = 1;
		  var step = function() {
		    var hex = level.toString(16);
		    node.style.backgroundColor = backgroundColor + hex + hex;
		      if (level < 15) {
		        level++;
		        setTimeout(step, 100);
		        }
		      };
		      step();
		}
	},
	created() {
	},
	mounted () {
		const vm = this;

		this.original_user = this.$store.state.userSession.id;

		this.other_user = this.other_user == '' ? this.original_user : this.other_user;

		var msg_box = document.createElement('div');

		var room = this.original_user < this.other_user ? this.original_user + '.' + this.other_user : this.other_user + '.' + this.original_user;

		msg_box.id = 'room'+room;

		document.getElementById('hidden-chat').appendChild(msg_box);
		//var container = this.$refs.message_container;

		//container.appendChild(msg_box);

		this.assemble_chat();

		EventBus.$on('load_contacts', function(data) {
			vm.contacts = data;
		});

		EventBus.$on('close_contacts', function(data) {
			vm.open_contacts();
		});

		EventBus.$on('change_chat', function(data) {
			console.log(data.to_id);
			vm.other_user = data.to_id;
			vm.change_chat(data.to_id, data.from_id, data.room);
		});

		this.$refs.input_m.focus();
	}
}
</script>

<style>

#chatbox-container {
	background: #7F7FD5;
	background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
	background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
	background: -webkit-linear-gradient(left, #8fe0f7, #00c6ff);
}

.chat {
	margin-top: auto;
	margin-bottom: auto;
	z-index: 100;
	position: fixed;
	right: 10px;
	bottom: 5px;
	top: 5px;
	width: 100%;
}
.chat-card {
	height: 100%;
	border-radius: 15px !important;
	background-color: rgba(0,0,0,0.9) !important;
}

.card-header{
	border-radius: 15px 15px 0 0 !important;
	border-bottom: 0 !important;
}
.card-footer{
	border-radius: 0 0 15px 15px !important;
	border-top: 0 !important;
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

.msg_card_body{
	overflow-y: auto;
}
		.container{
			align-content: center;
		}
				.type_msg{
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
			height: 60px !important;
			overflow-y: auto;
		}
			.type_msg:focus{
		     box-shadow:none !important;
           outline:0px !important;
		}

				.attach_btn{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.send_btn{
	border-radius: 0 15px 15px 0 !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
				.user_img_msg{
			height: 40px;
			width: 40px;
			border:1.5px solid #f5f6fa;
		
		}

		.img_cont_msg{
			height: 40px;
			width: 40px;
		}
	.video_cam{
		position: absolute;
		right: 10px;
		top: 10px;
		/*margin-left: 60%;*/
		margin-top: 5px;
	}
	.video_cam span{
		color: white;
		font-size: 55px; /*20px*/
		cursor: pointer;
		padding-left: 2px;
		margin-left: 2px;
		/*margin-right: 20px*/
	}

/*.skoolia-font {
	font-size: 34px;
	float: right;
	padding-left: 0;
	margin-left: 0;
}
*/
	.msg_cotainer{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10px;
		border-radius: 25px;
		background-color: #82ccdd;
		padding: 10px;
		position: relative;
	}
	.msg_cotainer_send{
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		border-radius: 25px;
		background-color: #78e08f;
		padding: 10px;
		position: relative;
	}
	.msg_time{
		/*position: absolute;
		left: 0;
		bottom: -15px;
		*/
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_time_send{
		/*position: absolute;
		right:0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
		*/
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_head{
		position: relative;
	}
	
#action_menu_btn{
	position: absolute;
	right: 10px;
	top: 10px;
	color: white;
	cursor: pointer;
	font-size: 20px;
}
	.action_menu{
		z-index: 1;
		position: absolute;
		padding: 15px 0;
		background-color: rgba(0,0,0,0.5);
		color: white;
		border-radius: 15px;
		top: 30px;
		right: 15px;
		display: none;
	}
	.action_menu ul{
		list-style: none;
		padding: 0;
	margin: 0;
	}
	.action_menu ul li{
		width: 100%;
		padding: 10px 15px;
		margin-bottom: 5px;
	}
	.action_menu ul li i{
		padding-right: 10px;
	
	}
	.action_menu ul li:hover{
		cursor: pointer;
		background-color: rgba(0,0,0,0.2);
	}
</style>