<template>
  <div class="container emp-profile">
    <form v-on:submit.prevent="confirm_pass_change()">

      <div class="form-group row">

        <label for="inputPassword3" class="col-sm-2 col-form-label">New Password</label>
        <div class="col-sm-10">

          <input type="password" class="form-control" id="inputPassword3" v-model="input.password" placeholder="Password">

        </div>
      </div>

      <div class="form-group row">

        <label for="inputPassword3" class="col-sm-2 col-form-label">Confirm Password</label>
        <div class="col-sm-10">

          <input type="password" class="form-control" id="inputPasswordConfirm" v-model="input.password_confirm" placeholder="Password">

        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" class="btn btn-primary">Reset Password</button>
        </div>
      </div>

    </form>
    <div>{{this.info}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import url_sesh from '../../url_method.js';

  export default {
    data() {
      return {
        input: {
          password: "",
          password_confirm: "",
          id: this.$route.params.id
        },
        info: 'pass change info'
      }
    },
    created() {
    },
    methods: {
      confirm_pass_change() {
        const vm = this;

        var reset_id = this.input.id;

        var endpoint = '/pass-reset';

        var urlArr = url_sesh(endpoint);

        var url_env = urlArr['url_env'];
        var url = urlArr['url'];

        const instance = axios.create({baseURL: url_env })

        const formdata = this.input;

        if (this.input.password == this.input.password_confirm) {

          instance.post(url, formdata, { headers: { 'Content-Type': 'application/json' }
          }).then( function(resp) {
              console.log(resp.data);
              vm.info = 'Password changed';
              vm.$router.replace({ name: "home", params: { new_pass: 1 } });
          }).catch( function(err) { 
            vm.$router.replace({name: 'error'});
          });
        }

        else {
          vm.info = 'Please input new password';
        }
      }
    }
  }
</script>