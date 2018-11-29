<template>
<form>
    <div id="login" class="container form-group">
        <div class="row justify-content-center margin-spacer">
            <h1>Login</h1>
        </div>
        <div class="form-group row justify-content-center margin-spacer">
                <input class="form-control input-large" type="text" name="username" v-model="input.username" placeholder="Username" />
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
        <div class="row justify-content-center margin-spacer create-profile">
                <button type="button" class="btn btn-light" v-on:click="create_profile()">Not on Skoolia? Create a Profile</button>
        </div>
    </div>
</form>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    id: 0
                }
            }
        },
        created: function() {
            const vm = this;

            var port = process.env.NODE_PORT;
            var host = process.env.NODE_HOST;
            var url = '/api/user-sess';

            var url_env = host;

            if (port == 8080) {
              url_env = host + ':' + port;
            }

            var test_url = url_env + url;

            axios.get(test_url).then( function(resp) {

                console.log(resp.data);
                 if (resp.data.email) {
                    vm.$router.replace({ name: "profile" });
                 }
                 }).catch( err => console.log(err.code));
        },
        methods: {
            login() {
                const vm = this;

                if (this.input.username != "" && this.input.password != "") {

                var bodyForm = {};

                bodyForm.username = this.input.username;
                bodyForm.password = this.input.password;
                    
                    axios.post('/profile-login', bodyForm, {
                        port: 8080,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then( function(resp) { }
                    ).catch(err => 
                        (console.log(err))
                    ).then( function(res) {
                        vm.$router.replace({ name: "secure" });
                        }
                    );
                } else {
                    console.log("A username and password must be present");
                }
            },
            create_profile() {
                this.$router.replace({ name: "create" });
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