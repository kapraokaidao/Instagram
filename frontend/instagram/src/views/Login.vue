<template>
  <div class="flex-container">
    <div class="card-style">
      <form class="form-style">
        <div class="img-container">
          <v-img max-height="100" max-width="100" src="../assets/logo.png" />
        </div>
        <h2>
          Instagram
        </h2>
        <div class="px-12">
          <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </div>
        <div class="px-12 my-3">
          <v-btn block class="secondary-btn" @click="submit" to="/">
            Login
          </v-btn>
        </div>
        <div class="my-3">
          <router-link class="signup-text text-decoration-none" to="/signup"
            >Sign Up</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { Action, namespace } from "vuex-class";
import { AuthActions, LoginCredentials } from "../types/auth";
const authModule = namespace("auth");
@Component
export default class Login extends Vue {
  @authModule.Action(AuthActions.login) private login!: (
    credential: LoginCredentials
  ) => void;
  // data
  private username = "";
  private password = "";
  private imageUrl = "../assets/cat-background.jpg";

  submit() {
    // validate
    this.login({
      username: this.username,
      password: this.password
    });
  }
}
</script>

<style lang="scss">
@import "./style.scss";
.bg {
  overflow: hidden;
  background-image: url("../assets/blur-cat-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
