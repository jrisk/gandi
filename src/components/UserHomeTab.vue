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
        <p>{{user.first}} {{user.last}}</p>
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

      console.log('userhometab created');

      var port = process.env.NODE_PORT;
      var host = process.env.NODE_HOST;
      var url = '/api/user-sess';

      var url_env = host;

      if (process.env.NODE_ENV != 'prod') {
        url_env = host + ':' + port;
      }

      const instance = axios.create({baseURL: url_env })

      var test_url = url_env + url;

      instance.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( function(resp) {
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