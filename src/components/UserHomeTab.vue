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
import axios_b from '../../url_method.js';

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