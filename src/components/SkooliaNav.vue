<template>
<b-navbar toggleable="md" type="dark" variant="primary">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand id="navbar-brand" href="#">Logo</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/home">Home</b-nav-item> 
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <nav class="nav navbar" id="skoolia-nav-form">
        <form class="form-inline" autocomplete="off">
          <input type="password" hidden>
          <input class="form-control mr-sm-2" id="users" type="text" placeholder="Search" v-bind:value="search_word" />
          <button size="sm" class="btn my-2 my-sm-0" v-on:click="search()">Go</button>
        </form>
      </nav>

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">CZ</b-dropdown-item>
        <b-dropdown-item href="#">FR</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="/profile">Profile</b-dropdown-item>
        <b-dropdown-item v-on:click="logout()">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<script>
import axios_b from '../../url_method.js';
import autocomplete from 'autocompleter';

export default {
  data() {
    return {
      users: {},
      search_val: 'Search',
      search_word: ''
    }
  },
  mounted () {
    const vm = this;

    var url = '/api/users';

    const instance = axios_b();

    instance.get(url).then( function(resp) {
    vm.users = resp.data;
    }).catch( function(err) { 
    });

      autocomplete({
        input: document.getElementById("users"),
        minLength: 1,
        fetch: function(text, update) {
          text = text.toLowerCase();

          var users = vm.users;

          var suggestions = users.filter(n => n.label.toLowerCase().startsWith(text))
          update(suggestions);
        },
        onSelect: function(item) {
          //document.getElementById('users').setAttribute('value', item.value);
          vm.search_val = item.value;
          vm.search_word = item.label;
          vm.$router.push({ name: "user_profile" , params: { id: vm.search_val } });
        },
        emptyMsg: 'No Users Found',
        render: function(item, currentValue) {
          var div = document.createElement("div");
          var div2 = document.createElement("p");
          var img = document.createElement("img");
          div2.textContent = item.last_name;
          img.setAttribute('src', item.img_url);
          img.setAttribute('width', 40);
          img.setAttribute('height', 40);
          img.className = 'select-img';
          //div.textContent = item.label;
          div.appendChild(div2);
          div2.parentNode.insertBefore(img, div2.nextSibling);

          return div;
        },
      });
  },
  methods: {
    search() {
      this.$router.replace({ name: "user_profile" , params: { id: this.search_val } });
    },
    logout() {
      const vm = this;

      var url = '/logout';

      const instance = axios_b();

      instance.get(url).then( function(resp) {

        vm.user = {};

        vm.$socket.emit('logout');

        vm.$router.replace({ name: "login" });
        }).catch( function(err) { console.log(err.code); })

    }
  }

}
</script>

<style>

@media(min-width: 576px) and (max-width: 764px) {
  #skoolia-nav-form {
    display: block;
  }
}

#nav_collapse {
  z-index: 2;
  background: #007bff;
}

.autocomplete {
  background: white;
  z-index: 3;
}

.autocomplete > .selected {
  background: #C1FAFF;
}

.autocomplete > div > p {
  margin-left: 20px;
  display: inline-block;
}

.autocomplete > div > .select-img {
  float: left;
}
</style>