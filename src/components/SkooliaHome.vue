<template>
	<div>
		<skoolia-profile></skoolia-profile>
	</div>
</template>

<script>
/*import axios_b from '../../url_method.js'

export default {
  data () {
    return {
      user: {
        id: 777,
        about_me: "skoolia profile about me stuff",
        img_url: "/public/img/profile_default.png"
      }
    }
  },
  created() {
      const vm = this;
      var url = '/api/user-sess';

      const instance = axios_b();

      instance.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( function(resp) {
       vm.user = resp.data;
       }).catch( (err) => console.log(err) );
  },
  methods: {
    loadSesh () {
      this.$store.dispatch('loadSession');
      this.user = this.$store.state.testSession;
    },
    edit_view() {
        this.$router.replace({name: 'edit_profile'});
    }
  },
  mounted: function() {
    this.loadSesh();
    console.log('mounted');
  }
}*/
</script>