<template>
	<div id="chatbox-container">

		<div id="chatbox-options" class="row form-group">
				<div class="col-6 text-left chat-text-div">Skoolia Chat</div>
			<div v-on:click="minimize()" class="col-6 icon-div">
				<i class="far fa-minus-square skoolia-font"></i>
			</div>
		</div>

		<div ref="message_container" id="message-container" class="form-group">
			<ul ref="messages" id="messages"></ul>
		</div>

		<form ref="chatbox_form" id="chatbox-form" v-on:submit.prevent="form_submit()" class="row">
			<input ref="input_m" id="m" class="col-10" maxlength="140" autocomplete="off" >
			<button class="btn btn-md btn-primary col-2" id="chat-button" type="submit">Send</button>
		</form>
	</div>
</template>

<script>

export default {
	sockets: {
		join_message: function(data) {
			if (this.original_user != '') {

			}
			else {
				this.original_user = data.user;
			}
			console.log(this.original_user);
		},
		login_client: function(data) {
			console.log('in chatbox');
			this.original_user = data.user;
		},
		chat_message: function(data) {
			console.log(data);
			var msgs = this.$refs.messages;

			var msg_li = document.createElement("li")
			msg_li.innerHTML = data.msg;

			var time_b = document.createElement("h6")
			time_b.innerHTML = data.time;

			var user_c = document.createElement("span")
			user_c.innerHTML = data.user;

			//var img_d = document.createElement("img")
			//img_d.src = data.avatar;

			var self_other = '';

			if (data.user == this.original_user) {
				self_other = 'self';
				msg_li.className = 'self';
				msg_li.style.background = '#0000FF';
			}
			else {
				self_other = 'other';
				msg_li.className = 'other';
				msg_li.style.background = '#008000';
			}

			msgs.appendChild(msg_li);

			msg_li.appendChild(user_c);
			msg_li.appendChild(time_b);

			var msgNode = msgs.lastChild;

			var container = this.$refs.message_container;
			
			container.scrollTop = container.scrollHeight;

			this.fade(msgNode, self_other);
		} 
	},
	data () {
		return {
			info: "welcome to chat",
			open: true,
			min: false,
			original_user: "",
			chat_search: ""
		}
	},
	methods: {
		form_submit() {
			var m = this.$refs.input_m;

			this.$socket.emit('chat_message', m.value);
		  m.value = '';
		  return false;
		},
		fade(node, self) {
			var backgroundColor = '';
		if (self == 'self') {
			backgroundColor = '#FFFF';
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
		},
		minimize() {
			this.open = false
			this.$emit("chatting", false);
		},
		close() {
			this.open = false
			this.$emit("chatting", false);
		}
	},
	mounted () {

		console.log(localStorage);

		this.$socket.emit('join', 'joining');

		this.$refs.input_m.focus();

		var fade = function(node) {
		  var level = 1;
		  var step = function() {
		    var hex = level.toString(16);
		    node.style.backgroundColor = "#FFFF" + hex + hex;
		      if (level < 15) {
		        level++;
		        setTimeout(step, 100);
		        }
		      };
		      step();
		    }
	},
}
</script>

<style>

@media (max-width: 767px) {
	#chatbox-options {
		background: -webkit-linear-gradient(left, #e6f7f5, #b7f4ed);
		z-index: 1;
		margin-right: 0;
		height: 15%;
	}

	#message-container {
		background: -webkit-linear-gradient(left, #8fe0f7, #00c6ff);
		top: 27%;
		bottom: 25%;
		z-index: 0;
	}

	#chatbox-form {
		background: -webkit-linear-gradient(left, #e6f7f5, #b7f4ed);
		z-index: 1;
		height: 10%;
		border: 2px solid #3931af;
		border-radius: 5px;
		bottom: 0;
		margin-right: -5px;
		margin-left: 0;
		padding: 0;
	}
}

@media (min-width: 768px) {
	#message-container {
		height: 65%;
		width: 50%;
		bottom: 12px;
		right: 10px;
		overflow: scroll;
		position: fixed;
		background: -webkit-linear-gradient(left, #3931af, #00c6ff);
		border-radius: 5px;
	}
	#chatbox-options {
	height: 9%;
	width: 50%;
	bottom: 60%;
	right: 25px;
	position: fixed;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background: -webkit-linear-gradient(left, #e6f7f5, #b7f4ed);
	z-index: 1;
	}

	#chatbox-form {
	height: 10%;
	width: 50%;
	bottom: 5px;
	right: 10px;
	margin-left: 0;
	margin-right: 0;
	position: fixed;
	border: 2px solid #3931af;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff)
	}
	#messages { 
		list-style-type: none; 
		position: relative;
		margin-bottom: 5%;
		margin-top: 5%;
		padding-top: 5%;
	}
}

#messages li { 
	padding: 5px 10px; 
	word-wrap: break-word;
}
/*float right for person, left for response*/
#messages li span {
	float: right;
	font-size: 10px;
}

#messages li h6 {
	font-size: 10px;
}
#messages li:nth-child(odd) { 
	background: #eee; 
}
.self {
	background-color: blue;
	/*float: left;*/
}
.other {
	background-color: orange;
}

.skoolia-font {
	font-size: 34px;
	float: right;
	padding-left: 0;
	margin-left: 0;
}

.icon-div {
	padding: 5px;
}

.chat-text-div {
	font-size: 26px;
}
</style>