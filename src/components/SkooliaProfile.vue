<template>
<div class="container emp-profile" v-if="user">

<form enctype="multipart/form-data" v-on:submit.prevent="edit_view()" id="photo-form">
  <div class="row">
      <div class="col-md-4">
        <div class="profile-img" href="#">
          <img v-bind:src="user.img_url" alt=""/>
        </div>
      </div>

      <div class="col-md-6">
        <div class="profile-head">
          <h5 v-if="user">
          <p>My {{user.profession}} Profile</p>
          <p v-if="user.profession_raw != '1'">{{user.lang}}</p>
          </h5>
        </div>
      </div>

      <div class="col-md-2">
        <input type="submit" class="profile-edit-btn" value="Edit Profile"/>
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
import axios_b from '../../url_method.js'

export default {
  data () {
    return {
      user: {
        id: 0,
        about_me: "skoolia profile about me stuff",
        img_url: "/public/img/profile_default.png",
        offering: "Offers lessons in"
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

        if (resp.data.id == null) {
          vm.$router.replace({name: 'home'})   
        }
        else {
          vm.user = resp.data;
        }
       
       }).catch( (err) => console.log(err) );
  },
  methods: {
    loadSesh () {
      this.$store.dispatch('loadSession');
    },
    edit_view() {
      this.$router.replace({name: 'edit_profile'});
    }
  },
  mounted: function() {
    this.loadSesh();
  }
}
</script>

<style>

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