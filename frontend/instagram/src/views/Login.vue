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
            :error-messages="usernameError"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordError"
            label="Password"
            required
          ></v-text-field>
        </div>
        <div class="px-12 my-3">
          <v-btn block class="secondary-btn" @click="login" to="/">
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

import sassStyles from "./style.scss";
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { Action } from "vuex-class";
import { AuthActions, LoginCredentials } from "../types/auth";

@Component
export default class Login extends Vue {
  @Action(AuthActions.login) private login!: (
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
