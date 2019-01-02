<template>
	<div id="chatbox-container" v-if="open">
			<div id="chat-options">
		  	<button aria-label="Close" type="button" id="chat-close" v-on:click="close()" class="btn btn-lg btn-primary float-right">X</button>
		  	<button aria-label="Minimize" type="button" id="chat-minimize" v-on:click="minimize()" class="btn btn-lg btn-warning float-right">~</button>
			</div>

		<div ref="message_container" id="message-container">
			<ul ref="messages" id="messages"></ul>
		</div>

			<form ref="chatbox_form" id="chatbox_form" v-on:submit.prevent="form_submit()">
				<input ref="input_m" id="m" maxlength="140" autocomplete="off" />
				<button class="btn btn-sm" id="chat_button" type="submit">Send</button>
		  </form>

	</div>
</template>

<script>

export default {
	sockets: {
		chat_message: function(data) {
			console.log(data);
			var msgs = this.$refs.messages;

			var msg_li = document.createElement("li")
			msg_li.innerHTML = data.msg;

			var time_b = document.createElement("span")
			time_b.innerHTML = data.time;

			msg_li.appendChild(time_b);

			msgs.appendChild(msg_li);

			var msgNode = msgs.lastChild;

			var container = this.$refs.message_container;
			
			container.scrollTop = container.scrollHeight;

			this.fade(msgNode);
		} 
	},
	data () {
		return {
			info: "welcome to chat",
			open: true,
			min: false
		}
	},
	methods: {
		form_submit() {
			var m = this.$refs.input_m;

			this.$socket.emit('chat_message', m.value);
		  m.value = '';
		  return false;
		},
		fade(node) {
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
    height: 85%;
    width: 100%;
    bottom: 1px;
		right: 1px;
		overflow: scroll;
		position: fixed;
		border-radius: 5px;
		background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  }
  #chat-options {
	height: 10%;
	width: 100%;
	top: 50px;
	right: 1px;
	position: fixed;
	z-index: 1;
	}

	#chatbox_form {
	height: 10%;
	width: 100%;
	bottom: 2px;
	right: 0px;
	position: fixed;
	background: #777
	}
}

@media (min-width: 768px) {
	#message-container {
		height: 55%;
		width: 50%;
		bottom: 30px;
		right: 10px;
		overflow: scroll;
		position: fixed;
		background: -webkit-linear-gradient(left, #3931af, #00c6ff);
		border-radius: 5px;
	}
	#chat-options {
	height: 10%;
	width: 50%;
	bottom: 60%;
	right: 10px;
	position: fixed;
	background: #777;
	z-index: 1;
	}

	#chatbox_form {
	height: 5%;
	width: 50%;
	bottom: 20px;
	right: 10px;
	position: fixed;
	background: #777
	}
}
#chatbox_form input {
	width: 82%;
}
#chatbox_form button { 
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
/*float right for person, left for response*/
#messages li span {
	float: right;
}
#messages li:nth-child(odd) { 
	background: #eee; 
}

  /* emoji support
  img.emoji {  
  // Override any img styles to ensure Emojis are displayed inline
  margin: 0px !important;
  display: inline !important;
  animation: rtol 3s;
  }

.msg {
  display: inline;
  visibility: hidden;
  position: absolute;
 animation: rtol 3s; 
}
@keyframes rtol {
  from {
    display: inline;
    visibility: visible;
    margin-left: 120%;
  }
  to {
    margin-left: -20%;
  }
}
*/
</style>