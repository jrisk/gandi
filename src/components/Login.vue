<template>
<form>
    <div id="login" class="container">
        <div class="row justify-content-center margin-spacer">
            <h1>Login</h1>
        </div>
        <div class="row justify-content-center margin-spacer">
                <input class="form-control input-large" type="text" name="username" v-model="input.username" placeholder="Username" />
        </div>
        <div class="row justify-content-center margin-spacer">
                <input type="password" name="password" class="form-control input-large" v-model="input.password" placeholder="Password" />
        </div>
        <div class="row justify-content-center margin-spacer">
                <button type="submit" class="btn btn-primary" v-on:click="login()">Login</button>
        </div>
        <div class="row justify-content-center margin-spacer create-profile">
                <button type="button" class="btn btn-light" v-on:click="create_profile()">Not on Skoolia? Create a Profile</button>
        </div>
    </div>
</form>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {

                if (this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
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