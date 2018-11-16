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

      console.log(`${process.env.NODE_ENV}`);

      axios.get(`${process.env.NODE_HOST}:${process.env.NODE_PORT}/api/test-sess`, {
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