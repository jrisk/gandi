<template>
<div class="container emp-profile" v-if="user">

<form enctype="multipart/form-data" id="photo-form">
  <div class="row">
      <div class="col-md-4 col-sm-12">
        <div class="profile-img">
          <img v-bind:src="user.img_url" alt="img">
        </div>
    </div>

      <div class="col-md-6 col-sm-12">
        <div class="profile-head">
          <h5>
          <p>{{user.first_name}}'s Profile</p>
          <p>{{user.profession}}</p>
          <p v-if="user.profession_raw != '1'">{{user.lang}}</p>
          </h5>
        </div>
      </div>

      <div class="profile-edit col-md-2 col-sm-12">
          <div class="profile-edit-btn">
            <button v-if="$store.getters.isLoggedIn" v-on:click="direct_msg()" class="btn btn-lg btn-primary" type="button">Message</button>
          </div>
      </div>
  </div>

  <div class="row">

    <div class="col-md-4">
      <label for="about_me" class="col-form-label">About Me</label>
      <div id="about-me">{{user.about_me}}</div>
    </div>

    <div class="col-md-8 user-tabs">
      <div class="profile-tab-data">

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
    </div>

  </div>
</form>           
</div>
</template>

<script>
import axios_b from '../../url_method.js';
import EventBus from '../../event-bus.js';

export default {
  data () {
    return {
      user: {
        id: 777,
        about_me: "skoolia profile about me stuff",
        img_url: "/public/img/profile_default.png",
        lang: ""
      }
    }
  },
  created() {
      const vm = this;
      var url = '/api/users/' + this.$route.params.id;

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
    direct_msg() {
      var to_id = parseInt(this.$route.params.id,10);
      var from_id = this.$store.state.userSession.id
      this.$socket.emit('direct_msg', {from_id: from_id, to_id: to_id });
      EventBus.$emit('open_chat', {from_id: from_id, to_id: to_id });
    }
  },
  mounted: function() {
  },
  computed: {
    computed_auth() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>

<style scoped>

body{
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
    text-align: center;
}

.profile-tab-data {
  margin-top:5%;
  text-align: left;
  font-weight: 600;
  color: #0062cc;
}

label {
  font-weight: bold;
  color: black;
}

@media (min-width: 768px) {
  .user-tabs {
    margin-top: -8%;
  }
}

.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}

@media (min-width: 765px) {
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
    white-space: normal;
  }
}

@media (max-width: 764px) {
  .profile-edit-btn {
    width: 100%;
    padding: 2%;
    text-align: center;
  }
}
.profile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.profile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
</style>