<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn v-if="!isLogin" to="/login" outlined>Login / Sign Up</v-btn>
      <v-btn v-if="isLogin" @click="logout" outlined>Log Out</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { AuthActions, AuthGetters } from "./types/auth";
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  @Getter(AuthGetters.isLogin) private isLogin!: () => boolean;
}
</script>
