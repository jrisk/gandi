<template>
  <div class="profile-tab-data">
  {{$store.state.userSession}}
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
        <p>{{user.first}}</p>
        <p>{{user.last}}</p>
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

    <div class="row">
      <div class="col-md-6">
        <label>Phone</label>
      </div>
      <div class="col-md-6">
        <p>{{user.phone}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label>Profession</label>
      </div>
      <div class="col-md-6">
        <p>{{user.profession}}</p>
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
      console.log('will user ever save');

      const vm = this;

      axios.get('/api/user-sess', {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( function(resp) {
      console.log('created resp');
      console.log(resp.data);
       vm.user = resp.data;
       });
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