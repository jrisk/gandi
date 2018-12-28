<template>
	<div class="container chat-box-container">

		<ul ref="messages" id="messages"></ul>

	  <form action="" ref="chatbox_form" id="chatbox" v-on:submit.prevent="form_submit()" class="col-md-12">
	    <input ref="input_m" id="m" autocomplete="off" />
	    <button type="submit">Send</button>
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
			socket: io('localhost:8080')
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

		  //window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight + 150);
		  fade(msgNode);
		});

		/*this.socket.on('join message', function(user) {
		  $('#messages').append($('<li>').addClass('joinClass').text(user + ' has joined'));
		});*/

		var msg = this.$refs.messages;
		var chatbox = this.$refs.chatbox_form;

		console.log(this.$refs);

		//msg.style.marginBottom = chatbox.clientHeight;

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
/*
* {  
padding: 0; 
box-sizing: border-box; 
}
body {  
font-family: Arial, Helvetica; 
}
*/
.chat-box-container {
	height: 50%;
	width: 50%;
	position: fixed;
	bottom: 10px;
	right: 10px;
	overflow: scroll; 

}
form { 
	background: #999; 
	padding: 3px; 
	position: fixed; 
	bottom: 0; 
	width: 100%; 
}
form input { 
	border: 0; 
	padding: 10px; 
	width: 90%; 
	margin-right: .5%; 
}
form button { 
	width: 9%; 
	background: rgb(130, 224, 255); 
	border: none; 
	padding: 10px; 
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
  */

.msg {
  display: inline;
  visibility: hidden;
  position: absolute;
 animation: rtol 3s; 
}
/* animate scroll the emoji */
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
</style>