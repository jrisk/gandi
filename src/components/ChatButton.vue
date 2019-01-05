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

export default {
  sockets: {
    customEmit: function (data) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
    }
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
  methods: {
  },
  computed: {
    open_chat: function () {
      this.open = true;
      return this.open;
    }
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
