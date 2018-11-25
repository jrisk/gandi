<template>
<div class="container emp-profile">
  <form v-on:submit="editProfile()">

  <b-modal id="changePicModal" title="Skoolia">
    <p class="my-4">Change your Picture</p>
  </b-modal>

    <div class="row">
      <div class="col-md-4">
        <div class="profile-img" href="#" v-b-modal.changePicModal>
          <img src="/public/img/happy.png" alt=""/>
          <div class="file btn btn-lg btn-primary">
            Change Photo
            <input type="file" name="file"/>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="profile-head">
          <h5 type="button" v-if="user">
          <p> {{user.first_name }} {{ user.last_name }}</p>
          </h5>
        </div>
      </div>

      <div class="col-md-2">
        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
      </div>

    </div>

  <div class="row">

    <div class="col-md-4">
      <user-profile-work></user-profile-work>
    </div>

    <div class="col-md-8 user-tabs">
      <user-tabs></user-tabs>
    </div>

  </div>
  </form>           
</div>
</template>

<script>
export default {
  data: {
    user: {
      id: 777,
      about_me: "skoolia profile about me stuff"
    }
  },
  methods: {
    loadSesh () {
      this.$store.dispatch('loadSession');
    },
    editProfile() {
      this.$router.replace({ name: "edit_profile" });
    }
  },
  mounted: function() {
    this.loadSesh();
    console.log('done loading sesh');
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