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
import { AuthGetters } from "./types/auth";
import NavigationBar from "./components/NavigationBar.vue";
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {
    HelloWorld,
    NavigationBar
  }
})
export default class App extends Vue {
  @Getter(AuthGetters.isLogin) private isLogin!: () => boolean;
}
</script>