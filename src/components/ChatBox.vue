<template>
	<div id="chatbox-container">

		<div id="chatbox-options" class="row form-group">
			<div class="col-6 chat-header-div">
				<span class="chat-text-span" id="chat-header" ref="chat_header">Skoolia Chat</span>
			</div>
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
			var c_header = this.$refs.chat_header;
			c_header.innerHTML = data.user;
		},
		login_client: function(data) {
			console.log('in chatbox');
			this.original_user = data.user;
		},
		chat_message: function(data) {
			console.log(data);

			var msgs = this.$refs.messages;

			var msg_li = document.createElement("li");

			msg_li.style.minHeight = '50px';
			msg_li.style.marginLeft = '0';
			
			var msg_span = document.createElement("span");

			msg_span.innerHTML = data.msg;
			msg_span.style.wordWrap = 'break-word';

			var time_b = document.createElement("h6")
			time_b.innerHTML = data.time;

			var user_c = document.createElement("span")
			user_c.innerHTML = data.user;

			var img_d = document.createElement("img")

			img_d.src = data.avatar;
			img_d.className = 'chat-img';

			img_d.style.height = '50px';
			img_d.style.width = '50px';
			img_d.style.borderRadius = '50%';

			if (data.user == this.original_user) {
				msg_li.className = 'self';
				msg_li.style.background = '#999';
				img_d.style.position = 'relative';
				img_d.style.marginLeft = '0';
				img_d.style.paddingLeft = '4px'

			}
			else {
				msg_li.className = 'other';
				msg_li.style.background = '#777';
				img_d.style.position = 'relative';
				img_d.style.float = 'right';
			}

			msgs.appendChild(msg_li);

			msg_li.appendChild(img_d);
			msg_li.appendChild(msg_span);
			msg_li.appendChild(time_b);

			var msgNode = msgs.lastChild;

			var container = this.$refs.message_container;
			
			container.scrollTop = container.scrollHeight;

			//if true, self, if false, other
			//this.fade(msgNode, this.original_user == data.user);
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
		},
		minimize() {
			this.open = false;
			this.$emit("chatting", false);
		},
		close() {
			this.open = false;
			this.$emit("chatting", false);
		}
	},
	mounted () {
		this.$socket.emit('join', 'joining');
		this.$refs.input_m.focus();
	}
}
</script>

<style scoped>

@media (max-width: 767px) {
	#chatbox-options {
		background: -webkit-linear-gradient(left, #e6f7f5, #b7f4ed);
		z-index: 1;
		top: 15%;
		height: 12%;
		width: 100%;
		position: fixed;
		margin: auto;
	}

	#message-container {
		height: 65%;
		width: 100%;
		top: 27%;
		bottom: 10%;
		margin: auto;
		z-index: 0;
		overflow: scroll;
		position: fixed;
		background: -webkit-linear-gradient(left, #8fe0f7, #00c6ff);
	}

	#chatbox-form {
		background: -webkit-linear-gradient(left, #e6f7f5, #b7f4ed);
		z-index: 1;
		width: 100%;
		height: 10%;
		border-radius: 5px;
		border: 1px solid grey;
		bottom: 0;
		margin: auto;
		padding: 0;
		position: fixed;
	}
}

@media (min-width: 768px) {
	#message-container {
		height: 65%;
		width: 50%;
		bottom: 25px;
		right: 5px;
		margin: auto;
		overflow: scroll;
		position: fixed;
		background: -webkit-linear-gradient(left, #3931af, #00c6ff);
		border-radius: 5px;
	}
	#chatbox-options {
	height: 9%;
	width: 50%;
	bottom: 65%;
	right: 5px;
	position: fixed;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	margin: auto;
	background: -webkit-linear-gradient(left, #e6f7f5, #b7f4ed);
	z-index: 1;
	}

	#chatbox-form {
	height: 10%;
	width: 50%;
	bottom: 5px;
	right: 5px;
	margin: auto;
	border: 1px solid grey;
	position: fixed;
	border: 2px solid #3931af;
	background: -webkit-linear-gradient(left, #3931af, #00c6ff)
	}
}

#messages { 
	list-style-type: none;
}

#messages li { 
}

#messages > span {
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

.self > .chat-img {
}

.chat-text-span {
	position: absolute;
	bottom: 2px;
	font-size: 22px;
}

.chat-header-div {
	position: relative;
}
</style>