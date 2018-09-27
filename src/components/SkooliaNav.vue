<template>
<b-navbar toggleable="md" type="dark" variant="primary">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand id="navbar-brand" href="#">Logo</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Find Teacher/Student</b-nav-item> 
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form id="skoolia-nav-form">
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">CZ</b-dropdown-item>
        <b-dropdown-item href="#">FR</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>

<style>

@media(min-width: 576px) and (max-width: 764px) {
  #skoolia-nav-form {
    display: block;
  }
}
</style>