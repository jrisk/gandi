<template>
<div>

<div class="alert alert-primary create-profile" role="alert">info here</div>

  <div class="container emp-profile" v-if="input">

    <form v-on:submit="editProfile()">
      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">

          <input type="email" class="form-control" id="inputEmail3" v-model="input.email" placeholder="Email">

        </div>
      </div>
      <div class="form-group row">

        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">

          <input type="password" class="form-control" id="inputPassword3" v-model="input.password" placeholder="Password"
          autocomplete="">

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
          <div class="col-sm-12">

            <input class="form-check-input" type="checkbox" id="gridCheck1" v-model="input.send_emails">
            <label class="form-check-label" for="gridCheck1">
              Email me Skoolia updates
            </label>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-12">
          <button type="submit" class="btn btn-primary" v-on:click="loadEditSesh()">Sign Up</button>
        </div>
      </div>

    </form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      input: {

      }
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
    }
  }
}
</script>