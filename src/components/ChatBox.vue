<template>
	<div id="chatbox-container">

			<div id="chat-options" class="form-group row justify-content-end">
				<div id="chat-options-pad">

				<input v-model="chat_search">
				
				<button aria-label="Minimize" type="button" id="chat-minimize" v-on:click="minimize()" class="btn btn-md btn-warning">~</button>
				
				<button aria-label="Close" type="button" id="chat-close" v-on:click="close()" class="btn btn-md btn-primary">X</button>

				</div>

			</div>

		<div ref="message_container" id="message-container">
			<ul ref="messages" id="messages"></ul>
		</div>

			<form ref="chatbox_form" id="chatbox-form" v-on:submit.prevent="form_submit()">
				<div id="chatbox-form-pad">
					<input ref="input_m" id="m" maxlength="140" autocomplete="off" />
					<button class="btn btn-sm btn-primary" id="chat_button" type="submit">Send</button>
				</div>
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
  #message-container {
    height: 70%;
    width: 100%;
    bottom: 5px;
	right: 1px;
	padding-top: 5px;
	margin-bottom: 5px;
	overflow: scroll;
	position: fixed;
	border-radius: 5px;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  }
  #chat-options {
	height: 12%;
	width: 100%;
	top: 80px;
	padding-bottom: 10px;
	right: 15px;
	position: fixed;
	z-index: 1;
	border-radius: 5px;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff);
	}

	#chatbox-form {
	height: 5%;
	width: 100%;
	bottom: 25px;
	right: 5px;
	padding-left: 20px;
	padding-top: 5px;
	margin-left: 5px;
	position: fixed;
	z-index: 1;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff);
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
	#chat-options {
	height: 8%;
	width: 50%;
	bottom: 60%;
	right: 25px;
	position: fixed;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff);
	z-index: 1;
	}

	#chatbox-form {
	height: 5%;
	width: 50%;
	bottom: 20px;
	right: 5px;
	position: fixed;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff)
	}
}
#chatbox-form input {
	width: 82%;
}

#chat-options-pad {
}

#chatbox-form-pad {

}

#chat-options input {
}

#chatbox-form button { 
	width: 16%;
}

#messages { 
	list-style-type: none; 
	position: relative;
	margin-bottom: 5%;
	margin-top: 10%;
}

#messages li { 
	padding: 5px 10px; 
	word-wrap: break-word;
}

.self {
	background-color: blue;
	/*float: left;*/
}
.other {
	background-color: orange;
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
</style>