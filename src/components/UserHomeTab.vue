<template>
  <div class="profile-tab-data">
    <div class="row">
      <div class="col-md-6">
        <label>User Id</label>
      </div>
      <div class="col-md-6">
        <p>{{user.id}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Name</label>
      </div>
      <div class="col-md-6">
        <p>{{user.first_name}} {{user.last_name}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Email</label>
      </div>

      <div class="col-md-6">
        <p>{{user.email}}</p>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

  export default {
    data () {
      return {
        user: {
          id: 4,
          first: "first",
          last: "asdf",
          email: "rrr"
        }
      }
    },
    created: function() {

      const vm = this;

      console.log('userhometab process');

      var port = process.env.NODE_PORT;
      var host = process.env.NODE_HOST;
      var url = '/api/user-sess';

      var test_url = host + ':' + port + url;

      axios.get(test_url, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( function(resp) {
      console.log('created resp');
      console.log(resp.data);
       vm.user = resp.data;
       }).catch( (err) => console.log(err) );
    },
    mounted: function() {
      this.loadSesh();
    },
    methods: {
      loadSesh () {
        this.$store.dispatch('loadSession');
      }
    }
  }
</script>