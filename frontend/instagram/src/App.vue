<template>
  <v-app>
    <v-main class="bg">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { AuthGetters } from "./types/auth";
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

<style lang="scss">
.bg {
  background-image: url("assets/cat-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
