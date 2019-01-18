<template>
  <div>
  <div id="chat-button-widget">
  <a href="#" v-on:click="open = chat">
    <img src="/public/img/socket.png"
          alt="Chat Picture"
          height="60px"
          width="60px" />
  </a>
  </div>
  <keep-alive>
    <ChatBox v-if="open" v-on:chatting="open = !open"></ChatBox>
  </keep-alive>
</div>
</template>

<script>
import ChatBox from './ChatBox.vue';
import EventBus from '../../event-bus.js';

export default {
  sockets: {
    customEmit: function (data) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
    }
    /*login_client: function(data) {
      this.open = false;
      console.log('in chatbutton');
    },*/
  },
  components: {
    ChatBox
  },
  data () {
    return {
      open: false,
      chat: true,
      chatting: true
    }
  },
  created () {
    const vm = this;

    this.$socket.on('join', function(info) {
      console.log('join fired');
      vm.socket.emit('join', info);
      return false;
    });
  },
  mounted() {
    const vm = this;
    EventBus.$on('open_chat', function(data) {
      console.log(data);
      vm.open = true;
    });
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style>
#chat-button-widget {
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 30px;
  background: -webkit-linear-gradient(left, #8fe0f7, #00c6ff);
}
</style>
