<template>
  <div id="app">
  	<Navigation></Navigation>
    <router-view></router-view>
    <!--<Chat></Chat>-->
  </div>
</template>

<script>
import Navigation from './components/SkooliaNav.vue'
/*import ChatButton from './components/ChatButton.vue'*/

export default {
	components: {
		'Navigation': Navigation,
    /*'Chat': ChatButton*/
	}
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>