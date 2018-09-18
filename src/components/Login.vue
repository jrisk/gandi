<template>
    <div id="login">
        <h1>Login</h1>
        <form @keydown.enter="login()">
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login'
}

</script>

<style>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>