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

      <b-nav-item-dropdown v-bind:text="'Search by: ' + profileTypes">
        <b-nav-form autocomplete="off">

        <!--@click.native.stop-->
          <b-dropdown-item-button>
              <b-form-checkbox id="teacher_select" value="Teacher" v-model="profileTypes">
                Teachers
              </b-form-checkbox>
          </b-dropdown-item-button>

          <b-dropdown-item-button>
              <b-form-checkbox id="student_select" value="Student" v-model="profileTypes">
                Students
              </b-form-checkbox>
          </b-dropdown-item-button>

        </b-nav-form>
      </b-nav-item-dropdown>

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
      search_word: '',
      profileTypes: ["Teacher"],
      type: "Teacher"
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

          //console.log(vm.users.length);
          console.log(vm.profileTypes.length);

          //being run twice

          var type = '2';
          var type_derp = 0;

          if (vm.profileTypes.length == 1) {
            type = vm.profileTypes[0] == 'Teacher' ? '0' : '1';
          }

          else {
            type_derp = 3;
          }
          // and user privacy set to = 1

          console.log('type = ' + type);
          console.log('types: ');
          console.log(vm.profileTypes);

          var suggestions = users.filter(function(n) {
              return n.label.toLowerCase().startsWith(text);
              }).filter(function(n) {
                  return n.profession == 2 || n.profession == type || n.profession < type_derp; 
            });

              console.log(suggestions);

            /*
          if (type != -1 && vm.profileTypes.length != 2) {
              var suggestions = users.filter(function(n) {
              return n.label.toLowerCase().startsWith(text);
              }).filter(function(n) {
              return n.profession == type || n.profession == 2; 
            })
          }

          else {
            var suggestions = users.filter(function(n) {
              return n.label.toLowerCase().startsWith(text);
              });
          }
          */
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