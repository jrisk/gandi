<template>
<form>
    <div id="login" class="container form-group">
        <div class="row justify-content-center margin-spacer">
            <h1>Login</h1>
        </div>
        <span class="text-danger">{{this.info}}</span>
        <div class="form-group row justify-content-center margin-spacer">
                <input class="form-control input-large" type="text" name="username" v-model="input.username" placeholder="Email" />
        </div>
        <div class="row form-group justify-content-center margin-spacer">
                <input type="password"
                name="password" 
                autocomplete=""
                class="form-control input-large" v-model="input.password" placeholder="Password" />
        </div>
        <div class="row justify-content-center margin-spacer">
                <button type="button" class="btn btn-primary" v-on:click="login()">Login</button>
        </div>
                <div class="row justify-content-center margin-spacer forgot-password">
                <button type="button" class="btn btn-light" v-on:click="forgot_password()">Forgot Password? Click here</button>
        </div>
        <div class="row justify-content-center margin-spacer create-profile">
                <button type="button" class="btn btn-light" v-on:click="create_profile()">Not on Skoolia? Create a Profile</button>
        </div>
    </div>
</form>
</template>

<script>
import axios_b from '../../url_method.js'

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    id: 0
                },
                info: ''
            }
        },
        created: function() {
            const vm = this;

            var url = '/api/user-sess';

            const instance = axios_b();

            instance.get(url).then( function(resp) {

                console.log('user-sess call login');
                 if (resp.data.email) {
                    vm.$store.dispatch('setUser', resp.data);
                    vm.$router.replace({ name: "profile" });
                 }
                 }).catch( err => console.log(err));
        },
        methods: {
            login() {
                const vm = this;

                if (this.input.username != "" && this.input.password != "") {

                var bodyForm = {};

                bodyForm.username = this.input.username;
                bodyForm.password = this.input.password;

                const instance = axios_b();
                    
                    instance.post('/profile-login', bodyForm, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then( function(resp) {
                        console.log('first login then');
                        var usr = resp.data;
                        if (usr.email == 0) {
                          vm.info = "Username or Password not found"
                        }
                        else {
                            vm.$socket.emit('login', usr.id);
                            vm.$store.dispatch('setUser', usr);
                            //close current chat?
                        vm.$router.replace({ name: "profile" });
                        }
                    }).catch(err => 
                        (console.log(err))
                    );
                } else {
                    vm.info = 'No Username and Password present';
                }
            },
            create_profile() {
                this.$router.replace({ name: "create" });
            },
            forgot_password() {
              this.$router.replace({ name: "forgot_password" });
            }
        }
    }
</script>

<style scoped>
    #login {
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin-top: 25px;
        padding: 20px;
    }
    .margin-spacer {
        margin-bottom: 15px;
    }
    .create-profile {
        cursor: pointer;
    }
</style>