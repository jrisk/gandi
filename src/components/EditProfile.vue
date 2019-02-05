<template>
<div>

<div class="alert alert-primary create-profile" role="alert">{{info}}</div>

  <div class="container emp-profile" v-if="input">

    <form enctype="multipart/form-data" v-on:submit.prevent="save_changes()" id="photo-form">
      <div class="form-group row">
          <div class="col-md-12">
            <div class="profile-img" href="#">
              <img v-bind:src="input.img_url" alt=""/>
              <div class="file btn btn-lg btn-primary">
                Change Photo
                <input v-on:change="preview()" ref="myFiles" type="file" name="myfile" accept=".jpg, .jpeg, .png" />
              </div>
            </div>
        </div>
      </div>

      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">

          <input type="email" class="form-control" id="inputEmail3" v-model="input.email" placeholder="Email">

        </div>
      </div>

      <div class="form-group row">
        <label for="changepass" class="col-sm-2 col-form-label">Change Password</label>
        <div class="col-sm-10">
          <button type="button" class="btn btn-primary" v-on:click="change_pass()">Make new Password</button>
        </div>
      </div>

      <div class="form-group row">

        <label for="firstname" class="col-sm-2 col-form-label">First Name</label>
        <div class="col-sm-10">

          <input type="string" class="form-control" id="input-first-name" v-model="input.first_name" placeholder="First">

        </div>
      </div>

      <div class="form-group row">

        <label for="lastname" class="col-sm-2 col-form-label">Last Name</label>
        <div class="col-sm-10">

          <input type="string" class="form-control" id="inputlastname" v-model="input.last_name" placeholder="Last">

        </div>
      </div>

    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="teach_learn_label">{{teach_or_learn}}?</label>
      <div class="col-sm-10">
        <select class="form-control" id="teach_learn" v-model="input.profession_raw">
          <option value="0">{{teach}}</option>
          <option value="1">{{learn}}</option>
          <option value="2">{{both}}</option>
        </select>
      </div>
    </div>

    <div class="form-group row" v-if="input.profession_raw != 1">
      <label class="col-sm-2 col-form-label" for="teach_option_label">{{teach_option_q}}?</label>
      <div class="col-sm-10">
        <select class="form-control" id="teach_option" v-model="input.lang_teach">
          <option v-for="option in teach_options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>

      <div class="form-group row">
        <label for="about_me" class="col-sm-2 col-form-label">About Me</label>
          <textarea rows="3" class="form-control" id="aboutme" v-model="input.about_me"></textarea>
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
          <button type="submit" class="btn btn-primary" v-on:click="save_changes()">Edit Profile</button>
        </div>
      </div>

    </form>
  </div>
</div>
</template>

<script>
import axios_b from '../../url_method.js'

export default {
  data () {
    return {
      input: {
        orig_email: '',
        img_url: '/public/img/profile_default.png',
        lang_teach: 0,
        teach_learn: 0,
        profession_raw: 0
      },
      info: "Edit Skoolia Profile",
      teach: "Teacher",
      learn: "Learner",
      both: "Both",
      teach_or_learn: "Are you a Teacher or Learner",
      teach_option_q: "What language do you teach",
      teach_options: [ {text: "English", value: 1, code: "en"}, {text: "Czech", value: 2, code: "cz"}, {text: "Spanish", value: 3, code: "sp"}, {text: "French", value: 4, code: "fr"}, {text: "Chinese", value: 5, code: "ch"}, {text: "Russian", value: 6, code: "ru"}]      
    }
  },
  mounted: function() {
     this.loadEditSesh();
  },
  created: function() {
  },
  methods: {
    loadEditSesh() {
      this.$store.dispatch('loadSession');
      this.input = this.$store.state.testSession;
      this.input.orig_email = this.$store.state.testSession.email;
    },
    change_pass() {
      this.$router.replace({name: 'forgot_password'});
    },
    preview() {
      const vm = this;
      const instance = axios_b();

      var url = '/file-upload';

      this.file = typeof this.$refs.myFiles.files[0] == 'undefined' ? this.input.img_url : this.$refs.myFiles.files[0];

      let formdata = new FormData();

      formdata.append('myfile', this.file);

      formdata.append('orig_email', this.input.orig_email);

      console.log(formdata.get('myfile'));

      instance.post(url, formdata, { headers: { 'Content-Type': 'multipart/form-data'} }).then( function(resp) {
          console.log(resp);
          vm.input.img_url = resp.data;
        }).catch(err => console.log(err) );
    },
    save_changes() {
      const vm = this;
      const instance = axios_b();

      var url = '/save-edit';

      this.file = typeof this.$refs.myFiles.files[0] == 'undefined' ? this.input.img_url : this.$refs.myFiles.files[0];

      let formdata = new FormData();

      console.log(this.file);

      formdata.append('myfile', this.file);
      formdata.append('first_name', this.input.first_name);
      formdata.append('last_name', this.input.last_name);
      formdata.append('about_me', this.input.about_me);
      formdata.append('orig_email', this.input.orig_email);
      formdata.append('email', this.input.email);
      var lang = this.input.lang_teach;
      formdata.append('lang_teach', lang);
      formdata.append('profession_raw', this.input.profession_raw);

      instance.post(url, formdata, { headers: { 'Content-Type': 'multipart/form-data'} }).then( function(data) {
        console.log(data.resp);
        vm.$router.replace({name: 'profile'});
        }).catch(err => console.log(err) );
    }
  }
}
</script>