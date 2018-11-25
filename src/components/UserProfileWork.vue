<template>
  <div>
    <div class="container">{{user.about_me}}</div>
  </div>
</template>

<script>
export default {
  data () {
  return {
    user: {
      about_me: "about me non-global"
      }
    }
  }
}
</script>

<style>
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
</style>