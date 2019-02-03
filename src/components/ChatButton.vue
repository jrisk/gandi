<template>
  <div>
  <div id="chat-button-widget">
  <a href="#" v-on:click="open_chat()">
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
  },
  mounted() {
    const vm = this;

    EventBus.$on('open_chat', function(data) {
      vm.open_chat();
    });
    
  },
  methods: {
    open_chat() {
      if (this.$store.state.userSession) {
      var user_id = this.$store.state.userSession.id;

      this.$socket.emit('contact_list', ''); 
      
      this.open = true;
      }
      else {
        console.log('no user session');
      }
    }
  },
  computed: {
    logged() {
      return this.$store.getters.isLoggedIn;
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
