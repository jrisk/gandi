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
				<input ref="input_m" id="m" autocomplete="off" />
				<button class="btn" id="chat_button" type="submit">Send</button>
		  </form>

	</div>
</template>

<script>

export default {
	sockets: {
		chat_message: function(data) {
			console.log(data);
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
		minimize() {
			//this.open = false;
		},
		close() {
			this.open = false
			this.$emit("chatting", false);
		}
	},
	mounted () {

		const vm = this;

		//respond to chat message emit by server
		this.$socket.on('chat_message', function(data) {
			var msgs = vm.$refs.messages;

			var li = document.createElement("li")
			li.innerHTML = data.msg;
			//var li = '<li>test msg</li>';

			msgs.appendChild(li);

		  $('#messages')
		  .append($('<li>')
		      .append($('<h4>').addClass('time').text(data.time))
		      .append($('<b>').text(data.user))
		      .append($(data.emoji))
		      .append($('<p>').text(data.msg))
		    );
		    
		  var msgNode = msgs.lastChild;

		var container = vm.$refs.message_container;
		container.scrollTop = container.scrollHeight;

		  fade(msgNode);
		});

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
#chatbox-container {
	background-color: orange;
}
#message-container {
	height: 55%;
	width: 50%;
	bottom: 30px;
	right: 10px;
	overflow: scroll;
	position: fixed;
	background: #777;
}

#chat-options {
	height: 10%;
	width: 55%;
	bottom: 60%;
	right: 10px;
	position: fixed;
}

#chatbox_form {
	height: 5%;
	width: 50%;
	bottom: 20px;
	right: 5px;
	position: fixed;
}
#chatbox_form input {
	padding: 5px;
	width: 82%;
	margin-right: .5%; 
	margin-bottom: 1%;
}
#chatbox_form button { 
	width: 16%; 
	background: rgb(130, 224, 255);
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