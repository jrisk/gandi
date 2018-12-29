<template>
	<div>
	<div ref="chat_container" id="chat-box-container">
		<ul ref="messages" id="messages"></ul>
	</div>
		  	<form action="" ref="chatbox_form" id="chatbox" v-on:submit.prevent="form_submit()">
			<input ref="input_m" id="m" autocomplete="off" />
			<button class="btn" id="chat_button" type="submit">Send</button>
	  	</form>
	  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
	data () {
		return {
			info: "welcome to chat",
			open: false, 
			socket: io(process.env.NODE_HOST+':'+process.env.NODE_PORT)
		}
	},
	methods: {
		form_submit() {
			var m = this.$refs.input_m;

			this.socket.emit('chat message', m.value);
		  m.value = '';
		  return false;
		}
	},
	mounted () {

		const vm = this;

		this.socket.on('join', function(info) {
		  vm.socket.emit('join', info);
		  return false;
		});

		//respond to chat message emit by server
		this.socket.on('chat message', function(data) {
			var msgs = vm.$refs.messages;

			var li = document.createElement("li")
			li.innerHTML = data.msg;
			//var li = '<li>test msg</li>';

			msgs.appendChild(li);

		  /*$('#messages')
		  .append($('<li>')
		      .append($('<h4>').addClass('time').text(data.time))
		      .append($('<b>').text(data.user))
		      .append($(data.emoji))
		      .append($('<p>').text(data.msg))
		    );
		    */
		  var msgNode = msgs.lastChild;

		var container = vm.$refs.chat_container;
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
#chat-box-container {
	height: 50%;
	width: 50%;
	bottom: 30px;
	right: 10px;
	overflow: scroll;
	position: fixed;
	background: #777;
}
#chatbox {
	height: 5%;
	width: 50%;
	bottom: 20px;
	right: 5px;
	position: fixed;
}
#chatbox input {
	padding: 5px;
	width: 82%;
	margin-right: .5%; 
	margin-bottom: 1%;
}
#chatbox button { 
	width: 16%; 
	background: rgb(130, 224, 255);
}
#messages { 
	list-style-type: none; 
	position: relative;
	margin-bottom: 5%;
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