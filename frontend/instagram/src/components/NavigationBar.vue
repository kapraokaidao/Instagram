<template>
  <v-toolbar flat>
    <v-btn icon depressed class="ml-16" color="#FFFFFF" to="/signup"
      ><v-img class="nav-img" src="../assets/logo.png"
    /></v-btn>
    <router-link class="nav-link ml-16" to="/signup">My Profile</router-link>
    <router-link class="nav-link ml-12" to="/signup">Upload photo</router-link>
    <v-spacer></v-spacer>
    <router-link class="nav-link mr-16" to="/signup">Sign Out</router-link>
  </v-toolbar>
</template>

<script>
module.exports = {
  name: "NavigationBar"
};
</script>

<style scoped lang="scss">
* {
  font-family: "Quicksand";
  text-transform: none !important;
  letter-spacing: normal !important;
}
.nav-title {
  font-weight: bold;
}
.nav-link {
    color: #616161 !important;
    text-decoration: none !important;
    font-size: 14px;
}
.nav-img {
    max-width: 40px;
    max-height: 40px;
}
</style>
