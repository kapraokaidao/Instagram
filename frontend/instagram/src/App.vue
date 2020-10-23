<template>
  <v-app>
    <v-main class="bg">
      <NavigationBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { AuthActions, AuthGetters } from "./types/auth";
import NavigationBar from "./components/NavigationBar.vue";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";
const authModule = namespace("auth");

@Component({
  components: {
    HelloWorld,
    NavigationBar
  }
})
export default class App extends Vue {
  @authModule.Getter(AuthGetters.isLogin) private isLogin!: () => boolean;
  @authModule.Action(AuthActions.VerifyToken) private verifyToken!: () => void;

  beforeMount() {
    this.verifyToken();
  }
}
</script>
<style lang="scss">
@import "./views/style.scss";
</style>
