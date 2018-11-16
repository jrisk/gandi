<template>
<div class="container emp-profile">
  <form method="post">

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
          <h5>
          First Name last naem
          </h5>
        </div>
      </div>

      <div class="col-md-2">
        <input type="submit" v-on:click="edit_profile()" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
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
  methods: {
    edit_profile () {
      vm.$router.replace({ name: "edit_profile" });
    }
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
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
</style>