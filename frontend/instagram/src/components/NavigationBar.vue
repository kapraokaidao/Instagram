<template>
  <v-toolbar flat color="#FAFAFA" v-if="isLogin">
    <v-btn icon depressed color="#FFFFFF" to="/"
      ><v-img class="nav-img" src="../assets/logo.png"/></v-btn>
    <router-link class="nav-link ml-4" to="/profile">My Profile</router-link>
    <router-link class="nav-link ml-4" to="/upload">Upload photo</router-link>
    <v-spacer></v-spacer>
    <v-btn class="nav-link ml-4" @click="logout">Sign Out</v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { AuthActions, AuthGetters } from "../types/auth";
import { Vue, Component } from "vue-property-decorator";

const authModule = namespace("auth");

@Component
export default class NavigationBar extends Vue {
  @authModule.Action(AuthActions.logout) logout!: ()=>void;
  @authModule.Getter(AuthGetters.isLogin) isLogin!: boolean;
}
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
