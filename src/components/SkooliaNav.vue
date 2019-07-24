<template>
<b-navbar toggleable="md" type="dark" variant="primary">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand id="navbar-brand" href="#">Jarisk</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/home">Home</b-nav-item> 
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown text="Search by:">

        <div class="container" v-on:click="go_search()">
          <!--
        <b-form-group label="Skoolia Users">
          <b-form-checkbox-group buttons v-model="selected_type" button-variant="primary" name="user_types" :options="options">
            </b-form-checkbox-group>
          </b-form-group>
        -->
          <b-form-group label="Skoolia Users">
            <b-form-radio-group buttons button-variant="primary" id="radios1" v-model="selected_radio" :options="options" name="radio_users">
            </b-form-radio-group>
          </b-form-group>
        </div>
      </b-nav-item-dropdown>

      <nav class="nav navbar" id="skoolia-nav-form">
        <form class="form-inline" autocomplete="off">
          <input type="password" hidden>
          <input class="form-control mr-sm-2" id="users" ref="user_search" type="text" :placeholder="'Search ' + selected_radio" v-bind:value="search_word" />
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
      search_word: '',
      selected_type: [],
      selected_radio: '',
      options: [{text: "Teacher", value: "Teachers"},{text: "Student", value: "Students" }]
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

          var type = '2';
          var type_derp = 0;

          /*if (vm.selected_type.length == 1) {
            type = vm.selected_type[0] == 'Teachers' ? '0' : '1';
          }
          else {
            type_derp = 3;
          }*/

          // and user privacy set to = 1

          //bug, keeps returning duplicates

          if (vm.selected_radio != '') {
          type = vm.selected_radio == 'Teachers' ? '0' : '1';
          }
          else {
            type_derp = 3;
          }

          var suggestions = users.filter(function(n) {
              return n.label.toLowerCase().startsWith(text);
              }).filter(function(n) {
                  return n.profession == 2 || n.profession == type || n.profession < type_derp; 
            });
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

          div2.textContent = item.last_name;

          var img = document.createElement("img");
          
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
      //console.log(this.profileTypes);
    },
    go_search() {
      this.$refs.user_search.focus();
    },
    logout() {
      const vm = this;

      var url = '/logout';

      const instance = axios_b();

      instance.get(url).then( function(resp) {

        vm.user = {};
        vm.$store.state.userSession = null;

        vm.$socket.emit('logout');

        //vm.router.go();
        //window.location.reload(true);
        vm.$router.go('/login');
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