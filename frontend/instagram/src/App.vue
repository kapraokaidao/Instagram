<template>
  <v-app>
    <v-main class="bg">
      <v-container>
        <router-view />
      </v-container>
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
    HelloWorld,
  },
})
export default class App extends Vue {
  @Getter(AuthGetters.isLogin) private isLogin!: () => boolean;
}
</script>

<style>
.bg {
  /*background-image: url("assets/blur-cat-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;*/
  background-color: white;
}
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");
.flex-container {
  height: 100%;
  margin-inline-start: 10%;
  margin-inline-end: 10%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.card-style-login {
  width: 35em;
  padding: 30px;
  background: #ffffff;
  border-radius: 32px;
}
.form-style-login {
  text-align: center;
  margin: 5em 3em;
  display: flex;
  flex-direction: column;
}
.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  text-align: center;

  font-family: "Quicksand";
  font-weight: bold;
  font-size: 36px;
}
.login-btn {
  font-family: "Quicksand";
  font-weight: bold;
  font-size: 18px;
}
.signup-link {
  margin: 1em;
}
.signup-text {
  font-family: "Quicksand";
  font-weight: bold;
}
.text-field {
  font-family: "Quicksand";
  font-weight: regular;
}
.card-style-signup {
  margin: 0 auto;
  width: 30%;
  background: #ffffff;
  padding: 20px;
  margin-top: 10%;
}
.form-style-signup {
  width: 70%;
  margin: 0 auto;
  padding: 10px;
}
.register-btn {
  margin: auto;
  width: 70%;
}
.header {
  text-align: center;
  margin-top: 10px;
  display: block;
}
</style>
