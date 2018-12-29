<template>
  <div>
  <div id="chat-button-widget">
  <a href="#" v-on:click="open = !open">
    <img src="/public/img/socket.png"
          alt="Chat Picture"
          height="60px"
          width="60px" />
  </a>
  </div>
    <chat-box v-if="open"></chat-box>
</div>
</template>

<script>

export default {
  data () {
    return {
      open: false
    }
  },
  methods: {
  }
}
</script>

<style>
#chat-button-widget {
  position: fixed;
  bottom: 10px;
  right: 10px; 
}
</style>
