<template>
<div>
<skoolia-nav></skoolia-nav>

<div class="alert alert-primary create-profile" role="alert">{{info}}
</div>

  <div class="container emp-profile">
    <form v-on:submit="sign_up()">
      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">

          <input type="email" class="form-control" id="inputEmail3" v-model="input.email" placeholder="Email">

        </div>
      </div>
      <div class="form-group row">

        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">

          <input type="password" class="form-control" id="inputPassword3" v-model="input.password" placeholder="Password">

        </div>
      </div>
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-form-label col-sm-2 pt-0">I want to</legend>
          <div class="col-sm-10">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="1" v-model="input.teach" checked>
              <label class="form-check-label" for="gridRadios1">
                Teach
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="1" v-model="input.learn">
              <label class="form-check-label" for="gridRadios2">
                Learn
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="1" v-model="input.teach_learn">
              <label class="form-check-label" for="gridRadios3">
                Both
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="form-group row">
        <div class="col-sm-2">Checkbox</div>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck1" v-model="input.send_emails">
            <label class="form-check-label" for="gridCheck1">
              Email me Skoolia updates sometimes
            </label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      input: {
        email: "",
        password: "",
        teach: 0,
        learn: 0,
        teach_learn: 0,
        send_emails: 0
      },
      info: "Create Skoolia Profile"
    }
  },
  methods: {
    sign_up() {

    if (this.input.username != "" && this.input.password != "") {

      var formdata = this.input;

      axios
      .post('/profile_create', formdata, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then (resp => (this.info = 'profile saved'))
      this.$router.replace({ name: "profile" });

      this.info = "Profile Saved";
      }
    }
  }
}
</script>

<style>

body{
  background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}

.create-profile {
  text-weight: bold;
  text-align: center;
}
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;

    border-radius: 0.5rem;
    background: #fff;
    text-align: center;
}
</style>