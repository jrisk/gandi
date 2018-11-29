<template>
<b-navbar toggleable="md" type="dark" variant="success">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand id="navbar-brand" href="#">Jarisk</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Javascript and More</b-nav-item> 
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>Projects</em>
        </template>
        <b-dropdown-item href="#">socket.io chat</b-dropdown-item>
        <b-dropdown-item href="#">jquery weather</b-dropdown-item>
        <b-dropdown-item href="#">angular video</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<style>

@media(min-width: 576px) and (max-width: 764px) {
  #jarisk-nav-form {
    display: block;
  }
}
</style>