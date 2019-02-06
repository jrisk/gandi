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
    getSocketSession(data) {
      console.log('get socket session called');

      //this is persisting on logout, fix
      console.log(this.$store.state.userSession.id);

      if (data.user_id == this.$store.state.userSession.id) {
        //are these returnables mounted?
        this.$socket.emit('login', data.user_id);
        this.$socket.emit('contact_list', data.user_id);
        this.loggedIn = true;
      }
      else {
        console.log('socket session id not same as store session id');
        console.log(this.socketID = data.user_id);
      }
    }
  },
  components: {
    ChatBox
  },
  data () {
    return {
      open: false,
      chat: true,
      chatting: true,
      loggedIn: false,
      socketID: ''
    }
  },
  created () {
  },
  mounted() {
    const vm = this;

    this.$socket.emit('get-session', {});

    EventBus.$on('open_chat', function(data) {
      vm.open_chat();
    });
    
  },
  methods: {
    open_chat() {
      if (this.loggedIn) { 
        this.open = true;
      }
      else {
        console.log('user session not aligned');
        console.log(this.socketID);
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
