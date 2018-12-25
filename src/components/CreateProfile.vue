<template>
<div>

  <div class="container emp-profile">
    <form v-on:submit.prevent="sign_up()">
      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">

          <input type="email" class="form-control" id="inputEmail3" v-model="input.email" placeholder="Email">

        </div>
      </div>
      <div class="form-group row">

        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">

          <input type="password" minlength="4" class="form-control" id="inputPassword3" v-model="input.password" placeholder="Password">

        </div>
      </div>

      <div class="form-group row">

        <label for="inputPassword3" class="col-sm-2 col-form-label">Confirm Password</label>
        <div class="col-sm-10">

          <input type="password" minlength="4" class="form-control" id="inputPasswordConfirm" v-model="input.password_confirm" placeholder="Password">

        </div>
      </div>

      <div class="form-group row">

        <label for="firstname" class="col-sm-2 col-form-label">First Name (optional)</label>
        <div class="col-sm-10">

          <input type="string" class="form-control" id="inputfirstname" v-model="input.first_name" placeholder="First">

        </div>
      </div>

      <div class="form-group row">

        <label for="lastname" class="col-sm-2 col-form-label">Last Name (optional)</label>
        <div class="col-sm-10">

          <input type="string" class="form-control" id="inputlastname" v-model="input.last_name" placeholder="Last">

        </div>
      </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="teach_learn_label">{{teach_or_learn}}?</label>
      <div class="col-sm-10">
        <select class="form-control" id="teach_learn" v-model="input.teach_learn">
          <option value="0">{{teach}}</option>
          <option value="1">{{learn}}</option>
          <option value="2">{{both}}</option>
        </select>
      </div>
    </div>

      <div class="form-group row">
          <div class="col-sm-12">

            <input class="form-check-input" type="checkbox" id="gridCheck1" v-model="input.send_emails">
            <label class="form-check-label" for="gridCheck1">
              Email me Skoolia updates
            </label>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </form>

    <div class="alert alert-primary create-profile" role="alert">{{info}}
    </div>

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
        first_name: "",
        last_name: "",
        teach_learn: 0,
        send_emails: 0
      },
      info: "Choose a good password",
      teach: "Teacher",
      learn: "Learner",
      both: "Both",
      teach_or_learn: "Are you a Teacher or Learner"
    }
  },
  methods: {
    sign_up() {
    const vm = this;

    if (this.input.username != "" && this.input.password != "" && this.input.password == this.input.password_confirm) {

      var formdata = this.input;

      console.log(formdata);

      var port = process.env.NODE_PORT;
      var host = process.env.NODE_HOST;
      var url = '/profile-create';

      var url_env = host;

      if (process.env.NODE_ENV != 'prod') {
        url_env = host + ':' + port;
      }

      const instance = axios.create({baseURL: url_env })

      var test_url = url_env + url;

      instance
      .post(url, formdata, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then( function(resp) {

        console.log(resp);

        if (resp.data == 'Ok') {
          vm.info = 'Profile saved';
          vm.$router.replace({ name: "profile" });
        }

        else {
          vm.info = 'Email is already being used';
        }

      });

      } //end if all good
      else {

        if (this.input.password != this.input.password_confirm) {
          this.info = 'Password does not match';
        }
      }
    } //end method signup
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